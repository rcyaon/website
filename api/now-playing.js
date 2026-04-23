function withCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Missing Spotify environment variables.');
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });
    if (!response.ok) {
        let reason = 'Failed refreshing Spotify token.';
        try {
            const err = await response.json();
            if (err?.error_description) reason = `${reason} ${err.error_description}`;
            else if (err?.error) reason = `${reason} ${err.error}`;
        } catch (_) {
            /* ignore parse failures */
        }
        throw new Error(reason);
    }

    const data = await response.json();
    return data.access_token;
}

async function getNowPlaying(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204) return null;
    if (!response.ok) {
        let reason = 'Failed fetching Spotify now playing.';
        try {
            const err = await response.json();
            if (err?.error?.message) reason = `${reason} ${err.error.message}`;
        } catch (_) {
            /* ignore parse failures */
        }
        throw new Error(reason);
    }
    return response.json();
}

async function getLastPlayed(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const first = data?.items?.[0]?.track || null;
    return first;
}

export default async function handler(req, res) {
    withCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') {
        return res.status(405).json({ ok: false, message: 'Method not allowed.' });
    }

    try {
        const accessToken = await getAccessToken();
        const nowPlaying = await getNowPlaying(accessToken);

        let item = nowPlaying?.item || null;
        let isPlaying = Boolean(nowPlaying?.is_playing);
        if (!item) {
            item = await getLastPlayed(accessToken);
            isPlaying = false;
        }
        if (!item) {
            return res.status(200).json({
                ok: true,
                isPlaying: false,
                isLastPlayed: false,
                message: 'Nothing playing right now.',
            });
        }

        const artist = (item.artists || []).map((a) => a.name).join(', ');
        const albumImageUrl = item.album?.images?.[1]?.url || item.album?.images?.[0]?.url || '';
        const songUrl = item.external_urls?.spotify || '';

        return res.status(200).json({
            ok: true,
            isPlaying,
            isLastPlayed: !isPlaying,
            title: item.name || '',
            artist,
            albumImageUrl,
            songUrl,
        });
    } catch (error) {
        const message = String(error && error.message ? error.message : error);
        return res.status(500).json({
            ok: false,
            message,
        });
    }
}

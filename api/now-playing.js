function withCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const SPOTIFY_TIMEOUT_MS = 6000;

async function spotifyFetch(url, options = {}, timeoutMs = SPOTIFY_TIMEOUT_MS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
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

    const response = await spotifyFetch('https://accounts.spotify.com/api/token', {
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
        const error = new Error(reason);
        error.retryAfterSeconds = retryAfterSeconds(response);
        throw error;
    }

    const data = await response.json();
    return data.access_token;
}

function retryAfterSeconds(response) {
    const header = response.headers?.get?.('retry-after');
    const seconds = Number(header);
    return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
}

/**
 * Never throws: a failure here must not stop the recently-played fallback,
 * which is what keeps the panel populated when nothing is streaming.
 * @returns {Promise<{ item: object|null, isPlaying: boolean, error: string|null, retryAfterSeconds: number|null }>}
 */
async function getNowPlaying(accessToken) {
    const empty = { item: null, isPlaying: false, error: null, retryAfterSeconds: null };
    try {
        const response = await spotifyFetch(
            'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        // 204 = nothing playing; 202 = player state not ready yet.
        if (response.status === 204 || response.status === 202) return empty;
        if (!response.ok) {
            let reason = `Spotify now-playing request failed (${response.status}).`;
            try {
                const err = await response.json();
                if (err?.error?.message) reason = `${reason} ${err.error.message}`;
            } catch (_) {
                /* ignore parse failures */
            }
            return { ...empty, error: reason, retryAfterSeconds: retryAfterSeconds(response) };
        }

        const text = await response.text();
        if (!text.trim()) return empty;
        const data = JSON.parse(text);
        return {
            item: data?.item || null,
            isPlaying: Boolean(data?.is_playing),
            error: null,
            retryAfterSeconds: null,
        };
    } catch (error) {
        return { ...empty, error: String(error?.message || error) };
    }
}

/** Never throws. Returns the most recent playable track, or null. */
async function getLastPlayed(accessToken) {
    try {
        const response = await spotifyFetch(
            'https://api.spotify.com/v1/me/player/recently-played?limit=5',
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (!response.ok) return null;
        const data = await response.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        for (const entry of items) {
            if (entry?.track?.name) return entry.track;
        }
        return null;
    } catch (_) {
        return null;
    }
}

/** Normalize a track or podcast episode into the shape the front end renders. */
function normalizeItem(item) {
    if (!item) return null;

    if (item.type === 'episode') {
        const images = item.images || item.show?.images || [];
        return {
            title: item.name || '',
            artist: item.show?.name || '',
            albumImageUrl: images[1]?.url || images[0]?.url || '',
            songUrl: item.external_urls?.spotify || '',
        };
    }

    const images = item.album?.images || [];
    return {
        title: item.name || '',
        artist: (item.artists || []).map((a) => a.name).filter(Boolean).join(', '),
        albumImageUrl: images[1]?.url || images[0]?.url || '',
        songUrl: item.external_urls?.spotify || '',
    };
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

        let normalized = normalizeItem(nowPlaying.item);
        let isPlaying = nowPlaying.isPlaying;

        // Fall back whenever there is no usable current item — including when the
        // now-playing call itself failed, or is playing an ad (item is null).
        if (!normalized?.title) {
            normalized = normalizeItem(await getLastPlayed(accessToken));
            isPlaying = false;
        }

        if (!normalized?.title) {
            return res.status(200).json({
                ok: true,
                isPlaying: false,
                isLastPlayed: false,
                message: nowPlaying.error || 'Nothing playing right now.',
                retryAfterSeconds: nowPlaying.retryAfterSeconds || undefined,
            });
        }

        return res.status(200).json({
            ok: true,
            isPlaying,
            isLastPlayed: !isPlaying,
            ...normalized,
        });
    } catch (error) {
        const message = String(error && error.message ? error.message : error);
        return res.status(500).json({
            ok: false,
            message,
            retryAfterSeconds: error?.retryAfterSeconds || undefined,
        });
    }
}

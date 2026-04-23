# Spotify Now Playing Setup (Public)

This site includes a public `SPOTIFY.TXT` window that fetches your current track from:

- `/api/now-playing`

The API endpoint is server-side, so anyone opening your website can see your listening status without logging in.

## Deploy

Deploy this repo to Vercel (recommended for this setup).

## Required Environment Variables

Set these in your Vercel project settings:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

## Spotify App Settings

In your Spotify Developer Dashboard app:

- Add your deployment URL callback (for obtaining a refresh token), e.g.:
  - `https://your-domain.com/callback`
  - or `http://localhost:3000/callback` for local tooling

## How to Get a Refresh Token

You can generate the refresh token once using Spotify's Authorization Code flow with your own script/tool, then store it as `SPOTIFY_REFRESH_TOKEN`.

After that, the server endpoint refreshes access tokens automatically.

## Frontend API URL

`main.js` calls:

- `const NOW_PLAYING_API_URL = '/api/now-playing';`

If your frontend is hosted elsewhere, point that value to the full URL of your deployed API.

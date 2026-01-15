# Music Tracker Browser Extension

A browser extension that detects and tracks music playing in your browser across multiple platforms.

## Features

- Detects music playback on major platforms:
  - YouTube / YouTube Music
  - Spotify Web Player
  - SoundCloud
  - Apple Music
  - Pandora
  - Deezer
  - Tidal

- Tracks:
  - Song title
  - Artist name
  - Album (when available)
  - Start time
  - Duration played
  - Platform

## Installation

### For Chrome/Edge

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `audio_detecter` folder

### For Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file from the `audio_detecter` folder

## Usage

1. Install the extension
2. Navigate to any supported music platform
3. Play music as normal
4. Click the extension icon to view your listening history

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `background.js` - Service worker for managing state
- `content.js` - Content script that detects music on web pages
- `popup.html/js/css` - UI for viewing tracked music

## Privacy

All data is stored locally in your browser. No data is sent to external servers.

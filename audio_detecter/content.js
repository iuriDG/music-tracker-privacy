// Content script for detecting music on various platforms

let lastMusicData = null;
let checkInterval = null;

// Platform-specific selectors and extractors
const platforms = {
  youtube: {
    hostname: 'www.youtube.com',
    detect: () => {
      const video = document.querySelector('video');
      if (!video || video.paused) return null;

      const title = document.querySelector('h1.ytd-watch-metadata yt-formatted-string')?.textContent ||
                   document.querySelector('.title.ytd-video-primary-info-renderer')?.textContent;
      const artist = document.querySelector('#owner-name a')?.textContent ||
                    document.querySelector('.ytd-channel-name a')?.textContent;

      if (!title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'YouTube'
      };
    }
  },

  youtubeMusic: {
    hostname: 'music.youtube.com',
    detect: () => {
      const playerBar = document.querySelector('.player-bar');
      if (!playerBar) return null;

      const title = document.querySelector('.title.ytmusic-player-bar')?.textContent;
      const artist = document.querySelector('.byline.ytmusic-player-bar a')?.textContent;
      const video = document.querySelector('video');

      if (!video || video.paused || !title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'YouTube Music'
      };
    }
  },

  spotify: {
    hostname: 'open.spotify.com',
    detect: () => {
      const nowPlaying = document.querySelector('[data-testid="now-playing-widget"]');
      if (!nowPlaying) return null;

      const title = document.querySelector('[data-testid="context-item-link"]')?.textContent ||
                   nowPlaying.querySelector('a[href*="/track/"]')?.textContent;
      const artist = nowPlaying.querySelector('a[href*="/artist/"]')?.textContent;
      const playButton = document.querySelector('[data-testid="control-button-playpause"]');

      // Check if playing (play button should show pause icon)
      const isPlaying = playButton?.getAttribute('aria-label')?.toLowerCase().includes('pause');

      if (!isPlaying || !title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'Spotify'
      };
    }
  },

  soundcloud: {
    hostname: 'soundcloud.com',
    detect: () => {
      const playButton = document.querySelector('.playControl');
      const isPlaying = playButton?.classList.contains('playing');

      if (!isPlaying) return null;

      const title = document.querySelector('.playbackSoundBadge__titleLink')?.textContent ||
                   document.querySelector('.soundTitle__title')?.textContent;
      const artist = document.querySelector('.playbackSoundBadge__lightLink')?.textContent ||
                    document.querySelector('.soundTitle__username')?.textContent;

      if (!title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'SoundCloud'
      };
    }
  },

  appleMusic: {
    hostname: 'music.apple.com',
    detect: () => {
      const playButton = document.querySelector('[data-testid="playback-play-pause"]');
      const isPaused = playButton?.getAttribute('aria-label')?.toLowerCase().includes('play');

      if (isPaused) return null;

      const title = document.querySelector('.song-name')?.textContent ||
                   document.querySelector('[data-testid="playback-now-playing-title"]')?.textContent;
      const artist = document.querySelector('.artist-name')?.textContent ||
                    document.querySelector('[data-testid="playback-now-playing-artist"]')?.textContent;

      if (!title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'Apple Music'
      };
    }
  },

  pandora: {
    hostname: 'www.pandora.com',
    detect: () => {
      const playButton = document.querySelector('[data-qa="play_button"]');
      const isPaused = playButton?.getAttribute('aria-label')?.toLowerCase().includes('play');

      if (isPaused) return null;

      const title = document.querySelector('[data-qa="now_playing_track"]')?.textContent;
      const artist = document.querySelector('[data-qa="now_playing_artist"]')?.textContent;

      if (!title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'Pandora'
      };
    }
  },

  deezer: {
    hostname: 'www.deezer.com',
    detect: () => {
      const playButton = document.querySelector('.player-control-play-pause');
      const isPlaying = playButton?.classList.contains('is-playing');

      if (!isPlaying) return null;

      const title = document.querySelector('.player-track-title')?.textContent;
      const artist = document.querySelector('.player-track-link')?.textContent;

      if (!title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'Deezer'
      };
    }
  },

  tidal: {
    hostname: 'listen.tidal.com',
    detect: () => {
      const playButton = document.querySelector('[data-test="play-controls"] button[data-type="button__play-pause"]');
      const isPaused = playButton?.getAttribute('aria-label')?.toLowerCase().includes('play');

      if (isPaused) return null;

      const title = document.querySelector('[data-test*="footer-track-title"]')?.textContent;
      const artist = document.querySelector('[data-test*="grid-cell-artistName"]')?.textContent;

      if (!title) return null;

      return {
        title: title.trim(),
        artist: artist?.trim() || 'Unknown Artist',
        album: null,
        platform: 'Tidal'
      };
    }
  }
};

function detectCurrentPlatform() {
  const hostname = window.location.hostname;

  for (const [key, platform] of Object.entries(platforms)) {
    if (hostname.includes(platform.hostname)) {
      return platform;
    }
  }

  return null;
}

function checkForMusic() {
  const platform = detectCurrentPlatform();
  if (!platform) return;

  const musicData = platform.detect();

  if (musicData) {
    // Check if this is new or different music
    if (!lastMusicData ||
        lastMusicData.title !== musicData.title ||
        lastMusicData.artist !== musicData.artist) {
      console.log('Music detected:', musicData);
      chrome.runtime.sendMessage({
        type: 'MUSIC_DETECTED',
        data: musicData
      });
      lastMusicData = musicData;
    } else {
      // Same song still playing, send update
      chrome.runtime.sendMessage({
        type: 'MUSIC_DETECTED',
        data: musicData
      });
    }
  } else {
    // No music playing
    if (lastMusicData) {
      console.log('Music stopped');
      chrome.runtime.sendMessage({ type: 'MUSIC_STOPPED' });
      lastMusicData = null;
    }
  }
}

// Start checking for music
function startMonitoring() {
  if (checkInterval) {
    clearInterval(checkInterval);
  }

  // Check immediately
  checkForMusic();

  // Then check every 2 seconds
  checkInterval = setInterval(checkForMusic, 2000);
}

// Initialize monitoring
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startMonitoring);
} else {
  startMonitoring();
}

// Re-check when page becomes visible
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkForMusic();
  }
});

console.log('Music Tracker content script loaded');

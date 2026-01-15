// Background service worker for Music Tracker extension

const activeSessions = new Map();

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'MUSIC_DETECTED') {
    handleMusicDetected(message.data, sender.tab.id);
  } else if (message.type === 'MUSIC_PAUSED') {
    handleMusicPaused(sender.tab.id);
  } else if (message.type === 'MUSIC_STOPPED') {
    handleMusicStopped(sender.tab.id);
  } else if (message.type === 'GET_HISTORY') {
    getHistory().then(history => sendResponse({ history }));
    return true; // Keep channel open for async response
  }
});

// Handle tab closure
chrome.tabs.onRemoved.addListener((tabId) => {
  handleMusicStopped(tabId);
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleMusicStopped(tabId);
  }
});

function handleMusicDetected(musicData, tabId) {
  const now = Date.now();

  // Check if this is a new song or continuation
  const currentSession = activeSessions.get(tabId);

  if (currentSession &&
      currentSession.title === musicData.title &&
      currentSession.artist === musicData.artist) {
    // Same song, update last seen time
    currentSession.lastSeen = now;
  } else {
    // New song, save previous session if exists
    if (currentSession) {
      saveSession(currentSession, tabId);
    }

    // Start new session
    activeSessions.set(tabId, {
      title: musicData.title,
      artist: musicData.artist,
      album: musicData.album || 'Unknown Album',
      platform: musicData.platform,
      startTime: now,
      lastSeen: now,
      isPlaying: true
    });
  }
}

function handleMusicPaused(tabId) {
  const session = activeSessions.get(tabId);
  if (session) {
    session.isPlaying = false;
    saveSession(session, tabId);
  }
}

function handleMusicStopped(tabId) {
  const session = activeSessions.get(tabId);
  if (session) {
    saveSession(session, tabId);
    activeSessions.delete(tabId);
  }
}

async function saveSession(session, tabId) {
  const duration = Math.floor((session.lastSeen - session.startTime) / 1000); // in seconds

  // Only save if played for more than 5 seconds
  if (duration < 5) {
    return;
  }

  const historyEntry = {
    id: `${session.startTime}-${tabId}`,
    title: session.title,
    artist: session.artist,
    album: session.album,
    platform: session.platform,
    startTime: session.startTime,
    duration: duration,
    date: new Date(session.startTime).toISOString()
  };

  // Get existing history
  const result = await chrome.storage.local.get(['musicHistory']);
  const history = result.musicHistory || [];

  // Add new entry
  history.unshift(historyEntry);

  // Keep only last 1000 entries
  const trimmedHistory = history.slice(0, 1000);

  // Save back to storage
  await chrome.storage.local.set({ musicHistory: trimmedHistory });

  console.log('Saved music session:', historyEntry);
}

async function getHistory() {
  const result = await chrome.storage.local.get(['musicHistory']);
  return result.musicHistory || [];
}

// Periodically check active sessions and update storage
setInterval(() => {
  activeSessions.forEach((session, tabId) => {
    if (session.isPlaying) {
      session.lastSeen = Date.now();
    }
  });
}, 5000); // Update every 5 seconds

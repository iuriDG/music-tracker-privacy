// Popup script for Music Tracker

let allHistory = [];

// Load and display history
async function loadHistory() {
  const response = await chrome.runtime.sendMessage({ type: 'GET_HISTORY' });
  allHistory = response.history || [];
  displayHistory();
  updateStats();
}

function displayHistory() {
  const historyList = document.getElementById('historyList');
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const platformFilter = document.getElementById('platformFilter').value;

  // Filter history
  let filteredHistory = allHistory.filter(item => {
    const matchesSearch = !searchTerm ||
      item.title.toLowerCase().includes(searchTerm) ||
      item.artist.toLowerCase().includes(searchTerm);
    const matchesPlatform = platformFilter === 'all' || item.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  if (filteredHistory.length === 0) {
    historyList.innerHTML = `
      <div class="empty-state">
        <p>No music found.</p>
        <p>${allHistory.length === 0 ? 'Play some music on supported platforms to start tracking!' : 'Try adjusting your filters.'}</p>
      </div>
    `;
    return;
  }

  historyList.innerHTML = filteredHistory.map(item => {
    const date = new Date(item.startTime);
    const formattedDate = formatDate(date);
    const formattedDuration = formatDuration(item.duration);
    const platformClass = item.platform.toLowerCase().replace(/\s+/g, '-');

    return `
      <div class="history-item">
        <div class="history-item-header">
          <div class="song-info">
            <div class="song-title">${escapeHtml(item.title)}</div>
            <div class="song-artist">${escapeHtml(item.artist)}</div>
          </div>
          <span class="platform-badge platform-${platformClass}">${item.platform}</span>
        </div>
        <div class="history-item-footer">
          <span class="timestamp">${formattedDate}</span>
          <span class="duration">${formattedDuration}</span>
        </div>
      </div>
    `;
  }).join('');
}

function updateStats() {
  const totalSongs = allHistory.length;
  const totalSeconds = allHistory.reduce((sum, item) => sum + item.duration, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  document.getElementById('totalSongs').textContent = totalSongs;

  if (totalHours > 0) {
    document.getElementById('totalTime').textContent = `${totalHours}h ${totalMinutes % 60}m`;
  } else {
    document.getElementById('totalTime').textContent = `${totalMinutes}m`;
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Clear history
document.getElementById('clearHistory').addEventListener('click', async () => {
  if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
    await chrome.storage.local.set({ musicHistory: [] });
    allHistory = [];
    displayHistory();
    updateStats();
  }
});

// Export history
document.getElementById('exportHistory').addEventListener('click', () => {
  const dataStr = JSON.stringify(allHistory, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `music-tracker-history-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

// Search and filter
document.getElementById('searchInput').addEventListener('input', displayHistory);
document.getElementById('platformFilter').addEventListener('change', displayHistory);

// Initialize
loadHistory();

// Refresh history every 5 seconds
setInterval(loadHistory, 5000);

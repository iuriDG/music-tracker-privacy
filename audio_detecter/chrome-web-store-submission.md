# Chrome Web Store Submission Guide for Music Tracker

## Single Purpose Description
Music Tracker is a browser extension that automatically detects and tracks music playing across popular music streaming platforms (YouTube, Spotify, SoundCloud, Apple Music, Pandora, Deezer, and Tidal). It keeps a history of all songs you've listened to with timestamps.

## Permission Justifications

### 1. activeTab Permission
**Justification:**
The activeTab permission is required to detect when users are on supported music streaming websites (YouTube, Spotify, SoundCloud, etc.) and to read the currently playing song information from the active tab. This allows the extension to track music only when the user is actively listening.

### 2. Host Permissions (*.youtube.com, *.spotify.com, etc.)
**Justification:**
Host permissions for specific music streaming domains are required to inject content scripts that can read the song metadata (title, artist, duration) from these websites' DOM elements. The extension only accesses these specific music platforms to detect playing audio and does not access any other websites. Required domains:
- youtube.com - to detect YouTube music videos
- spotify.com - to detect Spotify tracks
- soundcloud.com - to detect SoundCloud tracks
- music.apple.com - to detect Apple Music tracks
- pandora.com - to detect Pandora stations
- deezer.com - to detect Deezer tracks
- tidal.com - to detect Tidal tracks

### 3. Storage Permission
**Justification:**
The storage permission is required to save the user's music listening history locally in their browser. This includes song titles, artists, timestamps, and URLs. All data is stored locally using Chrome's storage API and is never transmitted to external servers. Users can view and clear their history at any time through the extension popup.

### 4. Tabs Permission
**Justification:**
The tabs permission is required to monitor when users navigate to music streaming websites and to detect when music playback starts or stops. This allows the extension to automatically track songs without manual user interaction. The extension only monitors tab URLs to identify supported music platforms.

### 5. Remote Code Use
**Justification:**
This extension does NOT use remote code. All JavaScript code is bundled within the extension package and no external scripts are loaded or executed. If this field is required, select "No" or "Not Applicable".

## Data Usage Certification

### Data Collected:
- Song titles
- Artist names
- Timestamps of when songs were played
- URLs of music pages visited

### Data Storage:
- All data is stored locally in the user's browser using Chrome's storage API
- No data is transmitted to external servers
- No personal information is collected

### Data Usage:
- Data is used solely to display listening history to the user
- Users can clear their history at any time
- No analytics or tracking beyond music detection

## Privacy Policy (Required if you don't have one)

**Music Tracker Privacy Policy**

Last Updated: January 15, 2026

**Data Collection:**
Music Tracker collects and stores the following information locally in your browser:
- Song titles and artist names from supported music streaming platforms
- Timestamps of when you listened to songs
- URLs of the music pages you visited

**Data Storage:**
All data is stored locally on your device using Chrome's storage API. We do not transmit, sell, or share any of your data with third parties.

**Data Usage:**
The collected data is used solely to display your music listening history within the extension popup.

**Data Deletion:**
You can clear your listening history at any time by clicking the "Clear History" button in the extension popup.

**Third-Party Access:**
We do not share your data with any third parties. No data leaves your device.

**Contact:**
For questions about this privacy policy, please contact: [YOUR EMAIL HERE]

## Screenshots Needed

You need to provide at least 1 screenshot (up to 5 recommended):

### Recommended Screenshots (1280x800 or 640x400):
1. **Extension Popup** - Show the popup with a list of tracked songs
2. **YouTube Integration** - Extension icon active while playing music on YouTube
3. **Music History** - Full history view showing multiple tracked songs
4. **Empty State** - What users see when no music has been tracked yet
5. **Supported Platforms** - Composite showing the extension works on multiple platforms

## Steps to Complete Submission

1. ✅ **Account Tab:**
   - Add your contact email
   - Verify your email (check inbox for verification link)

2. ✅ **Privacy Practices Tab:**
   - Enter Single Purpose Description (copy from above)
   - Enter justifications for each permission (copy from above)
   - Select "No" for remote code usage
   - Certify data usage compliance

3. ✅ **Store Listing Tab:**
   - Upload at least 1 screenshot (1280x800 recommended)
   - Add detailed description
   - Select category (Productivity or Fun)
   - Add promotional images if available

4. ✅ **Save Draft** after completing each section

5. ✅ **Submit for Review** when all items are complete

## Suggested Store Listing Description

**Short Description:**
Automatically track and remember all the music you listen to across YouTube, Spotify, SoundCloud, and more.

**Detailed Description:**
Music Tracker is your personal music listening diary. Never forget a song you loved again!

🎵 **Features:**
- Automatic detection of music playing on popular streaming platforms
- Complete listening history with timestamps
- Support for YouTube, Spotify, SoundCloud, Apple Music, Pandora, Deezer, and Tidal
- Clean, modern interface
- One-click access to your music history
- Privacy-focused: all data stored locally on your device

🎧 **How It Works:**
Simply install the extension and play music on any supported platform. Music Tracker automatically detects songs and saves them to your personal history. Click the extension icon anytime to view your listening timeline.

🔒 **Privacy:**
Your listening history stays on your device. We don't collect, transmit, or share any of your data.

**Category Suggestions:**
- Primary: Productivity
- Secondary: Fun


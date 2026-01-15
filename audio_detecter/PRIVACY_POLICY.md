# Privacy Policy for Music Tracker

**Last Updated:** January 15, 2026

## Introduction

Music Tracker ("we," "our," or "the extension") is committed to protecting your privacy. This privacy policy explains what data we collect, how we use it, and your rights regarding your data.

## Data We Collect

Music Tracker collects and stores the following information **locally on your device only**:

### Web History Data
- URLs of music streaming pages you visit (YouTube, Spotify, SoundCloud, Apple Music, Pandora, Deezer, Tidal)
- Timestamps of when you visited these pages
- Duration of music playback

### Website Content Data
- Song titles
- Artist names
- Album information (when available)

## How We Use Your Data

The collected data is used **solely** for the following purpose:
- Displaying your personal music listening history within the extension popup
- Allowing you to review what music you've listened to over time

## Data Storage

- **All data is stored locally** on your device using Chrome's built-in storage API
- **No data is transmitted** to external servers
- **No data is uploaded** to the cloud
- **No analytics or tracking** is performed beyond music detection

## Data Sharing

We **DO NOT**:
- Sell your data to third parties
- Share your data with third parties
- Transfer your data outside of your local device
- Use your data for advertising
- Use your data for any purpose unrelated to music tracking

## Your Rights

You have complete control over your data:
- **View your data:** All tracked music is visible in the extension popup
- **Delete your data:** Click "Clear History" to permanently delete all tracked music
- **Export your data:** You can manually copy your listening history from the popup

## Data Retention

- Data is retained indefinitely on your local device until you choose to clear it
- You can clear all data at any time using the "Clear History" button

## Permissions Used

### activeTab
Used to detect when you're on a music streaming website and read currently playing song information.

### Host Permissions (*.youtube.com, *.spotify.com, etc.)
Used to access specific music streaming platforms to read song metadata from the webpage.

### Storage
Used to save your listening history locally in your browser.

### Tabs
Used to monitor when you navigate to music streaming websites and detect playback events.

## Third-Party Services

Music Tracker does not integrate with or send data to any third-party services. The extension only reads publicly visible information from music streaming websites you visit.

## Children's Privacy

Music Tracker does not knowingly collect data from children under 13. The extension treats all users equally and stores all data locally on the user's device.

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this document. Continued use of the extension after changes constitutes acceptance of the updated policy.

## Contact

If you have questions about this privacy policy or Music Tracker's data practices, please contact:

**Email:** [YOUR EMAIL ADDRESS]

## Technical Details

### Data Format
Music listening history is stored in JSON format in Chrome's local storage with the following structure:
```json
{
  "title": "Song Title",
  "artist": "Artist Name",
  "timestamp": "ISO 8601 timestamp",
  "url": "URL of music page",
  "duration": "playback duration"
}
```

### Security
All data is protected by Chrome's built-in security measures for local storage. No additional encryption is applied as data never leaves your device.

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- General Data Protection Regulation (GDPR) principles
- California Consumer Privacy Act (CCPA) requirements

---

By using Music Tracker, you agree to this privacy policy.

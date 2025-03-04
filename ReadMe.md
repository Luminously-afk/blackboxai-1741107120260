# Anonymous Message Box with Spotify Integration

A simple web application that allows users to create their personal anonymous message inbox where others can send messages along with Spotify tracks.

## Features

- 🎯 Create a unique anonymous inbox with a shareable URL
- 📝 Receive anonymous messages from anyone with your inbox URL
- 🎵 Messages can include Spotify tracks using the Spotify Embed API
- 📱 Fully responsive design that works on desktop and mobile
- 🎨 Modern UI with Tailwind CSS
- 💾 Messages are stored locally in the browser's localStorage

## How to Use

1. **Create Your Inbox**
   - Open `index.html` in your web browser
   - Click on "Create Your Inbox" button
   - You'll be redirected to your unique inbox URL

2. **Share Your Inbox**
   - Copy your unique inbox URL using the "Copy URL" button
   - Share this URL with anyone you want to receive messages from

3. **Send Messages**
   - Visit someone's inbox URL
   - Type your message in the text area
   - Optionally, paste a Spotify track URL
   - Click "Send Message" to submit

4. **View Messages**
   - Messages appear in chronological order (newest first)
   - If a message includes a Spotify track, it will be embedded below the message
   - Messages are stored locally in your browser

## Spotify URL Format

The application accepts Spotify track URLs in the following formats:
- `https://open.spotify.com/track/[track-id]`
- `spotify:track:[track-id]`

## Technical Details

- Built with vanilla JavaScript
- Styled using Tailwind CSS
- Uses localStorage for data persistence
- Integrates Spotify's Embed API for music playback
- No backend required - everything runs in the browser

## Limitations

- Messages are stored in the browser's localStorage, which means:
  - Messages are only visible on the device/browser where they were received
  - Clearing browser data will delete all messages
  - Storage is limited to the browser's localStorage capacity
- Spotify tracks must be publicly available for embedding

## Browser Support

Works on all modern browsers that support:
- localStorage
- ES6+ JavaScript
- iframe embedding
- Tailwind CSS

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No additional setup or installation required!

## License

This project is open source and available under the MIT License.

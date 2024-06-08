# SHHHHHPOTIFY

Welcome to SHHHHHPOTIFY! This personal project is a web application designed to take a Spotify playlist link, fetch the playlist data using the Spotify API, and convert each song into a downloadable MP3 file using YouTube.

## Features

- **Spotify Playlist Integration**: Input a Spotify playlist link and fetch detailed data about the songs in the playlist.
- **YouTube Search and Extraction**: Query each song on YouTube to find the best match.
- **MP3 Conversion**: Convert the found YouTube videos into MP3 format.
- **Download Links**: Provide downloadable MP3 links directly on the front end for easy access.

## How It Works

1. **Input**: Enter a Spotify playlist link on the web application.
2. **Spotify API**: The application extracts the playlist ID and uses the Spotify API to fetch details of the songs in the playlist.
3. **YouTube Query**: Each song is queried on YouTube to find a corresponding video.
4. **MP3 Conversion**: The found YouTube videos are converted to MP3 format.
5. **Download Links**: MP3 download links are generated and presented on the front end for easy downloading.

## Getting Started

### Prerequisites

- Spotify Developer Account and API Key
- YouTube Data API Key
- Backend server capable of handling the song querying and conversion process

### Installation
- Clone the repository:
        git clone https://github.com/yourusername/spotify-to-mp3-converter.git
- Install the necessary dependencies:
        cd server
- npm install
-Configure your API keys:
Set up your Spotify and rapidApi keys (Spotify)[https://developer.spotify.com/] and (RapidAPI)[https://rapidapi.com/ytjar/api/youtube-mp36]

#Running the Application
- Start the backend server:
      node /index.js
- Start the front-end (Html landing/index.html)

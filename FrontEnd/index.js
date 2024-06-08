const input = document.getElementById("linkIP");
let data;

const ytId = [];
const downloadLink = [];


// THIS REMOVES ALL THE PREVIOUS CONTENT (if any)
async function removal() {
    const pli = document.getElementById("playlistImg");
    const songList = document.getElementById("songList");
    const tit = document.getElementById('tit');
    pli.innerHTML = "";
    songList.innerHTML = "";
    tit.innerHTML = "";
}
//uses the pattern matching to get the playlist id and the links alwats follow generalised format
function extractPlaylistId(playlistUrl) {
    const regex = /\/playlist\/([^/?]+)/;
    const match = regex.exec(playlistUrl);
    return match ? match[1] : null;
}
//get the playlist data using the token
async function fetchData() {
    let clientID = ''; //spotify.dev
    let clientSec = ''; //spotify.dev
    try {
        const accessToken = await getToken(clientID, clientSec);
        const playlistUrl = input.value;
        const playlistID = extractPlaylistId(playlistUrl);

        if (playlistID != null) {
            const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            if (playlistResponse.ok) {
                data = await playlistResponse.json();
            } else {
                console.error('Failed to fetch playlist:', playlistResponse.status);
            }
        } else {
            console.error('Invalid playlist URL');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// fetches the access token with the credentials clientID and clientSecreate
async function getToken(clientID, clientSec) {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientID + ":" + clientSec)
        },
        body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSec}`
    });
    const data = await result.json();
    return data.access_token;
}
//this extracts song names from the data fetched and then it adds them to the DOM
async function elementAddition() {
    data.tracks.items.forEach( async element => {
        const image = document.createElement("img");
        image.src = element.track.album.images[2].url; // smallest image url used
        const songName = document.createElement("p");
        songName.innerText = element.track.name;
        const div = document.createElement("div");
        div.classList.add("songListContent");
        div.appendChild(image);
        div.appendChild(songName);
        songList.appendChild(div); // adds the image and song name to the DOM
        // get ID and then get Download link 
        const id = await searchAndAdd(element.track.name);
        
        // parse id to json
        
        const mp3data = await fetchMP3s(id);
        console.log("Song name: " + element.track.name + " ID: " + id + " Link: " + mp3data.link);
        const downloadButtonlink = document.createElement("a");
        const downloadButton = document.createElement("button");
        downloadButtonlink.href = mp3data.link;
        downloadButtonlink.innerText = "Download"; // Adding classes to the link
        downloadButtonlink.classList.add("btn2");
        div.appendChild(downloadButtonlink); // Appending the link to the DOM
    });
}
// uses Youtube API to query youtube servers and then extract the youtube video id
async function searchAndExtractVideoIds() {
    for (const song of songs) {
        await searchAndAdd(song);
    }
}
//part of the above function
async function searchAndAdd(song) {
    const url = new URL('http://localhost:3000/search');
    url.searchParams.append('q', song);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.id;  // Assuming the response JSON has an `id` field
    } catch (error) {
        console.error('Error fetching the song:', error);
    }
}

// uses a 3rd party api to get downloadable links from the youtube ID we fetched
async function fetchMP3s(id) {
    const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: { id: id },
        headers: {
            'X-RapidAPI-Key': '', //ur X-Rapid API key
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
//this is the main function that is called when the enter key is pressed
document.addEventListener("keydown", async function (event) {
    if (event.key === 'Enter') {
        await removal();
        await fetchData();
        const imgUrl = data.images[1].url;  //playlist image, the second largest one, index 0 -> largest, 1-> medium, 2-> smallest  
        const playlistName = data.name;
        //add elements into the DOM
        const img = document.createElement("img");
        img.src = imgUrl;
        document.getElementById("playlistImg").appendChild(img);
        document.getElementById("tit").innerText = playlistName;
        const songList = document.getElementById("songList");
        await elementAddition();
    }
});
// Declare Song Variables
let song;
let playSong;

// Spotify Client Credentials
const clientId = "fc2b5ced1bf94bc8bcb6d9d7d413e053"
const clientSecret = "9f39f5813609445b93cc25e58acfb5c8"

const getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })

    // Access data that 'result' returns
    const data = await result.json()
    // console.log(result)
    // console.log(data)
    return data.access_token
}


// Function to ge the song info when image is clicked 🎧
/**
 * @param img_index
 * @param item_index
 * 
 * Function gets song from spotify using the image index of our gallery.
 * Then it finds the corrrect item_index of the JSON response object from Spotify.
 * This will produce a preview url that will be used to play a song from the soundtrack.
 */
async function clickedEvent(img_index,item_index){
    // Get the Track name (alt text)
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;
    console.log(track)

    let token = await getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept','application/json'],
        ['Authorization',`Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=10`,{
        method: 'GET',
        headers: headers
    });

    let result = await fetch(request);
    
    let response = await result.json()
    // console.log(response)

    song = response.tracks.items[item_index].preview_url
    console.log(song)

    // TODO: Add songSnippet function to play the song from the preview_url
    if(playSong){
        stopSnippet();
    }
    songSnippet(song)
}

/**
 * 
 * @param id
 * @param event
 * 
 * id = image id for gallery image
 * event = mouse event given by the action from our user
 * 
 * Function produces songs from the clickedEvent based on the image index.
 */
function getSong(id,event){
    event.stopPropagation();
    switch(id){
        case 'fig1':{
            clickedEvent(0,0)
            break;
        }
        case 'fig2':{
            clickedEvent(1,0)
            break;
        }
        case 'fig3':{
            clickedEvent(2,0)
            break;
        }
        case 'fig4':{
            clickedEvent(3,2)
            break;
        }
        case 'fig5':{
            clickedEvent(4,0)
            break;
        }
        case 'fig6':{
            clickedEvent(5,0)
            break;
        }
    }

}

/**
 * @param url
 * 
 * url = song preview_url
 * Function will return an audio clip given by the preview url
 */
function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}

/**
 * Function returns the event to stop song snippet.
 */
function stopSnippet(){
    return playSong.pause();
}
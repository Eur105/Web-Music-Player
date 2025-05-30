console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Birds-of-a-Feather.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Billie Eilish - Birds of a Feather", filePath: "songs/1.mp3", coverPath: "covers/Billie Eilish.jpg"},
    {songName: "Olivia Rodrigo - Driver's License", filePath: "songs/2.mp3", coverPath: "covers/Olivia Rodrigo.jpg"},
    {songName: "Sabrina Carpenter - Good Luck Babe", filePath: "songs/3.mp3", coverPath: "covers/Sabrina Carpenter.jpg"},
    {songName: "Selena Gomez - It Ain't Me", filePath: "songs/4.mp3", coverPath: "covers/Selena Gomez.jpg"},
    {songName: "Dua Lipa - Love Again", filePath: "songs/5.mp3", coverPath: "covers/Dua Lipa.jpg"},
    {songName: "Taylor Swift - Red", filePath: "songs/6.mp3", coverPath: "covers/Taylor Swift.jpg"},
    {songName: "Ariana Grande - Side To Side", filePath: "songs/7.mp3", coverPath: "covers/Ariana Grande.jpg"},
    {songName: "Lana Del Rey - Summertime Sadness", filePath: "songs/8.mp3", coverPath: "covers/Lana Del Rey.jpg"},    
    {songName: "Gracie Abrams - That's So True", filePath: "songs/9.mp3", coverPath: "covers/Gracie Abrams.jpg"},
    {songName: "Halsey - Without Me", filePath: "songs/10.mp3", coverPath: "covers/Halsey.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
// Modals
function openAlbum() { 
    document.getElementById("album").style.display = "block"; 
    renderAlbumStack();
}
function closeAlbum() { document.getElementById("album").style.display = "none"; }

function openPlaylist() { document.getElementById("playlist").style.display = "block"; }
function closePlaylist() { document.getElementById("playlist").style.display = "none"; }

function openLetters() { 
    document.getElementById("letters").style.display = "block"; 
    document.getElementById("letterText").innerHTML = "";
}
function closeLetters() { document.getElementById("letters").style.display = "none"; }

window.onclick = function(event) {
    if(event.target.className === 'modal') event.target.style.display = "none";
}

/* Album stacked Instax effect */
const albumPhotos = [
    "images/01.jpg",
    "images/02.jpg",
    "images/03.jpg",
    "images/04.jpg",
    "images/05.jpg",
    "images/06.jpg"
];

let currentIndex = 0;
let albumContainer;

function renderAlbumStack() {
    albumContainer = document.getElementById("albumContent");
    albumContainer.innerHTML = "";

    const centerY = albumContainer.clientHeight / 2;
    const centerX = albumContainer.clientWidth / 2;

    albumPhotos.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.style.zIndex = albumPhotos.length - i; 
        const verticalOffset = i * 5; // small offset for stacking
        const rotation = Math.random() * 10 - 5; // -5 to +5 degrees
        img.style.top = `${centerY + verticalOffset}px`;
        img.style.left = `${centerX}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        img.style.opacity = i === 0 ? 1 : 0; // only top visible
        albumContainer.appendChild(img);
    });

    const topPhoto = albumContainer.children[0];
    topPhoto.addEventListener("click", nextPhoto);
}

function nextPhoto() {
    const images = albumContainer.children;
    if(currentIndex >= images.length) currentIndex = 0;
    const currentImg = images[currentIndex];
    currentImg.style.opacity = 0; // fade out
    currentIndex++;
    const nextImg = images[currentIndex % images.length];
    nextImg.style.opacity = 1; // fade in
    nextImg.style.transform = `translate(-50%, -50%) rotate(${(Math.random()*10-5)}deg)`; // new rotation
    nextImg.addEventListener("click", nextPhoto);
}

/* Typing effect for love letter */
const letterContent = `Dear Sweetheart,

Every day with you feels magical. I love every smile, every laugh, and every moment we share together. You are my heart, my soul, and my happiness.

Forever yours,
❤️ Me`;

let typingIndex = 0;
let typingInterval;

function startTyping() {
    const letterText = document.getElementById("letterText");
    if(typingInterval) clearInterval(typingInterval);
    letterText.innerHTML = "";
    typingIndex = 0;

    typingInterval = setInterval(() => {
        letterText.innerHTML += letterContent.charAt(typingIndex);
        typingIndex++;
        if(typingIndex >= letterContent.length) clearInterval(typingInterval);
    }, 50);
}
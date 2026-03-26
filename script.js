// Album
function openAlbum() {
    document.getElementById("album").style.display = "block";
    renderAlbum();
}
function closeAlbum() {
    document.getElementById("album").style.display = "none";
}

// Playlist
function openPlaylist() {
    document.getElementById("playlist").style.display = "block";
}
function closePlaylist() {
    document.getElementById("playlist").style.display = "none";
}

// 👉 IMPORTANT (Play to read → GAME)
function openLetters() {
    window.location.href = "game.html";
}

// Close modal kapag click outside
window.onclick = function(e) {
    if (e.target.className === "modal") {
        e.target.style.display = "none";
    }
}

// Album images
const photos = [
    "images/01.jpg",
    "images/02.jpg",
    "images/03.jpg",
    "images/04.jpg",
    "images/05.jpg",
    "images/06.jpg"
];

function renderAlbum() {
    const container = document.getElementById("albumContent");
    container.innerHTML = "";

    photos.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.style.width = "200px";
        img.style.margin = "10px";
        container.appendChild(img);
    });
}
const cards = 
    document.getElementsByClassName('card');
let allImages = document.getElementsByClassName('card-image');
let movesDisplay = document.querySelector('.move-counter');
let toggledCardsArray = [];
let move = 0;
let winCount = 0;
const restart = document.getElementById('restart');

const imagesLinkArray = [
    { id: 1, image: 'images/1.jpg', newAlt: '1.jpg' },
    { id: 2, image: 'images/1.jpg', newAlt: '1.jpg' },
    { id: 3, image: 'images/2.jpg', newAlt: '2.jpg' },
    { id: 4, image: 'images/2.jpg', newAlt: '2.jpg' },
    { id: 5, image: 'images/bd.png', newAlt: 'bd.png' },
    { id: 6, image: 'images/bd.png', newAlt: 'bd.png' },
    { id: 7, image: 'images/dudu.png', newAlt: 'dudu.png' },
    { id: 8, image: 'images/dudu.png', newAlt: 'dudu.png' },
    { id: 9, image: 'images/bubu.png', newAlt: 'bubu.png' },
    { id: 10, image: 'images/bubu.png', newAlt: 'bubu.png' },
    { id: 11, image: 'images/bubududu.png', newAlt: 'bubududu.png' },
    { id: 12, image: 'images/bubududu.png', newAlt: 'bubududu.png' }
];

// shuffle function
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// shuffle cards initially when page loads
window.addEventListener('DOMContentLoaded', () => {
    shuffleArray(imagesLinkArray);
    // set images to the cards in random order
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].src = imagesLinkArray[i].image;
        allImages[i].alt = imagesLinkArray[i].newAlt;
        allImages[i].id = imagesLinkArray[i].id;
    }
});

// function to restart the game
const restartGame = () => {
    let toggledCard = 
        document.getElementsByClassName('card toggled');
    imagesLinkArray.sort(() => Math.random() - 0.5);
    Object.values(toggledCard).forEach(function (el) {
        setTimeout(() => {
            el.classList.remove("toggled");
        }, 0);
    })
    toggledCardsArray.length = 0;
    move = 0;
    winCount=0;
    movesDisplay.innerText = `Moves: ${move}`;
    let allImagesSrc = document.getElementsByClassName('card-image');
    Object.values(allImagesSrc).forEach((el, index)=>{
        el.src = imagesLinkArray[index].image;
        el.alt = imagesLinkArray[index].newAlt;
        el.id = imagesLinkArray[index].id
    }) 
}
restart.addEventListener('click', restartGame);

//checking for the last clicked and current 
//clicked cards and applying changes accordingly
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        this.classList.add("toggled");
        toggledCardsArray.push(this);
        let thisImgSrc = this.querySelector('.card-image').src;
        let previousImgSrc = 
        toggledCardsArray[toggledCardsArray.length - 2].querySelector('.card-image').src;
        if(thisImgSrc !== previousImgSrc) {
            toggledCardsArray.forEach(function (el) {
                setTimeout(() => {
                    el.classList.remove("toggled");
                }, 500);
            })
            toggledCardsArray.length = 0;
            move++;
        }
        else{
            toggledCardsArray.length = 0;
            move++;
            winCount++;
        }
        movesDisplay.innerText = `Moves: ${move}`;
        if(winCount === 6){
            setTimeout(() => {
                // show the love letter modal
                const modal = document.getElementById('love-letter');
                modal.style.display = 'flex';

                // close button
                const closeBtn = document.getElementById('close-letter');
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }, 300);
        }
    })
}
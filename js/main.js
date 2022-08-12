let letters = [
    {
        type: 'a',
        url: '<i class="fa-solid fa-a"></i>',
        audioUrl: "/assets/audio/a.mp3"
    },
    { 
        type: 'b',
        url: '<i class="fa-solid fa-b"></i>',
        audioUrl: "/assets/audio/b.mp3"
    },
    {
        type: 'c',
        url: '<i class="fa-solid fa-c"></i>',
        audioUrl: "/assets/audio/c.mp3"
    },
    {
        type: 'd',
        url: '<i class="fa-solid fa-d"></i>',
        audioUrl: "/assets/audio/d.mp3"
    },
    {
        type: 'e',
        url: '<i class="fa-solid fa-e"></i>',
        audioUrl: "/assets/audio/e.mp3"
    },
    {
        type: 'f',
        url: '<i class="fa-solid fa-f"></i>',
        audioUrl: "/assets/audio/f.mp3"
    },
    {
        type: 'g',
        url: '<i class="fa-solid fa-g"></i>',
        audioUrl: "/assets/audio/g.mp3"
    },
    {
        type: 'h',
        url: '<i class="fa-solid fa-h"></i>',
        audioUrl: "/assets/audio/h.mp3"
    },
    {
        type: 'i',
        url: '<i class="fa-solid fa-i"></i>',
        audioUrl: "/assets/audio/i.mp3"
    },
    {
        type: 'j',
        url: '<i class="fa-solid fa-j"></i>',
        audioUrl: "/assets/audio/j.mp3"
    },
    {
        type: 'k',
        url: '<i class="fa-solid fa-k"></i>',
        audioUrl: "/assets/audio/k.mp3"
    },
    {
        type: 'l',
        url: '<i class="fa-solid fa-l"></i>',
        audioUrl: "/assets/audio/L.mp3"
    },
    {
        type: 'm',
        url: '<i class="fa-solid fa-m"></i>',
        audioUrl: "/assets/audio/m.mp3"
    },
    {
        type: 'n',
        url: '<i class="fa-solid fa-n"></i>',
        audioUrl: "/assets/audio/n.mp3"
    },
    {
        type: 'o',
        url: '<i class="fa-solid fa-o"></i>',
        audioUrl: "/assets/audio/o.mp3"
    },
    {
        type: 'p',
        url: '<i class="fa-solid fa-p"></i>',
        audioUrl: "/assets/audio/p.mp3"
    },
    {
        type: 'q',
        url: '<i class="fa-solid fa-q"></i>',
        audioUrl: "/assets/audio/q.mp3"
    },
    {
        type: 'r',
        url: '<i class="fa-solid fa-r"></i>',
        audioUrl: "/assets/audio/r.mp3"
    },
    {
        type: 's',
        url: '<i class="fa-solid fa-s"></i>',
        audioUrl: "/assets/audio/s.mp3"
    },
    {
        type: 't',
        url: '<i class="fa-solid fa-t"></i>',
        audioUrl: "/assets/audio/t.mp3"
    },
    {
        type: 'u',
        url: '<i class="fa-solid fa-u"></i>',
        audioUrl: "/assets/audio/u.mp3"
    },
    {
        type: 'v',
        url: '<i class="fa-solid fa-v"></i>',
        audioUrl: "/assets/audio/v.mp3"
    },
    {
        type: 'w',
        url: '<i class="fa-solid fa-w"></i>',
        audioUrl: "/assets/audio/w.mp3"
    },
    {
        type: 'x',
        url: '<i class="fa-solid fa-x"></i>',
        audioUrl: "/assets/audio/x.mp3"
    },
    {
        type: 'y',
        url: '<i class="fa-solid fa-y"></i>',
        audioUrl: "/assets/audio/y.mp3"
    },
    {
        type: 'z',
        url: '<i class="fa-solid fa-z"></i>',
        audioUrl: "/assets/audio/z.mp3"
    }
]

let selectorArr = new Array;
let countMatches = 0;
let makeSelection = true;
let limited = letters.sort(() => { //set the board up by random postions
    return Math.random() - 0.5;
}).filter((items, i) => i<6);

function loadGrid() {
    limited.push(...limited); //creates a matching pair
    limited.forEach((v,i) => {//populate the board
        const box = document.querySelector('#container')
        const block = document.createElement('div')
        block.innerHTML = v.url
        block.setAttribute('data-id', v.type)
        block.setAttribute('class','letter')
        box.append(block);

        const track = document.createElement('audio');//create audio files 
        track.setAttribute('data-id', v.type)
        track.setAttribute('class','tracksounds')
        track.setAttribute('src', v.audioUrl)
        block.append(track)
    })
    const letter = document.querySelectorAll('i'); //hides all the letters until user clicks 
    letter.forEach(l => {
        l.style.visibility = 'hidden';
    })
    playGame();
}

function playGame() {
    let squares = document.querySelectorAll('.letter');

    squares.forEach(currentSelection => {
        currentSelection.addEventListener('click', evt => {
            if (makeSelection === true) {
                if (selectorArr.length < 2 && !evt.target.attributes.selected) { //plays the audio on current selection
                    evt.target.querySelector('.tracksounds').play(); 
                    currentSelection.classList.add('animate__animated', 'animate__flipInY')  //animates flip in 
                    evt.target.querySelector('i').style.visibility = "visible";//this shows the letters 
                    currentSelection.setAttribute('selected', 'yes');
                    selectorArr.push(currentSelection.getAttribute('data-id'))
                }
                if (selectorArr.length === 2 && evt.target.attributes.selected) {
                    makeSelection = false;
                    checkMatches();
                }
            }
        })
    })
}


function checkMatches() { //checks to see if there's a match else it empty out the array and start the selection process over
    if(selectorArr[0].includes(selectorArr[1])) {
        setTimeout(function () {
            let card = [... document.querySelectorAll('[selected="yes"]')];
            card.forEach(v => { //animation
                v.classList.remove('animate__animated', 'animate__flipInY')
                v.classList.add('animate__animated', 'animate__zoomOutLeft')
                v.removeAttribute('selected');
            })
            document.getElementById("match").play();
            hideLetter(); //this will hide the letters 
            removeCard(); //it will remove the card
            selectorArr = []; //empty out the array again
            countMatches+=1;
            reloadGame();
            setTimeout(function () {
                makeSelection = true;
            }, 1000);

        }, 2000);

    } else {
        setTimeout(function () {
            document.getElementById("flip").play();
            setTimeout(function () {
                document.getElementById("flip").pause();
                makeSelection = true;
            }, 1000);
            let card = [... document.querySelectorAll('[selected="yes"]')];
            card.forEach(v => { //animation
                v.classList.remove('animate__animated', 'animate__flipInY')
                v.classList.add('animate__animated', 'animate__flipInX')
                v.removeAttribute('selected');
            })
            selectorArr = [];
                 hideLetter(); //remove the letters
        }, 2000);
    }
}

function removeCard() {
    let card = [... document.querySelectorAll('[selected="yes"]')];
    card.forEach(v => {
        v.style.visibility = 'hidden';
    })
}

function hideLetter() { //remove the letters. Note: in the future, use css here
    setTimeout(function () {
            const letter = document.querySelectorAll('i'); 
            letter.forEach(l => {
            l.style.visibility = 'hidden';
            })
        }, 100);
}

function reloadGame() {    
    if (countMatches === (limited.length / 2)) { //restart game when number of elements in array divide by 2
        document.getElementById("cheer").play();
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti(        {
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
         })
        const a = document.querySelector('#container')
        const b = document.createElement('h2')
        b.setAttribute('class','congrats')
        b.innerHTML = 'Woooohhoooo!!!! </br> <b>ALL MATCHES FOUND</b>'
        a.prepend(b);
        setTimeout(function () {  
            window.location.reload();
        }, 5000);
    }

}

loadGrid();

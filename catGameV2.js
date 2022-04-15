
const kittyPics = [];
const numPics = 40;
for(let i=1; i<=numPics;i++){
    kittyPics.push(`./${i}.jpg`);
}
const defaultBlur = 80;
const blurIncrement = 20;

let isGameWon = false;
let isGameStarted = false;
let resetGame = false;
let currentBlur = defaultBlur;
let blurAmount = blurIncrement;
let currentButton = 0;
let currentKitty = 0;
let kittyPicsIndex = randy(numPics,1);

// ######START FUNCTIONS########## //

function randy(maxNum, minNum){
    return Math.floor(Math.random()*maxNum)+minNum;
}

// create random number of cat faces and put into #catFaces
function createCatFaces(faces){
    const catFaces = document.querySelector('#catFaces');
    for(i=0;i<faces;i++){
        let newCat = document.createElement('img');
        newCat.src = 'pngegg.png';
        newCat.alt = 'kitty face';
        newCat.className = 'catFace';
        catFaces.appendChild(newCat);
    }

    // return numCatFaces;
}

// remove all cat faces from #catFaces
function clearCatFaces(){
    const catFaces = document.querySelectorAll('.catFace');
    for(cat of catFaces){
    cat.remove();
    }
}

// add random cat pic
function insertKitty(){
    const kittyPic = document.querySelector('#kittyImg');
    if(kittyPicsIndex>numPics){
        kittyPicsIndex=0;
    }
    kittyPic.src = kittyPics[kittyPicsIndex];
    kittyPicsIndex++;
}

// add blur to cat pic
function blurKitty(blur){
    const getKittyImg = document.querySelector('#kittyImg');
    getKittyImg.style.filter = `blur(${blur}px)`;}

// re-label buttons with correct answer and random others
function labelButton(index, label){
    const button = document.querySelectorAll('button');
    button[index].innerText = `${label}`;
}

// remove h2 on click #leftSide
function removeH2(){
    const getH2 = document.querySelector('h2');
    getH2.remove();
}

// generate array and return correct button
function randomArray(){
    let correctButton = randy(3,0);
    let buttonArray = [randy(4,1),randy(4,5),randy(4,9)];
    for(i=0; i<3; i++){
        labelButton(i,buttonArray[i]);
    }
    createCatFaces(buttonArray[correctButton]);
    return correctButton;
}

function buttonSequence(){
    currentBlur -= blurAmount;
    blurKitty(currentBlur);
    clearCatFaces();
    currentButton = randomArray();
    if(currentBlur<=0){
        console.log('you win');
        clearCatFaces();
        toggleText();
        labelButton(0,'W');
        labelButton(1,'I');
        labelButton(2,'N');
        currentKitty++;
        setTimeout(()=>{isGameWon=true
        },1000);
    }
}

function toggleText(){
    let h3 = document.querySelectorAll('h3');
    for(h of h3){h.classList.toggle('restartClass')}
}

function resetRight(){
    currentBlur=defaultBlur;
    setTimeout(()=>blurKitty(currentBlur),500);
    setTimeout(()=>insertKitty(),1000);
    currentButton = randomArray();
    isGameWon = false;
}
// ######END FUNCTIONS########## //



// ######START GAME LOGIC########## //




// start game by clicking cat face
const getLeftSide = document.querySelector('#leftSide');
getLeftSide.addEventListener('click',function(){
    if(isGameStarted===false){
        removeH2();
        resetRight();
        isGameStarted = true;
    }
    else{

    }
});

// restart game
const getRightSide = document.querySelector('#rightSide');
getRightSide.addEventListener('click',function(){
    if(isGameWon===true){
        resetRight();
        toggleText();
    }
})

// button logic
const button0 = document.querySelector('#button0');
button0.addEventListener('click',()=>{
    if(currentButton===0 && isGameStarted===true && isGameWon===false){
        buttonSequence();
    }
});

const button1 = document.querySelector('#button1');
button1.addEventListener('click',()=>{
    if(currentButton===1 && isGameStarted===true && isGameWon===false){
        buttonSequence();
    }
});

const button2 = document.querySelector('#button2');
button2.addEventListener('click',()=>{
    if(currentButton===2 && isGameStarted===true && isGameWon===false){
        buttonSequence();
    }
});

function addLitter(){
    const footer = document.querySelector('#kittyGallery');
    for(i=0; i<kittyPics.length; i++){
        let newImg = document.createElement('img');
        newImg.src = kittyPics[i];
        newImg.classList.add("litterArray");
        footer.appendChild(newImg);
        console.log('clicked');
    }
    
}

const kittyLitter = document.querySelector('#kittyLitter');
kittyLitter.addEventListener('click', addLitter);



console.log('begin game');

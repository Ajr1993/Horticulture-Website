function initialisePage(){
    console.log("Welcome to this webpage all about Horticulture");
}

window.onload = initialisePage;

function ChangeBackGroundColour(){
    const body = document.querySelector('body');
    if(body.style.backgroundColor === "rgb(255, 99, 71)"){
        body.style.backgroundColor = "white";
    } else{
        body.style.backgroundColor = "#FF6347";
    }
}
document.querySelector('#ChangeBackGroundColourButton').addEventListener('click', ChangeBackGroundColour);

function ChangeTextColour(){
    const body = document.querySelector('body');
    if(body.style.color === 'green'){
        body.style.color = 'black';
    } else{
        body.style.color = 'green';
    }
}
    document.querySelector('#ChangeTextColour').addEventListener('click', ChangeTextColour);

    function ChangeFontSize(){
        const body = document.querySelector('body');
        if(body.style.fontSize === '16px'){
            body.style.fontSize = '30px';
        } else{
            body.style.fontSize ='16px';
        }
    }
    document.querySelector('#ChangeFontSize').addEventListener('click', ChangeFontSize);

    





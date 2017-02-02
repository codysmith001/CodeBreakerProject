let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let input = document.getElementById('user-guess');

function guess() {
    if(answer.value === '' && attempt.value === ''){
        setHiddenFields();
    }

    if(!validateInput(input.value)){
        return;
    }else{
        attempt++;
    }
    if(getResults(input)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }else if(attempt >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }else{
        setMessage("Incorrect, try again.");
    }
    //add functionality to guess function here
}

function setHiddenFields(){
    answer = Math.floor(Math.random() * (9999 - 1)) + 1
    let answerStr = answer + "";
    let pad = "0000";
    answer = pad.substring(0, pad.length - answerStr.length) + answerStr;
    attempt = 0;
}

function setMessage(messageValue){
    document.getElementById('message').innerHTML = messageValue;
}

function validateInput(guess){
    if(guess.length === 4){
        return true;
    }else{
        setMessage("Guesses must be exactly 4 characters long");
        return false;
    }
}

function getResults(input){
    let numberRight = 0;
    let resultP = document.createElement("p");
    resultP.className += "col-md-6";

    for(let x = 0; x < answer.length; x++){
        let resultSpan = document.createElement("span");
        if(input.value.substring(x, x+1) === answer.substring(x, x+1)){
            resultSpan.className += "glyphicon glyphicon-ok";
            resultP.appendChild(resultSpan);
            numberRight++;
        }else if(answer.indexOf(input.value.substring(x, x+1)) == "-1"){
            resultSpan.className += "glyphicon glyphicon-remove";
            resultP.appendChild(resultSpan);
        }else{
            resultSpan.className += "glyphicon glyphicon-transfer";
            resultP.appendChild(resultSpan);
        }
    }

    createResultRow(input.value, resultP);

    if(numberRight === 4){
        return true;
    }else{
        return false;
    }
}

function createResultRow(guess, result){
    let div = document.createElement("div");
    div.className += "row";

    let guessP = document.createElement("p");
    guessP.className = "col-md-6";
    guessP.innerHTML = guess;

    div.appendChild(guessP);
    div.appendChild(result);
    document.getElementById("results").appendChild(div);
}

function showAnswer(win){
    let code = document.getElementById("code");
    code.innerHTML = answer;
    if(win){
        code.className += " success";
    }else{
        code.className += " failure";
    }
}

function showReplay(){
    let guessDiv = document.getElementById("guessing-div");
    let replayDiv = document.getElementById("replay-div");

    guessDiv.style.display = "none";
    replayDiv.style.display = "block";
}


//implement new functions here

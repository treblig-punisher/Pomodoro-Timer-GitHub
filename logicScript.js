let timerCountDownStart;
let minutes = 0
let seconds = 0
let lastButtonClicked = undefined;
const alarmOverSound = new Audio("AlarmOverSound.wav");

let timerObject ={
    stateIndex: 0,
    startingTime: "",
    timerState: ["isIdle", "isRunning", "isStopped"],
    currentState: "isIdle",
    currentTime: 0,
    setStartingTime: function(){
        startingTime = seconds < 10? `${Math.abs(minutes)}:0${Math.abs(seconds)}`: `${Math.abs(minutes)}:${Math.abs(seconds)}`;
        document.querySelector("div.clock.counter").textContent = startingTime;
    },
    updateCurrentTime: function()
    {

        let timeNow = seconds < 10? `${Math.abs(minutes)}:0${Math.abs(seconds)}`: `${Math.abs(minutes)}:${Math.abs(seconds)}`;
        document.querySelector("div.clock.counter").textContent = timeNow;
    },
    countDown: function()
    {

        if(minutes === 0 && seconds === 0)
        {
            minutes = 0;
            seconds = 0;
            alarmOverSound.play();
            const redRing = document.querySelector(".red");
            redRing.style.backgroundColor = "#900A0A"
        }
        else
        {
            if(seconds > 0)
            {
                seconds --;
            }
            else{
                seconds = 59;
                if(minutes > 0)minutes --;  
            }
        }
        
        document.querySelector("div.clock.counter").textContent = seconds < 10? `${Math.abs(minutes)}:0${Math.abs(seconds)}`: `${Math.abs(minutes)}:${Math.abs(seconds)}`;
        // console.log(minutes);
    },
    // beginInterval: setInterval(this.countDown, 1000),
    timerFinished: function(refName){
        clearInterval(refName);
    },

    manageTimerBehavior(){
        switch(this.currentState){
            case "isIdle":
                 clearInterval(timerCountDownStart);
                 document.querySelector("div.clock.button-counter").textContent = "Start";
            break;

            case "isRunning":
                //  this.countDown();
                this.updateCurrentTime();
                document.querySelector(".clock.button-counter").textContent = "Stop";
                timerCountDownStart = setInterval(this.countDown, 1000);

            break;

            case "isStopped":
                clearInterval(timerCountDownStart);
                const redCirc = document.querySelector(".red");
                redCirc.style.backgroundColor = "#a51dce";
                document.querySelector(".clock.button-counter").textContent = "Resume";

            break;

            // default :"isIdle";
        }
    },
    setState: function(newState)
    {
        this.currentState = newState;
    },
}


timerObject.setStartingTime();

// timerObject.currentTime = timerObject.startingTime.;




function restartTimer(){
    
}
// console.log(timerObject.stateIndex);
// console.log(timerObject.currentState);

function buttonClicked()
{
  
    if(timerObject.stateIndex < timerObject.timerState.length-2)
    {
        timerObject.stateIndex ++;
        timerObject.setState(timerObject.timerState[timerObject.stateIndex]);
        timerObject.manageTimerBehavior();
        // console.log(timerObject.currentState);
        // console.log(timerObject.stateIndex);
        
    }
    else{
        
        timerObject.stateIndex = 0;
        timerObject.setState(timerObject.timerState[timerObject.stateIndex]);
        timerObject.manageTimerBehavior();
    }
}

function gearButtonClicked()
{
    var getCircleContainer = document.querySelector(".circle.black");
    getCircleContainer.style.webkitFilter = "blur(20px)";
    
    var gearButton = document.querySelector(".options-menu");
    gearButton.style.display = "flex";
    timerObject.stateIndex = 0;
    timerObject.setState(timerObject.timerState[0]);
    timerObject.manageTimerBehavior();
}

function disableOptionsMenu(){
    var gearButton = document.querySelector(".options-menu");
    gearButton.style.display = "none";
    var getCircleContainer = document.querySelector(".circle.black");
    getCircleContainer.style.webkitFilter = "blur(0)";
    lastButtonClicked.setAttribute("data-button-selected", "false");
    
    var getMinutes = document.querySelector(".minutes-option");
    var getSeconds = document.querySelector(".seconds-option");
    if(parseInt(getMinutes.innerHTML) || parseInt(getSeconds.innerHTML) && !isNaN(getMinutes.innerHTML) && !isNaN(getSeconds.innerHTML))
    {
        minutes = parseInt(getMinutes.innerHTML) > 60? 60: parseInt(getMinutes.innerHTML);
        seconds = parseInt(getSeconds.innerHTML) > 59? 59: parseInt(getSeconds.innerHTML);
        timerObject.updateCurrentTime();
        const redRing = document.querySelector(".red");
        redRing.style.backgroundColor = "#23ce1d";
        timerObject.stateIndex = 0;
        timerObject.currentState = timerObject.timerState[timerObject.stateIndex]
        // alert("Success!");
    }
    else{
        alert("wrong input, use numbers only!");
    }
}

function setTimeButtonClicked(elementClassName)
{
    // alert("This button is: " + elementClassName.getAttribute('data-button-selected'));
    const getButtonId = elementClassName.getAttribute("data-button-selected");
    
    if(lastButtonClicked != undefined)
    {
        if(elementClassName != lastButtonClicked)
        {
            lastButtonClicked.setAttribute("data-button-selected", "false");
        }
    }
    
    if(getButtonId === "false"){
        
        // alert(getButtonId);
        const newTime = window.prompt("insert your desired time: ");
        elementClassName.innerHTML = newTime === ""? 0: newTime;
        // console.log(elementClassName.style);
        elementClassName.setAttribute("data-button-selected", "true");
        lastButtonClicked = elementClassName;
        // alert(getButtonId);
        
    }
    else if(getButtonId === "true"){
        // alert(getButtonId);
        
        elementClassName.setAttribute("data-button-selected", "false");
        lastButtonClicked = undefined;
        
    }

    
    // alert(elementClassName.getAttribute("data-button-selected"));
    // alert(elementClassName.getAttribute("data-button-selected"));
}
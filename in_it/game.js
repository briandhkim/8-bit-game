var availablePlayerTurns = ["p1", "p2"];
var currentPlayerTurnIndex = 0;

var consoleMessages = [];

function currentPlayerTurn(){
    return availablePlayerTurns[currentPlayerTurnIndex];
}

function switchTurn(){
    currentPlayerTurnIndex = 1 - currentPlayerTurnIndex;
}

function logConsoleMessage(message){
    consoleMessages.unshift(message);
    if(consoleMessages > 5){
        consoleMessages.pop();
    }
    updateConsoleMessages();
}

function updateConsoleMessages(){
    for(var i = 0; i < consoleMessages.length; i++){
        var consoleLI = "#console_" + (i+1);
        console.log(consoleLI);
        $(consoleLI).text(consoleMessages[i]).css("list-style-type", "square")
    }
}

function clearConsoleMessages(){
    consoleMessages = [];
    $("#console_1").text("").css("list-style-type", "none");
    $("#console_2").text("").css("list-style-type", "none");
    $("#console_3").text("").css("list-style-type", "none");
    $("#console_4").text("").css("list-style-type", "none");
    $("#console_5").text("").css("list-style-type", "none")
}


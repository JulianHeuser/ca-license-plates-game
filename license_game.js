const plateHtml = document.getElementById("plate");
const customerMeaningHtml = document.getElementById("customerMeaning");
const verdictHtml = document.getElementById("verdict");
const reviewerCommentsHtml = document.getElementById("reviewerComments");

const scoreHtml = document.getElementById("score").children[0];
const streakHtml = document.getElementById("score").children[1];
const bestStreakHtml = document.getElementById("score").children[2];

const mainButtons = document.getElementsByClassName("mainButton");
const retryButton = document.getElementById("retryButton");

let fileData;
let plateData;

let score = 0;
let attempts = 0;
let bestStreak = 0;
let streak = 0;

const Labels = {
    plate: 0,
    reviewReasonCode: 1,
    customerMeaning: 2,
    reviewerComments: 3,
    status: 4
};


// GetFile
// Made with help from https://stackoverflow.com/a/53550663
async function GetFile(filepath) {
    return fetch(filepath)
        .then((response) => {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }

            return response.text();
        })
        .catch((err) => {
            console.log("Fetch Error :-S", err);
        });
}


function Init() {
    file = GetFile("applications.csv").then((data) => {
        fileData = data.split('\n');
        StartGame();
    });

    UpdateScores();
}


function StartGame() {
    for (let button of mainButtons) {
        button.disabled = false;
    }
    retryButton.style.visibility = "hidden";
    verdictHtml.innerText = "";
    reviewerCommentsHtml.innerText = "";


    let line = fileData[Math.floor(Math.random() * fileData.length)];

    plateData = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

    if (plateData.length < 5){
        console.log("Parsing issue: " + plateData);
    }

    plateHtml.innerText = plateData[Labels.plate];

    if (plateData[Labels.customerMeaning] == "") {
        customerMeaningHtml.innerText = "(No description)";
    }
    else {
        customerMeaningHtml.innerText = plateData[Labels.customerMeaning];
    }
}


function UserGuess(guess) {
    for (let button of mainButtons) {
        button.disabled = true;
    }

    retryButton.style.visibility = "visible";
    let applicationStatus = plateData[Labels.status] == "Y" ? true : false;

    attempts++;

    if (guess == applicationStatus) {
        verdictHtml.innerText = "Correct!";
        score++;
        streak++;
    }
    else {
        streak = 0;
        verdictHtml.innerText = "Wrong!";
    }

    UpdateScores();

    reviewerCommentsHtml.innerText = "Reviewer's comments: " + plateData[Labels.reviewerComments];
}


function UpdateScores() {
    if (streak > bestStreak) {
        bestStreak = streak;
    }

    scoreHtml.innerText = "Correct: " + score + "/" + attempts;
    streakHtml.innerText = "Streak: " + streak;
    bestStreakHtml.innerText = "Best streak: " + bestStreak;
    if (streak == 13) {
        scoreHtml.innerText = "Score: rejected (gang number)";
    }
}

Init();
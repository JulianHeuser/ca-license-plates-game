const plate_html = document.getElementById("plate");
const customer_meaning_html = document.getElementById("customer_meaning");
const verdict_html = document.getElementById("verdict");
const reviewer_comments_html = document.getElementById("reviewer_comments");

const main_buttons = document.getElementsByClassName("main_button");
const retry_button = document.getElementById("retry_button");

let file_data;
let plate_data;

const Labels = {
    plate: 0,
    review_reason_code: 1,
    customer_meaning: 2,
    reviewer_comments: 3,
    status : 4
};


// GetFile
// Made with help from https://stackoverflow.com/a/53550663
async function GetFile(filepath){
    return fetch(filepath)
        .then((response) =>  {
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


function Init(){
    file = GetFile("applications.csv").then((data) => {
        file_data = data.split('\n');
        StartGame();
    });

}


function StartGame(){
    for (let button of main_buttons) {
        button.disabled = false;
    }
    retry_button.hidden = true;
    verdict_html.innerHTML = "";
    reviewer_comments_html.innerHTML = "";


    let line = file_data[Math.floor(Math.random() * file_data.length)];
    
    plate_data = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/);

    plate_html.innerHTML = plate_data[Labels.plate];

    if (plate_data[Labels.customer_meaning] == ""){
        customer_meaning_html.innerHTML = "(No description)";
    }
    else{
        customer_meaning_html.innerHTML = plate_data[Labels.customer_meaning];
    }

    console.log(line);
    console.log(plate_data[Labels.status]);
}


function UserGuess(guess){
    for (let button of main_buttons) {
        button.disabled = true;
    }

    retry_button.hidden = false;
    let application_status = plate_data[Labels.status] == "Y" ? true : false;
    if (guess == application_status){
        verdict_html.innerHTML = "Correct!";
    }
    else{
        verdict_html.innerHTML = "Wrong!";
    }
    
    reviewer_comments_html.innerHTML = "Reviewer's comments: " + plate_data[Labels.reviewer_comments];
}


Init();
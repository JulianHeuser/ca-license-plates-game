const plate_html = document.getElementById("plate");
const customer_meaning_html = document.getElementById("customer_meaning");
const verdict_html = document.getElementById("verdict");

let plate_data;

let application_status;


const Labels = {
    plate: 0,
    review_reason_code: 1,
    customer_meaning: 2,
    reviewer_comments: 3,
    status : 4
}


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
        plate_data = data.split('\n');
        StartGame();
    });

}

function StartGame(){
    let line = plate_data[Math.floor(Math.random() * plate_data.length)];
    
    plate_data = line.split(/(?!\B"[^"]*),(?![^"]*"\B)/);

    plate_html.innerHTML = plate_data[Labels.plate]

    if (plate_data[Labels.customer_meaning] == ""){
        customer_meaning_html.innerHTML = "(No description)"
    }
    else{
        customer_meaning_html.innerHTML = plate_data[Labels.customer_meaning]
    }

    console.log(line)
    console.log(plate_data[Labels.status])

    application_status = plate_data[Labels.status] == "Y" ? true : false;
}

function UserGuess(guess){
    if (guess == application_status){
        verdict_html.innerHTML = "Correct!"
    }
    else{
        verdict_html.innerHTML = "Wrong!"
    }
}

Init();
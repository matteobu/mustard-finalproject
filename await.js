const { readFile } = require("fs");
const { sendToApi } = require("./utils");

readFileAndSendMessage();

function readFileAndSendMessage() {
    console.log("Before Asynchronous Code -------------------------\n"); // 1

    readFile("message.txt", "utf8", (error, message) => {
        if (error) {
            return console.log("File Read Error:", error); // 3
        }
        console.log("Message Read:", message); // 3'

        sendToApi(message, (error, result) => {
            if (error) {
                return console.log("API Error:", error); // 4
            }
            console.log("API Result:", result); // 4'
        });
    });

    console.log("After Asynchronous Code  -------------------------\n"); // 2
}

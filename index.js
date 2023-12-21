const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
let hardwareRef = db.collection("hardware");

//send data
app.get("/api/update", (req, res) => {
    const data = { value: req.query.value };
    console.log(data);
    if (!isNaN(data.value)) {
        try {
            hardwareRef.doc("reading").set(data);
            res.send("value is a number " + data.value);
        } catch (error) {
            res.send("error ");
        }
    } else {
        res.send("value is not a number " + data.value);
    }
    // Your code to save the new user to the database or any other source
    // Send a response indicating success or failure
});

module.exports = app;

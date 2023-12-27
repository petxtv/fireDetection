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
app.post("/api/update", async function (req, res) {
    console.log(req.body);

    const data = {
        temp: req.body.temp,
        isThereFire: Boolean(req.body.isThereFire),
    };
    console.log(data);
    try {
        await hardwareRef.doc("reading").set(data);
        res.status(200).json({ message: "Values updated successfully" });
    } catch (error) {
        console.log("error" + error);
        res.status(400).json({ message: "error" });
    }
    // Your code to save the new user to the database or any other source
    // Send a response indicating success or failure
});

app.get("/", (req, res) => {
    res.json({ message: "hi" });
});
module.exports = app;

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
    const data = { value: req.body.value };
    console.log(data);
    console.log(req.body);
    await hardwareRef.doc("reading").set(data);
    // Your code to save the new user to the database or any other source
    // Send a response indicating success or failure
    res.json({ message: "Value updated successfully" });
});

app.get("/", (req, res) => {
    res.json({ message: "hi" });
});

module.exports = app;

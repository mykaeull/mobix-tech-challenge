const express = require("express");

const app = express();

const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const povCharacterRoutes = require("./routes/povCharacterRoutes");

app.use("/povCharacter", povCharacterRoutes);

const characterRoutes = require("./routes/characterRoutes");

app.use("/character", characterRoutes);

mongoose
    .connect(
        "mongodb+srv://mykaeull:32142970@apicluster.m5uigym.mongodb.net/bancomobix?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected with mongoDB!");
        app.listen(3000, () => {
            console.log("Server is running...");
        });
    })
    .catch((err) => console.log(err));

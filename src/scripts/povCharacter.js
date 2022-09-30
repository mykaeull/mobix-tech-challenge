const axios = require("axios");

const mongoose = require("mongoose");

const api = axios.create();

const PovCharacter = require("../models/PovCharacter");

mongoose
    .connect(
        "mongodb+srv://mykaeull:32142970@apicluster.m5uigym.mongodb.net/bancomobix?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected with mongoDB!");
    })
    .catch((err) => console.log(err));

const getPovCharacters = async () => {
    const response = await api.get("https://anapioficeandfire.com/api/books/1");
    // console.log(response.data);
    response.data.povCharacters.map((povCharacter) => {
        const getPovCharacter = async () => {
            const response = await api.get(povCharacter);
            delete response.data.url;
            // console.log(response.data);
            await PovCharacter.create(response.data);
        };
        getPovCharacter();
    });
};

getPovCharacters();

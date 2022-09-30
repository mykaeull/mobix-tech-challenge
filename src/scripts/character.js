const axios = require("axios");

const mongoose = require("mongoose");

const api = axios.create();

const Character = require("../models/Character");

mongoose
    .connect(
        "mongodb+srv://mykaeull:32142970@apicluster.m5uigym.mongodb.net/bancomobix?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected with mongoDB!");
    })
    .catch((err) => console.log(err));

const getCharacters = async () => {
    const response = await api.get("https://anapioficeandfire.com/api/books/1");
    // console.log(response.data);
    response.data.characters.map((character) => {
        const getCharacter = async () => {
            const response = await api.get(character);
            delete response.data.url;
            // console.log(response.data);
            await Character.create(response.data);
        };
        getCharacter();
    });
};

getCharacters();

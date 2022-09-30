const router = require("express").Router();

const axios = require("axios");

const api = axios.create();

const Character = require("../models/Character");

router.get("/", async (req, res) => {
    try {
        const characters = await Character.find();

        res.status(200).json(characters);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const character = await Character.findOne({ _id: id });

        res.status(200).json(character);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id/books", async (req, res) => {
    const id = req.params.id;

    try {
        const character = await Character.findOne({ _id: id });

        res.status(200).json(character.books);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id/books/covers", async (req, res) => {
    const id = req.params.id;

    try {
        const character = await Character.findOne({ _id: id });

        if (character.books.length === 0) {
            return res.status(200).json({ message: "No books found" });
        }

        let covers = character.books.map(async (url) => {
            const getBookCover = async () => {
                const { data } = await api.get(url);
                return `https://covers.openlibrary.org/b/isbn/${data.isbn}.jpg`;
            };
            return getBookCover().then((e) => e);
        });

        // console.log(covers);

        // setTimeout(() => {
        //     res.status(200).json(covers);
        // }, "2000");

        res.status(200).json(character.books);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;

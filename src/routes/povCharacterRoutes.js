const router = require("express").Router();

const PovCharacter = require("../models/PovCharacter");

router.get("/", async (req, res) => {
    try {
        const povCharacters = await PovCharacter.find();

        res.status(200).json(povCharacters);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const povCharacter = await PovCharacter.findOne({ _id: id });

        res.status(200).json(povCharacter);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;

const { Router } = require("express");
const {
    get_allVideogamesAp,
    get_allVideogamesDb,
    get_oneVideogameDb,
    get_oneVideogameAp,
    get_15games,
} = require("../controllers/videogames");
const { Videogame, Gender } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            let allgames = await get_allVideogamesAp();
            let resp = await get_allVideogamesDb();

            let final = [...resp, ...allgames];
            res.status(200).send(final);
        } else {
            const resp = await get_15games(name);
            console.log(resp)
            res.status(200).send(resp);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    var boo = false;

    for (let i = 0; i < id.length; i++) {
        if (id[i] >= "a") {
            boo = true;
        }
    }
    try {
        if (boo) {
            const res2 = await get_oneVideogameDb(id);
            res.status(200).send(res2);
        } else {
            const res1 = await get_oneVideogameAp(id);
            res.status(200).send([res1]);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/", async (req, res) => {
    const { name, image, platforms, description, released, rating, gender } =
        req.body;

    try {
        const result = await Videogame.create({
            name,
            image,
            platforms,
            description,
            released,
            rating,
            gender,
        });

        gender.forEach(async (element) => {
            const [genre, created] = await Gender.findOrCreate({
                where: {
                    name: [element],
                },
            });
            await result.addGender(genre);
            console.log(created);
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.put(`/:id`, async (req, res) => {
    const { id } = req.params;
    const { name, image, platforms, description, released, rating, genders, } = req.body;
    try {
        let currentGame = await Videogame.findByPk(id, { include: Gender });
        currentGame?.update(
            { name, image, platforms, description, released, rating }
        );
        console.log(currentGame);
        genders.forEach(async (element) => {
            const [genders, created] = await Gender.findOrCreate({
                where: {
                    name: [element],
                },
            });
            await currentGame?.setGenders(genders);
            console.log(created);
        });
        res.status(200).json(currentGame);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        await Videogame.destroy({ where: { id } })
        res.status(200).send(`Game id ${id} successfully destroyed`)
    }
    catch (err) {
        res.status(400).send('Something went wrong!')
    }
})


module.exports = router;
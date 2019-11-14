const router = require("express").Router();
const mongoose = require("mongoose");
const Skill = mongoose.model("Skill");
var result = require("./response");

router.post("/", async (req, res) => {
    if (!req.body.name) {
        res.send(result.response(422, "", "Name is empty"));
    } else {
        const skill = new Skill();
        skill.name = req.body.name;
        skill.desc = req.body.desc;
        console.log(req.body);
        await skill.save(function (err, skill) {
            if (err) {
                res.send(
                    result.response(
                        500,
                        err,
                        "OOPS, Something went wrong !, Please try again"
                    )
                );
            } else {
                res.send(result.response(200, skill, "Blog Added !"));
            }
        });
    }
});

router.get("/", async (req, res) => {
    await Skill.find({}, function (err, skill) {
        if (err) {
            res.send(
                result.response(
                    500,
                    err,
                    "OOPS, Something went wrong !, Please try again"
                )
            );
        } else {
            res.send(result.response(200, skill, "All Blog"));
        }
    });
});
module.exports = router;

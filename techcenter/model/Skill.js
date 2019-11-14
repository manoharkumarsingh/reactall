const mongoose = require("mongoose");
const skill_schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: "Skill is required"
        },
        desc: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Skill", skill_schema);

const mongoose = require("mongoose");
const queans_schema = mongoose.Schema(
    {
        que: {
            type: String,
            required: "Question is required"
        },
        ans: {
            type: String,
            required: "Answer is required"
        },
        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill",
                required: "Skill is required"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Queans", queans_schema);

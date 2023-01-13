const mongoose = require("mongoose")

const student = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subjects: [{
        subName: String,
        marks: Number,
        require: true
    }],

    isDeleted: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model("student", student)

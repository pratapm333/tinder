const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://pratap3090:qLpzMTZh09v1Jxpt@mernproject.wfxm7.mongodb.net/loveTinder"
    );
};

module.exports = connectDB;

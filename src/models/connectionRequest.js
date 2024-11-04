const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status:{
            type: String,
            required: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is in correct status type`
            },
        },
       
    },{timestamps: true}
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't send request to yourself")
    }
    next();
})

connectionRequestSchema.index({
    fromUserId: 1,
    toUserId: 1
})

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest" , 
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;
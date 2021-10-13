import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    admin: {type: Boolean, required: true}
},{
    timestamps: true,
})

// mongoose.models = [];

const User = mongoose.models.User || new mongoose.model("User", userSchema);

export default User;
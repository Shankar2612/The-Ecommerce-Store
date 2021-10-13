import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mobile: {type: Number, required: true, unique: true},
    pinCode: {type: Number, required: true},
    address: {type: String, required: true},
    locality: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true}
}, {
    timestamps: true
});

// mongoose.models = [];

const Address = mongoose.models.Address || new mongoose.model("Address", addressSchema);

export default Address;


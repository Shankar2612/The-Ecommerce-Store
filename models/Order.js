import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false},
    orderItems: {type: Array},
    shippingAddress: {
        name: {type: String, required: true},
        mobile: {type: Number, required: true},
        address: {type: String, required: true},
        locality: {type: String, required: true},
        city: {type: String, required: true},
        pincode: {type: Number, required: true},
        district: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true}
    },
    orderID: {type: String, required: true, unique: true},
    razorpayPaymentID: {type: String, required: true, unique: true},
    razorpaySignature: {type: String, required: true, unique: true},
    totalPrice: {type: Number, required: true},
    userName: {type: String, required: true, unique: false},
    userEmail: {type: String, required: true, unique: false},
    isPaid: {type: Boolean, required: true, default: false},
    paidAt: {type: Date, required: true},
},
{
    timestamps: true,
});

// mongoose.models = [];

const Order = mongoose.models.Order || new mongoose.model("Order", orderSchema);

export default Order;




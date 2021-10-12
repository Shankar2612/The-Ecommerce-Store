import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    name: {type: String, required: true, text: true, index: true},
    rating: {type: Number, required: true, default: 0},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    shortDescription: {type: String, required: true, unique: true},
    longDescription: {type: [], required: true},
    image: {type: String, required: true},
    colors: {type: [], required: true},
    brand: {type: String, required: true},
    sizes: {type: []},
    stock: {type: Number, required: true}
},{
    timestamps: true,
})

mongoose.models = [];

const Product = mongoose.models.Product || new mongoose.model("Product", productSchema);

export default Product;
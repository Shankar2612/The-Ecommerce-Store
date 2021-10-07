import React, {useState} from 'react'
import styles from "../styles/AddProductModal.module.scss"
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import AlertComponent from '../components/AlertComponent'

export default function AddProductModal(props) {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("Electronics");
    const [subCategory, setSubCategory] = useState("Camera");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState([{longDescription: ""}]);
    const [colors, setColors] = useState([{color: ""}]);
    const [sizes, setSizes] = useState([{size: ""}]);
    const [image, setImage] = useState("");
    const [noOfLongDescription, setNoOfLongDescription] = useState([1]);
    const [noOfColors, setNoOfColors] = useState([1]);
    const [noOfSizes, setNoOfSizes] = useState([1]);
    const [addImageUrl, setAddImageUrl] = useState(false);
    const [addProductLoader, setAddProductLoader] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const handleChangeLongDescription = (e, index) => {
        if(longDescription.length === 0) {
            setLongDescription([{longDescription: e.target.value}]);
        } else {
            if(longDescription[index]) {
                let newLongDescription = [];
                longDescription.map((descr, i) => {
                    if(index === i) {
                        newLongDescription.push({longDescription: e.target.value});
                    } else {
                        newLongDescription.push(descr);
                    }
                })
                setLongDescription(newLongDescription);
            } else {
                setLongDescription(longDescription.concat([{longDescription: e.target.value}]));
            }
        }
    }

    const handleChangeColor = (e, index) => {
        if(colors.length === 0) {
            setLongDescription([{color: e.target.value}]);
        } else {
            if(colors[index]) {
                let newColor = [];
                colors.map((color, i) => {
                    if(index === i) {
                        newColor.push({color: e.target.value});
                    } else {
                        newColor.push(color);
                    }
                })
                setColors(newColor);
            } else {
                setColors(colors.concat([{color: e.target.value}]));
            }
        }
    }

    const handleChangeSize = (e, index) => {
        if(sizes.length === 0) {
            setSizes([{size: e.target.value}]);
        } else {
            if(sizes[index]) {
                let newSize = [];
                sizes.map((size, i) => {
                    if(index === i) {
                        newSize.push({size: e.target.value});
                    } else {
                        newSize.push(size);
                    }
                })
                setSizes(newSize);
            } else {
                setSizes(sizes.concat([{size: e.target.value}]));
            }
        }
    }

    const addNewLongDescription = () => {
        setNoOfLongDescription(state => [...state, 1]);
    }

    const addNewColor = () => {
        setNoOfColors(state => [...state, 1]);
    }

    const addNewSize = () => {
        setNoOfSizes(state => [...state, 1]);
    }

    const removeLongDescription = (index) => {
        let duplicateNoOfLongDescription = [...noOfLongDescription];
        duplicateNoOfLongDescription.splice(index, index+1);
        const newLongDescription = [];
        longDescription.map((descr, i) => {
            if(index !== i) {
                newLongDescription.push(descr);
            }
        })

        setLongDescription(newLongDescription);

        setNoOfLongDescription(duplicateNoOfLongDescription);
    }

    const removeColor = (index) => {
        let duplicateNoOfColor = [...noOfColors];
        duplicateNoOfColor.splice(index, index+1);
        const newColor = [];
        colors.map((color, i) => {
            if(index !== i) {
                newColor.push(color);
            }
        })

        setColors(newColor);

        setNoOfColors(duplicateNoOfColor);
    }

    const removeSize = (index) => {
        let duplicateNoOfSize = [...noOfSizes];
        duplicateNoOfSize.splice(index, index+1);
        const newSize = [];
        sizes.map((color, i) => {
            if(index !== i) {
                newSize.push(color);
            }
        })

        setSizes(newSize);

        setNoOfSizes(duplicateNoOfSize);
    }

    const handleSubmit = () => {
        if(name.length === 0) {
            setAlert(true);
            setAlertMessage("Please Enter Product Name");
            setSeverity("error");
        } else if(brand.length === 0) {
            setAlert(true);
            setAlertMessage("Please Enter Product Brand");
            setSeverity("error");
        } else if(price === 0) {
            setAlert(true);
            setAlertMessage("Please Enter Product Price");
            setSeverity("error");
        } else if(shortDescription.length === 0) {
            setAlert(true);
            setAlertMessage("Please Enter Product's short description");
            setSeverity("error");
        } else if(shortDescription.length > 80) {
            setAlert(true);
            setAlertMessage("Please keep Product's short description within 80 characters");
            setSeverity("error");
        } else if(longDescription.length < 3) {
            setAlert(true);
            setAlertMessage("Please provide more information about this product. Minimum three points");
            setSeverity("error");
        } else if(colors.length < 2) {
            setAlert(true);
            setAlertMessage("Please provide at least two available colors");
            setSeverity("error");
        } else if(sizes[0].size.length === 0) {
            setAlert(true);
            setAlertMessage("Please provide Product size");
            setSeverity("error");
        } else if(stock === 0) {
            setAlert(true);
            setAlertMessage("Please provide number of products in stock");
            setSeverity("error");
        } else if(image.length === 0) {
            setAlert(true);
            setAlertMessage("Please provide Product Image URL");
            setSeverity("error");
        } else {
            let newLongDescription = [];
            let newColors = [];
            let newSizes = [];

            longDescription.map(description => {
                newLongDescription.push(description.longDescription);
            });

            colors.map(color => {
                newColors.push(color.color);
            });

            sizes.map(size => {
                newSizes.push(size.size);
            });

            setAddProductLoader(true);
            axios.post("/api/addProducts", {name: name, brand: brand, stock: stock, category: category, subCategory: subCategory, price: price, discount: discount, shortDescription: shortDescription, longDescription: newLongDescription, colors: newColors, sizes: newSizes, image: image})
            .then(res => {
                setAlert(true);
                setAlertMessage(res.data.message);
                setSeverity("success");
                setAddProductLoader(false);
                props.openAddProductModal();
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                setAddProductLoader(false);
                props.openAddProductModal();
            });
        }
    }

    return (
        <div className={styles.productModal}>
            <div className={styles.modalHeading}>
                <h1>Product Details</h1>
                <img onClick={() => props.openAddProductModal()} src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png" alt="close-icon" />
            </div>
            <div className={styles.modalContainer}>
                <div className={styles.modalImgDiv}>
                    {image.length === 0 ? <div className={styles.img}></div> : <img src={image} alt="product-img" />}
                    {addImageUrl ? <input onChange={(e) => setImage(e.target.value)} type="text" placeholder="Image URL" /> : null}
                    <button onClick={() => setAddImageUrl(true)} type="button">Add Product Image URL</button>
                </div>
                <div className={styles.modalInfoDiv}>
                    <h4>Name:</h4>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="e.g. Sony Digital Camera 1234" />
                    <h4>Brand:</h4>
                    <input onChange={(e) => setBrand(e.target.value)} value={brand} type="text" placeholder="e.g. Sony" />
                    <div className={styles.twoFields}>
                        <div className={styles.field}>
                            <h4>Category:</h4>
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option>Electronics</option>
                                <option>Computers and Hardwares</option>
                                <option>Men Fashion</option>
                                <option>Women Fashion</option>
                                <option>Kid Fashion</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <h4>Sub Category:</h4>
                            <select onChange={(e) => setSubCategory(e.target.value)}>
                                <option>Camera</option>
                                <option>Headphones</option>
                                <option>Tablets</option>
                                <option>Laptops</option>
                                <option>Printers</option>
                                <option>Clothing</option>
                                <option>Shoes</option>
                                <option>Watches</option>
                                <option>Handbags</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.twoFields}>
                        <div className={styles.field}>
                            <h4>Price: (in ₹)</h4>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} style={{width: "100%"}} min={0} type="number" placeholder="e.g. 30000" />
                        </div>
                        <div className={styles.field}>
                            <h4>Discount: (in %)</h4>
                            <input onChange={(e) => setDiscount(e.target.value)} value={discount} style={{width: "100%"}} min={0} type="number" placeholder="e.g. 10" />
                        </div>
                    </div>
                    <h4>Short Description:</h4>
                    <input onChange={(e) => setShortDescription(e.target.value)} value={shortDescription} style={{width: "100%"}} type="text" placeholder="e.g. This is a 48MP camera " />
                    <h4>Long Description:</h4>
                    <div className={styles.fields}>
                        {noOfLongDescription.map((description, index) => {
                            if (index === 0) {
                                return <div key={index} style={{marginBottom: 20}} className={styles.longDescription}>
                                <input onChange={(e) => handleChangeLongDescription(e, index)} style={{width: "100%", marginBottom: 0, marginRight: 0}} type="text" placeholder="e.g. This is a 48MP camera " />
                                <div className={styles.actionsDiv}>
                                    {longDescription[index].longDescription.length !== 0 ? <img onClick={() => addNewLongDescription()} src="https://cdn-icons-png.flaticon.com/128/148/148764.png" alt="add-icon" /> : null}
                                </div>
                            </div>
                            } else {
                                return <div key={index} style={{marginBottom: 20}} className={styles.longDescription}>
                                <input onChange={(e) => handleChangeLongDescription(e, index)} style={{width: "100%", marginBottom: 0, marginRight: 0}} type="text" placeholder="e.g. This is a 48MP camera " />
                                <div className={styles.actionsDiv}>
                                    <img onClick={() => removeLongDescription(index)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />
                                    {longDescription[index] ? longDescription[index].longDescription.length ? <img onClick={() => addNewLongDescription()} src="https://cdn-icons-png.flaticon.com/128/148/148764.png" alt="add-icon" /> : null : null}
                                </div>
                            </div>
                            }
                        })}
                    </div>
                    <div style={{marginBottom: 20}} className={styles.twoFields}>
                        <div className={styles.fields}>
                            <div className={styles.field}>
                                <h4>Colors:</h4>
                                {noOfColors.map((color, index) => {
                                    if (index === 0) {
                                        return  <div key={index} style={{marginBottom: 10}} className={styles.longDescription}>
                                                    <input onChange={(e) => handleChangeColor(e, index)} style={{width: "100%", marginBottom: 0}} type="text" placeholder="e.g. Black " />
                                                    <div className={styles.actionsDiv}>
                                                        {colors[index].color.length !== 0 ? <img onClick={() => addNewColor()} src="https://cdn-icons-png.flaticon.com/128/148/148764.png" alt="add-icon" /> : null}
                                                    </div>
                                                </div>
                                    } else {
                                        return  <div key={index} style={{marginBottom: 10}} className={styles.longDescription}>
                                                    <input onChange={(e) => handleChangeColor(e, index)} style={{width: "100%", marginBottom: 0}} type="text" placeholder="e.g. Black " />
                                                    <div className={styles.actionsDiv}>
                                                        <img onClick={() => removeColor(index)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />
                                                        {colors[index] ? colors[index].color.length !== 0 ? <img onClick={() => addNewColor()} src="https://cdn-icons-png.flaticon.com/128/148/148764.png" alt="add-icon" /> : null : null}
                                                    </div>
                                                </div>
                                    }
                                })}
                            </div>
                        </div>
                        <div className={styles.field}>
                            <h4>Sizes:</h4>
                            {noOfSizes.map((size, index) => {
                                if (index === 0) {
                                    return <div key={index} style={{marginBottom: 10}} className={styles.longDescription}>
                                                <input onChange={(e) => handleChangeSize(e, index)} style={{width: "100%", marginBottom: 0}} type="text" placeholder="e.g. 10Y " />
                                                <div className={styles.actionsDiv}>
                                                    {sizes[index].size.length !== 0 ? <img onClick={() => addNewSize()} src="https://cdn-icons-png.flaticon.com/128/148/148764.png" alt="add-icon" /> : null}
                                                </div>
                                            </div>
                                } else {
                                    return <div key={index} style={{marginBottom: 10}} className={styles.longDescription}>
                                                <input onChange={(e) => handleChangeSize(e, index)} style={{width: "100%", marginBottom: 0}} type="text" placeholder="e.g. 10Y " />
                                                <div className={styles.actionsDiv}>
                                                    <img onClick={() => removeSize(index)} src="https://cdn-icons-png.flaticon.com/128/812/812853.png" alt="delete-icon" />
                                                    {sizes[index] ? sizes[index].size.length !== 0 ? <img onClick={() => addNewSize()} src="https://cdn-icons-png.flaticon.com/128/148/148764.png" alt="add-icon" /> : null : null}
                                                </div>
                                            </div>
                                }
                            })}
                        </div>
                    </div>
                    <h4>Stock:</h4>
                    <input onChange={(e) => setStock(e.target.value)} value={stock} type="number" placeholder="e.g. 20" />
                    {addProductLoader ? <CircularProgress style={{ color: "red", margin: "0px 30px 10px auto"}} size={25} /> : <button onClick={() => handleSubmit()} type="submit">Add Product</button>}
                </div>
            </div>
            <AlertComponent severity={severity} open={alert} close={setAlert} message={alertMessage} />
        </div>
    )
}

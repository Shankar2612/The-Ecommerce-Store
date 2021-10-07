import * as actions from "./actionTypes";
import Cookies from 'js-cookie'

const initialStateCart = {
    cart: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
};

const initialStateAuth = {
    userInfo: Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null
}

const initialStateAddress = {
    userAddress: Cookies.get("userAddress") ? JSON.parse(Cookies.get("userAddress")) : null
}

const initialStateOrderItems = {
    orderItems: Cookies.get("orderItems") ? JSON.parse(Cookies.get("orderItems")) : null
}

export const addCartReducer = (state=initialStateCart, action) => {
    switch(action.type) {
        case actions.ADD_TO_CART:
            const newItem = action.payload;
            const existItem = state.cart.find(item => item.name === newItem.name);

            if(existItem) {
                const cartItems = [...state.cart]
                Cookies.set("cartItems", JSON.stringify(cartItems));
                return {
                    cart: [...state.cart]
                }
            } else {
                const cartItems = [...state.cart, action.payload];
                Cookies.set("cartItems", JSON.stringify(cartItems));
                return {
                    cart: [...state.cart, action.payload]
                }
            }
        case actions.CHANGE_ITEM_QUANTITY:
            const product = action.payload.product;

            const filteredItems = state.cart.filter(item => item.name !== product.name);

            const newItemsArray = [...filteredItems, {...product, quantity: action.payload.quantity}];
            Cookies.remove("cartItems");
            Cookies.set("cartItems", JSON.stringify(newItemsArray));

            return {
                cart: newItemsArray
            }
        case actions.REMOVE_FROM_CART:
            const removeItem = action.payload;
            const newItemsAfterRemoved = state.cart.filter(item => item.name !== removeItem.name);

            Cookies.remove("cartItems");
            Cookies.set("cartItems", JSON.stringify(newItemsAfterRemoved));

            return {
                cart: newItemsAfterRemoved
            }
        case actions.USER_LOGOUT:
            return {
                cart: []
            }
        default:
            return state;
    }
}

export const userAuthReducer = (state=initialStateAuth, action) => {
    switch (action.type) {
        case actions.USER_LOGIN:
            return {
                ...state,
                userInfo: action.payload
            }
        case actions.USER_LOGOUT:
            return {
                ...state,
                userInfo: null
            }
        default:
            return state;
    }
}

export const userAddressReducer = (state=initialStateAddress, action) => {
    switch (action.payload) {
        case actions.ADD_USER_ADDRESS:
            return {
                ...state,
                userAddress: action.payload
            }
        case actions.REMOVE_USER_ADDRESS:
            return {
                ...state,
                userAddress: null
            }
        case actions.USER_LOGOUT:
            return {
                ...state,
                userAddress: null
            }
        default: 
            return state;
    }
}

export const userOrderReducer = (state=initialStateOrderItems, action) => {
    switch (action.payload) {
        case actions.ADD_ORDER_ITEMS:
            return {
                ...state,
                orderItems: action.payload
            };
        case actions.REMOVE_ORDER_ITEMS:
            return {
                ...state,
                orderItems: null
            };
        default: 
            return state;
    }
}
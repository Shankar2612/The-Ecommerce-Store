import { ADD_TO_CART, CHANGE_ITEM_QUANTITY, REMOVE_FROM_CART, REMOVE_USER_ADDRESS, ADD_USER_ADDRESS, USER_LOGIN, USER_LOGOUT, ADD_ORDER_ITEMS, REMOVE_ORDER_ITEMS } from "./actionTypes";

export const setCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
})

export const setQuantity = (product, quantity) => ({
    type: CHANGE_ITEM_QUANTITY,
    payload: {
        product: product,
        quantity: quantity
    }
})

export const removeCart = (product) => ({
    type: REMOVE_FROM_CART,
    payload: product
})

export const userLogin = (userInfo) => ({
    type: USER_LOGIN,
    payload: userInfo
})

export const userLogout = () => ({
    type: USER_LOGOUT,
    payload: null
})

export const setUserAddress = (address) => ({
    type: ADD_USER_ADDRESS,
    payload: address
})

export const removeUserAddress = () => ({
    type: REMOVE_USER_ADDRESS,
    payload: null
})

export const addOrderItems = (orderItems) => ({
    type: ADD_ORDER_ITEMS,
    payload: orderItems
})

export const removeOrderItems = () => ({
    type: REMOVE_ORDER_ITEMS,
    payload: null
})
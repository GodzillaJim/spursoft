import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from './reducers/userReducers.js'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer
})
const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
: []



const userInfoFromStorage = () => {
    try {
        if (localStorage.getItem('userInfo')) {
            return JSON.parse(localStorage.getItem('userInfo'))
        }
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        userLogin: { userInfo: userInfoFromStorage }
    }
}
const middleWare = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)
export default store;
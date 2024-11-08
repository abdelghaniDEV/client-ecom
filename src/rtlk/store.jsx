import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";

import cartSlices from "./slices/cart-slices";
import categoriesSlice from "./slices/categories-slice";
import wshlistSlice from "./slices/wshlist-slice";
import settingsSlice from "./slices/settings-slice"
import templateSlice from "./slices/template.slice"



export const store = configureStore({
    reducer:{
        products : productsSlice,
        categories : categoriesSlice,
        cart : cartSlices,
        wshlist : wshlistSlice,
        settings : settingsSlice,
        template : templateSlice,
    },
})
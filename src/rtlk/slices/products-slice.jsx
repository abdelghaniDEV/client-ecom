import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import { act } from "react";
import { useDispatch } from "react-redux";


export const fetchProducts = createAsyncThunk("productsSlice/fetchProducts", async () => {
  //`${process.env.REACT_APP_API_URL}/api/products?populate=*

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.log(error)
        console.error("Error fetching categories:", error);
        throw error; // Reject the thunk with error
      }
})

const productsSlice = createSlice({
    initialState : [],
    name : "productsSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.fulfilled , (state , action) => {
            return state = action.payload.data.products
            
        })
    }
})

const {} = productsSlice.actions
export default productsSlice.reducer
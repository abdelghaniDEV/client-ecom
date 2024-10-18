import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";





export const fetchCatrgpries = createAsyncThunk('categpries-slice/fetchCatrgpries' , async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Reject the thunk with error
      }

})


const categoriesSlice = createSlice ({
    initialState : [],
    name: 'categoriesSlice',
    reducers: {

    },
    extraReducers : (builder) => {
        builder.addCase(fetchCatrgpries.fulfilled , (state , action) => {
             return state = action.payload.data.categories
        })
    }
})


const { } = categoriesSlice.actions;
export default categoriesSlice.reducer;



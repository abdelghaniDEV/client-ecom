import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTemplate = createAsyncThunk("templateSlice/fetchTemplate", async () => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/template`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching Template:", error);
        throw error; // Reject the thunk with error
      }
})

const templateSlice = createSlice({
    initialState : [],
    name : "templateSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchTemplate.fulfilled , (state , action) => {
            return state = action.payload.data
            
        })
    }
})

const {} = templateSlice.actions
export default templateSlice.reducer
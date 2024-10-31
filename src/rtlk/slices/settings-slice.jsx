import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSettings = createAsyncThunk("settingsSlice/fetchSettings", async () => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/settings`, {
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

const settingsSlice = createSlice({
    initialState : [],
    name : "settingsSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchSettings.fulfilled , (state , action) => {
            return state = action.payload.data.settings
            
        })
    }
})

const {} = settingsSlice.actions
export default settingsSlice.reducer
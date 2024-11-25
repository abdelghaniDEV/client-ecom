
import { createSlice } from "@reduxjs/toolkit";

// Helper functions to interact with local storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: loadFromLocalStorage(),
  reducers: {
    addProducts: (state, action) => {
      const findProd = state.find((item) => item._id === action.payload._id);
      if (findProd) {
        findProd.amount = action.payload.amount;
        findProd.sizeTarget = action.payload.sizeTarget;
        findProd.colorSelector = action.payload.colorSelector;
      } else {
        state.push({ ...action.payload });
      }
      saveToLocalStorage(state); // Save state to local storage
    },
    deleteItemCart: (state, action) => {
      const updatedState = state.filter((item) => item._id !== action.payload._id);
      saveToLocalStorage(updatedState); // Save state to local storage
      return updatedState;
    },
    deletALLItems : (state , action) =>{
      const updatedState = state = [];
      saveToLocalStorage(updatedState);
      return updatedState
    },
    decrementAmount: (state, action) => {
      const findProd = state.find((item) => item._id === action.payload._id);
      if (findProd) {
        findProd.amount -= 1;
        saveToLocalStorage(state); // Save state to local storage
      }
    },
    incrementAmount: (state, action) => {
      const findProd = state.find((item) => item._id === action.payload._id);
      if (findProd) {
        findProd.amount += 1;
        saveToLocalStorage(state); // Save state to local storage
      }
    }
  }
});

export const { addProducts, deleteItemCart, decrementAmount, incrementAmount  , deletALLItems} = cartSlice.actions;
export default cartSlice.reducer;










// import { createSlice } from "@reduxjs/toolkit";

// // const cartSlice = createSlice({
// //   initialState: [],
// //   name: " cartSlice",
// //   reducers: {
// //     addProducts: (state, action) => {
// //       const findprod = state.find((item) => item.id === action.payload.id)
// //       if(findprod){
// //         findprod.amount = action.payload.amount
// //         findprod.sizeTarget = action.payload.sizeTarget
// //       }else {
// //         state.push({ ...action.payload});
// //       }
// //     },
// //     deletItemCart: (state, action) => {
// //       return state.filter((item) => item.id !== action.payload.id);
// //     },
// //     decrementAmount: (state, action) => {
// //       const findProd = state.find((item) => item.id === action.payload.id)
// //       if(findProd){
// //         findProd.amount += 1
// //       }
// //     },
// //     incrementAmount: (state , action) => {
// //       const findProd = state.find((item) => item.id === action.payload.id)
// //       if(findProd){
// //         findProd.amount -= 1
// //       }
// //     }
// //   },
// // });


// const saveToLocalStorage = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("cart", serializedState);
//   } catch (e) {
//     console.error("Could not save state", e);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("cart");
//     if (serializedState === null) return [];
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.error("Could not load state", e);
//     return [];
//   }
// };

// const cartSlice = createSlice({
//   name: "cartSlice",
//   initialState: loadFromLocalStorage(),
//   reducers: {
//     addProducts: (state, action) => {
//       const findProd = state.find((item) => item.id === action.payload.id);
//       if (findProd) {
//         findProd.amount = action.payload.amount;
//         findProd.sizeTarget = action.payload.sizeTarget;
//       } else {
//         state.push({ ...action.payload });
//       }
//       saveToLocalStorage(state); // Save state to local storage
//     },
//     deleteItemCart: (state, action) => {
//       const index = state.findIndex((item) => item.id === action.payload.id);
//       if (index !== -1) {
//         state.splice(index, 1);
//         saveToLocalStorage(state);
//       }
//     },
//     decrementAmount: (state, action) => {
//       const findProd = state.find((item) => item.id === action.payload.id);
//       if (findProd) {
//         findProd.amount -= 1;
//         saveToLocalStorage(state); // Save state to local storage
//       }
//     },
//     incrementAmount: (state, action) => {
//       const findProd = state.find((item) => item.id === action.payload.id);
//       if (findProd) {
//         findProd.amount += 1;
//         saveToLocalStorage(state); // Save state to local storage
//       }
//     }
//   }
// });


// export const { addProducts, deleteItemCart, decrementAmount  , incrementAmount} =cartSlice.actions;
// export default cartSlice.reducer;

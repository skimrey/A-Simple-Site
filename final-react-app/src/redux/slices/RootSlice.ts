import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: "Title",
        author: "Author",
        publisher: "Publisher",
        pageCount: "pageCount",
        current_user_token: "5650c695baf0828f218c7dd99b831f868fa8453cee739908",
    },
    reducers: {
        // action is submitted elsewhere - written to state.name
        chooseName: (state, action) => { state.title = action.payload }, // All we're doing is setting the input to the state.name
        chooseEmail: (state, action) => { state.author = action.payload },
        choosePhone: (state, action) => { state.publisher = action.payload },
        chooseAddress: (state, action) => { state.pageCount = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseEmail, choosePhone, chooseAddress } = rootSlice.actions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
}

const userData: User[] = [];
export const getAllAccounts = createAsyncThunk("getallAccounts", async () => {
  try {
    const response = await axios.get("http://localhost:8080/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const addUserAccount = createAsyncThunk(
  "addUserAccount",
  async (user: { fullName: string; email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:8080/users", user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    users: userData,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccounts.pending, () => {
        console.log("Loading...");
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.users = action.payload;
        console.log(state.users);
      })
      .addCase(getAllAccounts.rejected, () => {
        console.log("Error when fetching data");
      })
      .addCase(addUserAccount.fulfilled, (state, action) => {
        state.users.push(action.payload);
        console.log("User added:", action.payload);
      })
      .addCase(addUserAccount.rejected, () => {
        console.log("Error when adding user");
      })
  },
});

export default accountSlice.reducer;

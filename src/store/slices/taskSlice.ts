import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Task {
  id?: number;
  taskName: string;
  assigneeId?: number;
  projectId?: number;
  asignDate?: string;
  dueDate?: string;
  priority?: string;
  progress?: string;
  status?: string;
}

const initial: Task[] = [];

export const getAllTasks = createAsyncThunk("task/getAllTasks", async () => {
  try {
    const res = await axios.get("http://localhost:8080/task");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
});

export const addTask = createAsyncThunk("task/addTask", async (task: Task) => {
  try {
    const res = await axios.post("http://localhost:8080/task", task);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (payload: { id: number; task: Task }) => {
    try {
      const res = await axios.put(`http://localhost:8080/task/${payload.id}`, payload.task);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteTask = createAsyncThunk("task/deleteTask", async (id: number) => {
  try {
    await axios.delete(`http://localhost:8080/task/${id}`);
    return id;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const taskSlice = createSlice({
  name: "task",
  initialState: { tasks: initial },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t: any) => t.id === action.payload.id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t: any) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;

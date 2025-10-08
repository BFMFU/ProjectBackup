import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Project {
    id?: number;
    projectName: string;
    image?: string;
    description?: string;
    members?: { userId: number; role: string; }[];
}
const projectData: Project[] = [];
export const addProject = createAsyncThunk(
    "project/addProject",
    async (project: { projectName: string; image?: string; description?: string; members?: { userId: number; role: string; }[] }) => {
        try {
            const response = await axios.post("http://localhost:8080/projects", project);
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
);
export const getAllProjects = createAsyncThunk("project/getAllProjects", async () => {
    try {
        const response = await axios.get("http://localhost:8080/projects");
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
});

export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (payload: { id: number; project: { projectName: string; image?: string; description?: string; members?: { userId: number; role: string; }[] } }) => {
        try {
            const response = await axios.put(`http://localhost:8080/projects/${payload.id}`, payload.project);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/projects/${id}`);
            return id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const proJectSlice = createSlice({
  name: "project",
  initialState: {
    projects: projectData,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProjects.pending, () => {
            console.log("Loading projects...");
        })
        .addCase(getAllProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
        })
        .addCase(getAllProjects.rejected, () => {
            console.log("Error when fetching projects");
        })
    .addCase(addProject.fulfilled, (state, action) => {
        if (action.payload) state.projects.push(action.payload);
    })
    .addCase(addProject.rejected, () => {
        console.log("Error when adding project");
    })
    .addCase(updateProject.fulfilled, (state, action) => {
        const idx = state.projects.findIndex((p: any) => p.id === action.payload.id);
        if (idx !== -1) state.projects[idx] = action.payload;
    })
    .addCase(updateProject.rejected, () => {
        console.log("Error when updating project");
    })
    .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p: any) => p.id !== action.payload);
    })
    .addCase(deleteProject.rejected, () => {
        console.log("Error when deleting project");
    });
    },
});
export default proJectSlice.reducer;
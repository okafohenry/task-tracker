import { T, TaskProps } from "@components/models/task";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { UserInfoModel } from "./models";

const initialState: TaskProps = {
    tasks: [
        { id: 1, name: 'Task 1', description: 'Description 1', dueDate: '2023-12-31', column: 'open' },
        { id: 2, name: 'Task 2', description: 'Description 2', dueDate: '2023-12-31', column: 'pending' },
        // Add more initial tasks as needed
      ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: any, action: PayloadAction<T>) => {
        state.tasks.push(action.payload);
    },
    editTask: (state: any, action: PayloadAction<T>) => {
        const index = state.tasks.findIndex((task: any) => task.id === action.payload?.id);
        if (index !== -1) {
            state.tasks[index] = action.payload;
        }
    },
    deleteTask: (state: any, action: PayloadAction<number | string>) => {
        state.tasks = state.tasks.filter((task: any) => task.id !== action.payload);
    }
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;

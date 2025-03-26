import {createSlice} from '@reduxjs/toolkit'

const initialState={
    taskList:JSON.parse(localStorage.getItem('tasks')) || []
}

const taskSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{
        addTask:(state,action)=>{
            state.taskList.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.taskList));
        },
        deleteTask:(state,action)=>{
            state.taskList=state.taskList.filter((item,index)=>index !==action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.taskList));

        },
        updateTask:(state,action)=>{
            const{index,updatedTask}=action.payload
            state.taskList[index]=updatedTask
            localStorage.setItem('tasks', JSON.stringify(state.taskList));
         }
             
    }
})

export const {addTask,deleteTask,updateTask}=taskSlice.actions
export default taskSlice.reducer
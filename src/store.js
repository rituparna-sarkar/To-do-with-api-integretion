import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './features/tasks/taskSlice'
import weatherReducer from './features/weather/weatherSlice';
import authReducer from './features/auth/authSlice';

export const store=configureStore({
    reducer:{
        tasks:taskReducer,
        weather: weatherReducer,
        auth: authReducer
    }
})
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addTask} from '../features/tasks/taskSlice'

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch=useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
   dispatch(addTask({text,priority}))
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your task"
      />
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;

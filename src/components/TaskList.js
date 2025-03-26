import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { updateTask } from '../features/tasks/taskSlice'
import { getWeatherByCoords } from '../features/weather/weatherSlice'
import '../App'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TaskList = () => {

    const tasks = useSelector((state) => state.tasks.taskList);
  const weather = useSelector((state) => state.weather.data);
    const loading = useSelector((state) => state.weather.loading);

    const dispatch = useDispatch()

    const [editIndex, setEditIndex] = useState(null)
    const [editedText, setEditedText] = useState('');
    const [editedPriority, setEditedPriority] = useState('Medium')

    const isOutdoorTask = (text) => {
        const keywords = ['walk', 'run', 'jog', 'hike', 'cycle', 'outdoor'];
        return keywords.some((word) => text.toLowerCase().includes(word));
    };

    const startEditing = (task, index) => {
        setEditIndex(index);
        setEditedText(task.text);
        setEditedPriority(task.priority);
    };

    const handleUpdate = () => {
        dispatch(updateTask({ index: editIndex, updatedTask: { text: editedText, priority: editedPriority } }));
        setEditIndex(null);
    };

    useEffect(() => {
        const outdoorKeywords = ['walk', 'run', 'jog', 'hike', 'cycle', 'outdoor'];
        const hasOutdoorTask = tasks.some((task) =>
          outdoorKeywords.some((word) => task.text.toLowerCase().includes(word))
        );
    
        if (hasOutdoorTask && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              dispatch(getWeatherByCoords({ lat: latitude, lon: longitude }));
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Handle geolocation error or fallback
            }
          );
        }
      }, [tasks, dispatch]);

    return (
        <ul>
            {
                tasks.map((task, i) => (
                    <li key={i} className='task-item'>
                        {editIndex === i ? (
                            <>
                                <input
                                    value={editIndex}
                                    onChange={(e) => setEditIndex(e.target.value)}

                                />
                                <select
                                    value={editedPriority}
                                    onChange={(e) => setEditedPriority(e.target.value)}>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>

                                </select>
                                <div className='actions'>
                                    <button onClick={handleUpdate}>Update</button>
                                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                                </div>

                            </>) : (<>
                                <div className='section'>
                                    <div>
                                        {task.text} - <strong>{task.priority}</strong>
                                    </div>
                                    <div className='actions'>


                                        <button onClick={() => dispatch(deleteTask(i))}><MdDelete style={{ fontSize: '20px' }}
                                        /></button>
                                        <button onClick={() => startEditing(task, i)}>
                                        Edit</button>
                                    </div>
                                </div>


                            </>)
                        }

                        {isOutdoorTask(task.text) && (
                            <div className='weather-info'>
                                {loading ? (
                                    <em>Loading weather...</em>
                                ) : weather ? (
                                    <div>
                                        🌡️ {weather.main.temp}°C - {weather.weather[0].description}
                                    </div>
                                ) : (
                                    <span>❌ Weather not available</span>
                                )}
                            </div>
                        )}

                    </li>
                ))
            }
        </ul>
    )
}

export default TaskList
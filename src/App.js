import logo from './logo.svg';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from './features/auth/authSlice';
import Login from './components/Login';
function App() {

  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    

    <div className="app-container">
     <h2>Develop an Advanced React To-Do Application with API Integration
</h2>

      {isAuthenticated ? (
        <>
          <div style={{ marginBottom: '1rem' }}>
          <div className='logout'> 
            <strong>Welcome, {username}!</strong>
            <button onClick={() => dispatch(logout())} style={{ marginLeft: '1rem' }}>
              Logout
            </button>
            </div>
          </div>
          <TaskInput />
          <TaskList />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

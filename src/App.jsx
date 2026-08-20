import { useState, useEffect } from 'react'
import { mockUsers, mockFetch } from '../mockData.js'
import CoursesPage from './Pages/CoursesPage.jsx'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    mockFetch(mockUsers).then((data) => {
      setUsers(data);
    });
  }, []); // empty array = run once when component mounts

  console.log('Users:', users);

  return (
    <>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
      
      <CoursesPage />
    </>
  );
}

export default App
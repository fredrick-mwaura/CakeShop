import {useState, useEffect} from 'react';
import './styles/users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching users with a delay
    const fetchUser = async () => {
      // Fake user data
      const fakeUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', signupDate: '2024-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', signupDate: '2024-01-05' },
        { id: 3, name: 'Mark Spencer', email: 'mark@example.com', signupDate: '2024-01-10' },
      ];
      
      // Simulating delay using setTimeout
      setTimeout(() => {
        setUsers(fakeUsers);
      }, 1000); // Simulating a 1-second delay
    };

    fetchUser();
  }, []);
return (
    <div className="admin-panel">
      <main className="main-content">
        <h2>Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Sign-up Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.signupDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Users;

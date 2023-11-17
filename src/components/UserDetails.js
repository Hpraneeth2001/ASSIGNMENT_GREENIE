import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch user data from the database
    fetch('http://localhost:5000/api/auth/users')//use placeholder database
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateReport = (user) => {
    console.log('Generating report for user:', user);
  };

  return (
    <div>
      <h1>User Details Tab</h1>
      <input
        type="text"
        placeholder="Search by username, email, or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserTable users={filteredUsers} onGenerateReport={handleGenerateReport} />
    </div>
  );
};

export default UserDetails;

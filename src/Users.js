import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error } = await supabase
                    .from('Users')
                    .select('id, username, email'); // Select specific fields

                if (error) throw error;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading users...</div>;

    return (
        <head>
            <p> This is a use list to show all users stored in our database. </p>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </head>

    );
}

export default Users;
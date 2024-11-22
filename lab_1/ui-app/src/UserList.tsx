import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';


interface User {
    index: number;
    name: string;
    surname: string;
    role: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({
        name: '',
        surname: '',
        role: '',
    });
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    // Pobieranie u�ytkownik�w z backendu
    useEffect(() => {
        axios
            .get('http://localhost:8000/users/')
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);


    // Dodawanie u�ytkownika
    const handleAddUser = () => {
        if (!privacyAccepted) {
            alert('You must agree to the privacy policy to proceed.');
            return;
        }
        if (!newUser.name || !newUser.surname || !newUser.role) {
            alert('All fields are required.');
            return;
        }
        axios
            .post('http://localhost:8000/users/', newUser)
            .then((response) => setUsers(response.data.users))
            .catch((error) => console.error('Error adding user:', error));
    };

    // Usuwanie u�ytkownika
    const handleDeleteUser = (index: number) => {
        axios
            .delete(`http://localhost:8000/?index=${index.toString()}`)
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div className="container">
            <div id="putinto">
                <h2>Let's level up your brand, together</h2>
                <h3>Enter Name</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })
                    }
                />
                <h3>Enter Surname</h3>
                <input
                    type="text"
                    placeholder="Surname"
                    value={newUser.surname}
                    onChange={e => setNewUser({ ...newUser, surname: e.target.value })
                    }
                />
                <h3>Role</h3>
                <input
                    type="text"
                    placeholder="Role"
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                />
                <div id="privacy">
                    <input
                        type="checkbox"
                        id="privacyPolicy"
                        checked={privacyAccepted}
                        onChange={e => setPrivacyAccepted(e.target.checked)} />
                    <label htmlFor="privacyPolicy" className="privacyPolicy">
                        You agree to our friendly{' '}
                        <a href="https://www.w3schools.com" target="_blank">
                            privacy policy.
                        </a>
                    </label>
                </div>
                <button id="submitbut" onClick={handleAddUser}>
                    SUBMIT
                </button>
            </div>

            <div id="usersList">
                {users.map((user) => (
                    <div key={user.index} className="user-item">
                        <div>
                            <span>
                                {user.name} {user.surname}
                            </span>
                            <small>{user.role}</small>
                        </div>
                        <button onClick={() => handleDeleteUser(user.index)}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;

import React, { useEffect, useState } from 'react';
import UserResults from '../components/users/UserResults';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const url = process.env.REACT_APP_GITHUB_URL;
        const token = process.env.REACT_APP_GITHUB_TOKEN;

        try {
            const res = await fetch(`${url}/users`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <UserResults
                users={users}
                loading={loading}
            />
        </>
    );
};

export default Home;
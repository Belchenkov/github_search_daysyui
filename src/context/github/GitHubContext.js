import { createContext, useState } from 'react';

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GitHubProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${GITHUB_URL}/users`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            });

            const data = await res.json();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return <GitHubContext.Provider value={{
        users,
        loading,
        fetchUsers,
    }}>
        {children}
    </GitHubContext.Provider>
};

export default GitHubContext;
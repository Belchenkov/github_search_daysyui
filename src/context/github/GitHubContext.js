import { createContext, useReducer } from 'react';

import gitHubReducer from './GitHubReducer';

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GitHubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(gitHubReducer, initialState);

    const fetchUsers = async () => {
        try {
            dispatch({
                type: 'SET_LOADING',
                payload: true,
            })

            const res = await fetch(`${GITHUB_URL}/users`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            });
            const data = await res.json();

            dispatch({
                type: 'GET_USERS',
                payload: data,
            })
        } catch (err) {
            console.error(err);
        } finally {
            dispatch({
                type: 'SET_LOADING',
                payload: false,
            })
        }
    }

    return <GitHubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
    }}>
        {children}
    </GitHubContext.Provider>
};

export default GitHubContext;
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

    const searchUsers = async text => {
        try {
            dispatch({
                type: 'SET_LOADING',
                payload: true,
            })

            const params = new URLSearchParams({
                q: text,
            });

            const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            });
            const { items } = await res.json();

            dispatch({
                type: 'GET_USERS',
                payload: items,
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

    const clearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' });
    };

    return <GitHubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
    }}>
        {children}
    </GitHubContext.Provider>
};

export default GitHubContext;
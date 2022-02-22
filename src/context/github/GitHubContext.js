import { createContext, useReducer } from 'react';

import gitHubReducer from './GitHubReducer';

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GitHubProvider = ({ children }) => {
    const initialState = {
        users: [],
        repos: [],
        user: {},
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

    const getUser = async login => {
        try {
            dispatch({
                type: 'SET_LOADING',
                payload: true,
            })

            const res = await fetch(`${GITHUB_URL}/users/${login}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            });

            if (res.status === 404) {
                window.location = '/notfound';
            } else {
                const data = await res.json();

                dispatch({
                    type: 'GET_USER',
                    payload: data,
                })
            }
        } catch (err) {
            console.error(err);
        } finally {
            dispatch({
                type: 'SET_LOADING',
                payload: false,
            })
        }
    }

    const getUserRepos = async (login) => {
        try {
            dispatch({
                type: 'SET_LOADING',
                payload: true,
            });

            const params = new URLSearchParams({
                sort: 'created',
                per_page: 10,
            });

            const response = await fetch(
                `${GITHUB_URL}/users/${login}/repos?${params}`,
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                    },
                }
            )

            const data = await response.json()

            dispatch({
                type: 'GET_REPOS',
                payload: data,
            })
        } catch (err) {
            console.error(err);
        }

    }

    const clearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' });
    };

    return <GitHubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        getUserRepos,
        getUser,
        clearUsers,
    }}>
        {children}
    </GitHubContext.Provider>
};

export default GitHubContext;
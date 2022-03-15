import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const gitHub = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
    },
});

export const searchUsers = async text => {
    try {
        const params = new URLSearchParams({
            q: text,
        });

        const res = await gitHub.get(`/search/users?${params}`);

        return res.data.items;
    } catch (err) {
        console.error(err);
    }
};

export const getUserAndRepos = async login => {
    try {
        const [user, repos] = await Promise.all([
            gitHub.get(`/users/${login}`),
            gitHub.get(`/users/${login}/repos`),
        ]);

        return {
            user: user.data,
            repos: repos.data,
        };
    } catch (err) {
        console.error(err);
    }
};

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const searchUsers = async text => {
    try {
        const params = new URLSearchParams({
            q: text,
        });

        const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });
        const { items } = await res.json();

        return items;
    } catch (err) {
        console.error(err);
    }
};

export const getUser = async login => {
    try {
        const res = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        if (res.status === 404) {
            window.location = '/notfound';
        } else {
            return await res.json();
        }
    } catch (err) {
        console.error(err);
    }
};

export const getUserRepos = async (login) => {
    try {
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

        return await response.json();
    } catch (err) {
        console.error(err);
    }
}



import React, { useState, useContext } from 'react';

import GitHubContext from '../../context/github/GitHubContext';

const UserSearch = () => {
    const [text, setText] = useState('');

    const { users } = useContext(GitHubContext);

    const handleChange = e => {
        setText(e.target.value);
    };

    const onSearch = e => {
        e.preventDefault();

        if (text === '') {
            alert('Please enter something');
            return;
        }

        setText('');
    };

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={onSearch}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder='Search'
                                value={text}
                                onChange={handleChange}
                            />
                            <button
                                type='submit'
                                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                            >
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            { users.length > 0 && (
                <div>
                    <button className="btn btn-accent btn-lg">
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserSearch;
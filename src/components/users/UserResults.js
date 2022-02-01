import React from 'react';

const UserResults = ({ users }) => {
    return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {
                users.length > 0 && users.map((user) => (
                   <h3>{user.login}</h3>
                ))
            }
        </div>
    );
};

export default UserResults;
import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError()
    const handleLogOut = () => {
        logOut()
            .then(res => { })
            .catch(error => { })
    }
    return (
        <div>
            <p className='text-red-400'>{error.textStatus || error.message}</p>
            <p className='text-xl'>Please <button className="btn btn-outline" onClick={handleLogOut}>logout</button></p>
        </div>
    );
};

export default DisplayError;
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const AppointmentOptions = ({ appointment, setTreatment }) => {
    const { user } = useContext(AuthContext);
    const { name, slots } = appointment;
    const location = useLocation();

    return (
        <div className="card shadow-xl text-primary-content">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary font-bold text-center">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'No Slots'}</p>
                <p>{slots.length} {slots.length > 1 ? 'seats' : 'seat'} available</p>
                <div className="card-actions justify-center">
                    {user ?
                        <label
                            disabled={slots.length === 0}
                            htmlFor="booking-modal"
                            className="btn btn-primary text-white"
                            onClick={() => setTreatment(appointment)}
                        >Book Appointment</label>
                        :
                        <Link className='text-center' to='/login' state={{ from: location }} replace>
                            <button className='btn btn-primary'>Book Appointment</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptions;
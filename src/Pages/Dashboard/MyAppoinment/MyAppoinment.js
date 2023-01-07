import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const MyAppoinment = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h2 className='text-2xl mb-8'>My Appointment</h2>
            <div className="overflow-x-auto mr-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Treatmnet</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, idx) =>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <th>{booking.patientName}</th>
                                    <th>{booking.treatment}</th>
                                    <th>{booking.appointmentDate}</th>
                                    <th>{booking.slot}</th>
                                    <th>
                                        {
                                            booking.price &&
                                            <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-sm'>pay</button></Link>
                                        }
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinment;
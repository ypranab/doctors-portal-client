import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctor = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('user-token')}`
                    }
                })
                const data = await res.json()
                return data;
            }
            catch (error) {

            }
        }
    })

    const handleDelete = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch();
                toast.success(`Doctor ${doctor.name} deleted`)
            })
    }
    const closeModal = () => {
        setDeletingDoctor(null)
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2>Manage Doctors : {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors &&
                            doctors?.map((doctor, idx) => <tr key={doctor._id}>
                                <th>{idx + 1}</th>
                                <th><div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={doctor.image} alt='' />
                                    </div>
                                </div></th>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.email}</td>
                                <td><label onClick={() => setDeletingDoctor(doctor)}
                                    htmlFor="confirmation-modal" className="btn btn-xs btn-error">delete</label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor &&
                <ConfirmationModal
                    title={`Are you sure, want to delete ${deletingDoctor.name}`}
                    message={`If you delete ${deletingDoctor.name}, it cannot be undone!!`}
                    modalData={deletingDoctor}
                    successAction={handleDelete}
                    closeModal={closeModal}
                    successButtonName='delete'
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctor;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    const handleAddDoctor = (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((imageData) => {
                //console.log(imageData);
                if (imageData.success) {
                    //console.log(imageData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imageData.data.url
                    }
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('user-token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${doctor.name} added successfully`)
                        })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialties'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appoinmentSpecialty')
            const data = await res.json()
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='w-96 p-6'>
                <h2 className='text-2xl'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input
                            {...register('name', { required: "Name is required" })}
                            type='text' className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            {...register('email', { required: "Email Address is required" })}
                            type='text' className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Pick a specialty</span></label>
                        <select {...register('specialty', { required: "Email Address is required" })}
                            className="select input-bordered w-full max-w-xs">
                            {
                                specialties.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Image</span></label>
                        <input type='file' {...register('image', {
                            required: "Image is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                    </div>
                    <input className='my-4 w-full btn btn-accent' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
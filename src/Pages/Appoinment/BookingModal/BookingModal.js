import { format } from 'date-fns/esm';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name: treatmentName, slots, price } = treatment;
    const date = format(selectedDate, "PP");
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        //console.log(name, email, phone, slot, date);
        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patientName: name,
            slot,
            email,
            phone,
            price
        }
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('booking confirmed')
                    refetch();
                }
                else {
                    setTreatment(null);
                    toast.error(data.message);
                }
            })

    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg text-center font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 mt-6'>
                        <input type="text" value={date} disabled className="input input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full">
                            <option disabled selected>Pick a slot</option>
                            {
                                slots.map((slot, idx) => <option
                                    key={idx}
                                    value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Name" className="input input-bordered w-full" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email" className="input input-bordered w-full" />
                        <input name='phone' type="text" placeholder="Phone" className="input input-bordered w-full" required />
                        <br />
                        <input type="submit" className='w-full btn btn-accent' value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;
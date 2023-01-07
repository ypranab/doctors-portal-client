import React from 'react';
import chair from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';

const AppoinmentBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <header className='my-6'>
            <div style={{ backgroundImage: `url(${bg})` }} className="hero pb-24">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='' className="w-1/2 rounded-lg shadow-2xl" />
                    <div className='mr-6'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppoinmentBanner;
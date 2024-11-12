// src/components/FlightDelayForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaPlaneDeparture, FaStopwatch } from 'react-icons/fa';
import backgroundImage from '../Assets/airport.jpg'; // Add a background image for subtle effect
import axios from 'axios';
function FlightDelayForm() {
    const [formState, setFormState] = useState({
        year: '',
        month: '',
        carrier: '',
        carrier_name: '',
        airport: '',
        airport_name: '',
        arr_flights: '',
        arr_del15: '',
        carrier_ct: '',
        weather_ct: '',
        nas_ct: '',
        security_ct: '',
        late_aircraft_ct: '',
        arr_cancelled: '',
        arr_diverted: '',
        arr_delay: '',
        carrier_delay: '',
        weather_delay: '',
        nas_delay: '',
        security_delay: '',
        late_aircraft_delay: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const [delayProbability, setDelayProbability] = useState(0); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to backend
            const response = await axios.post('http://localhost:5000/predict-delay', formState);
            
            // Set the delay probability from the response
            setDelayProbability(response.data.probability);
            
            console.log('Form submitted:', formState);
            console.log('Delay Probability:', response.data.probability);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center p-5 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-75"></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl space-y-10 transform transition duration-500"
            >
                <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
                    Aircraft Flight Delay Prediction
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Information */}
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaPlane className="text-blue-600 text-xl" />
                            <h3 className="text-xl font-semibold text-blue-700">Basic Information</h3>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-1/2 px-3 mb-5">
                                <input
                                    type="number"
                                    name="year"
                                    placeholder="Year"
                                    value={formState.year}
                                    onChange={handleChange}
                                    className="input-field w-full py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-5">
                                <input
                                    type="number"
                                    name="month"
                                    placeholder="Month"
                                    value={formState.month}
                                    onChange={handleChange}
                                    className="input-field w-full py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Carrier and Airport Information */}
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaPlaneDeparture className="text-blue-600 text-xl" />
                            <h3 className="text-xl font-semibold text-blue-700">Carrier and Airport Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="carrier"
                                placeholder="Carrier Code"
                                value={formState.carrier}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                name="carrier_name"
                                placeholder="Carrier Name"
                                value={formState.carrier_name}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                name="airport"
                                placeholder="Airport Code"
                                value={formState.airport}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                name="airport_name"
                                placeholder="Airport Name"
                                value={formState.airport_name}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </section>

                    {/* Delay Details */}
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaStopwatch className="text-blue-600 text-xl" />
                            <h3 className="text-xl font-semibold text-blue-700">Delay Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="number"
                                name="arr_flights"
                                placeholder="Arriving Flights"
                                value={formState.arr_flights}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="arr_del15"
                                placeholder="Flights Delayed > 15min"
                                value={formState.arr_del15}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="carrier_ct"
                                placeholder="Carrier Delays"
                                value={formState.carrier_ct}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="weather_ct"
                                placeholder="Weather Delays"
                                value={formState.weather_ct}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="nas_ct"
                                placeholder="NAS Delays"
                                value={formState.nas_ct}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="security_ct"
                                placeholder="Security Delays"
                                value={formState.security_ct}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="late_aircraft_ct"
                                placeholder="Late Aircraft Delays"
                                value={formState.late_aircraft_ct}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="arr_cancelled"
                                placeholder="Cancelled Flights"
                                value={formState.arr_cancelled}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="arr_diverted"
                                placeholder="Diverted Flights"
                                value={formState.arr_diverted}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="arr_delay"
                                placeholder="Total Delay (mins)"
                                value={formState.arr_delay}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="carrier_delay"
                                placeholder="Carrier Delay (mins)"
                                value={formState.carrier_delay}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="weather_delay"
                                placeholder="Weather Delay (mins)"
                                value={formState.weather_delay}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="nas_delay"
                                placeholder="NAS Delay (mins)"
                                value={formState.nas_delay}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="security_delay"
                                placeholder="Security Delay (mins)"
                                value={formState.security_delay}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                name="late_aircraft_delay"
                                placeholder="Late Aircraft Delay (mins)"
                                value={formState.late_aircraft_delay}
                                onChange={handleChange}
                                className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </section>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
                    >
                        Predict Delay
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default FlightDelayForm;

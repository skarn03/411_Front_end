import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaStopwatch } from 'react-icons/fa';
import axios from 'axios';

function FlightDelayForm({ closeForm }) {
    const [formState, setFormState] = useState({
        day_of_month: '',
        day_of_week: '',
        dep_del15: '',
        dep_time: '',
        distance: '',
        arr_time: '',
    });

    const [delayProbability, setDelayProbability] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const randomizeData = () => {
        setFormState({
            day_of_month: Math.floor(Math.random() * 31) + 1,
            day_of_week: Math.floor(Math.random() * 7) + 1,
            dep_del15: Math.random() > 0.5 ? 1 : 0,
            dep_time: Math.floor(Math.random() * 2400),
            distance: Math.floor(Math.random() * 10000) + 1,
            arr_time: Math.floor(Math.random() * 2400),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/data', formState);
            console.log(response);
            setDelayProbability(response.data.prediction_probability);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
                className="relative bg-black rounded-2xl shadow-2xl p-8 w-full max-w-4xl space-y-10"
            >
                {/* Close Button */}
                <button
                    onClick={closeForm}
                    className="absolute top-4 right-4 text-yellow-500 text-2xl font-bold hover:text-yellow-600 transition duration-300"
                >
                    ×
                </button>

                <h2 className="text-3xl font-extrabold text-center text-yellow-600 mb-8">
                    Aircraft Flight Delay Prediction
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8 text-black">
                    <section className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FaPlane className="text-yellow-500 text-xl" />
                            <h3 className="text-xl font-semibold text-yellow-500">Flight Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(formState).map((key) => (
                                <input
                                    key={key}
                                    type="number"
                                    name={key}
                                    placeholder={key.replace(/_/g, ' ').toUpperCase()}
                                    value={formState[key]}
                                    onChange={handleChange}
                                    className="input-field py-2 px-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
                                />
                            ))}
                        </div>
                    </section>

                    {/* Randomize Button */}
                    <button
                        type="button"
                        onClick={randomizeData}
                        className="w-full py-3 bg-blue-500 text-black font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Randomize Data
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                    >
                        Predict Delay
                    </button>

                    {/* Display Delay Probability */}
                    {delayProbability > 0 && (
                        <div className="bg-yellow-100 flex  flex-col justify-center items-center text-black rounded-lg shadow-md p-6 mt-8">
                            <div className="flex items-center space-x-4">
                                <FaStopwatch className="text-yellow-500 text-3xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-yellow-500">
                                        Delay Probability
                                    </h3>
                                    <p className="text-sm">
                                        Given the provided flight data, the probability of this flight being delayed is:
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-start mx-10 text-center text-4xl font-bold text-yellow-600">
                                {delayProbability}
                            </div>
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
}

export default FlightDelayForm;

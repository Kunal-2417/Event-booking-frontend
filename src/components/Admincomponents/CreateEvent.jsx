import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import API_BASE_URL from '../../config';
const CreateEvent = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        image_url: '',
        manager_id: '',
        city: '',
        available_seats: '',
        price_per_seat: '',
    });
    const token = JSON.parse(localStorage.getItem("token"));

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/createevent/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                credentials: 'include',
                body: JSON.stringify({ ...formData, manager_id: parseInt(formData.manager_id), available_seats: parseInt(formData.available_seats), price_per_seat: parseFloat(formData.price_per_seat) }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Event creation failed');
            }

            alert('Event created successfully!');
            setFormData({ title: '', description: '', start_time: '', end_time: '', location: '', image_url: '', manager_id: '', city: '', available_seats: '', price_per_seat: '' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Create Event</h2>

            {error && <p className="text-red-500 text-center mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="manager_id" placeholder="Manager ID" value={formData.manager_id} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="available_seats" placeholder="Available Seats" value={formData.available_seats} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" step="0.01" name="price_per_seat" placeholder="Price per Seat" value={formData.price_per_seat} onChange={handleChange} required className="w-full p-2 border rounded" />

                <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;

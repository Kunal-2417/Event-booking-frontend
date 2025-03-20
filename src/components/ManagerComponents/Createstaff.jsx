import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import API_BASE_URL from '../../config';
const Createstaff = () => {
    // const { user } = useAuth();
    const token = JSON.parse(localStorage.getItem("token"));

    const [formData, setFormData] = useState({
        display_name: '',
        email: '',
        phone_number: '',
        location: '',
        role: 'staff', // Default role
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { role, ...userData } = formData; // Exclude role from request body
        const apiUrl = `${API_BASE_URL}/register/${role}/`; // Role passed in URL

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Auth-token': token },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Signup failed');
            }

            alert('User created successfully!');
            console.log(res)
            setFormData({ display_name: '', email: '', phone_number: '', location: '', role: 'admin' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Create User</h2>

            {error && <p className="text-red-500 text-center mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="display_name"
                    placeholder="Display Name"
                    value={formData.display_name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    {/* <option value="admin">Admin</option>
                    <option value="event_manager">Event Manager</option> */}
                    <option value="staff">Staff</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default Createstaff;

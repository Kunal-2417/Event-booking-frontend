import React, { useState } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import Preloader from '../components/Preloader';
import { useAuth } from '../context/AuthProvider';
import bgimg from '../assets/images/images/like-03.jpg';


const Payment = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"));


    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`http://localhost:8000/auth/booking/confirm_payment/${id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error('Payment confirmation failed');
            }

            console.log('✅ Payment confirmed');
            alert('Payment successful! Your booking is confirmed.');
            navigate('/');
        } catch (err) {
            console.error('❌ Payment error:', err);
            setError('Payment failed, please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Preloader />
            {/* <Popup message={"knsnvafljkndlkf"}/> */}
            <div
                className="flex justify-center items-center min-h-screen bg-gray-100"
                style={{
                    backgroundImage: `url(${bgimg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    <h2 style={{ color: '#333', marginBottom: '15px' }}>Confirm Your Booking</h2>

                    <div style={{
                        background: '#fff3cd',
                        color: '#856404',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #ffeeba',
                        marginBottom: '20px',
                        width: '80%',
                        textAlign: 'center'
                    }}>
                        <p>Just one step to confirm your booking! Click the button below and enjoy the event.</p>
                    </div>

                    {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: '0.3s'
                        }}
                        onMouseEnter={(e) => { if (!loading) e.target.style.backgroundColor = '#0056b3'; }}
                        onMouseLeave={(e) => { if (!loading) e.target.style.backgroundColor = '#007bff'; }}
                    >
                        {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Payment;

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import './Carousel.css';
import img1 from '../../assets/images/images/show-events-01.jpg';
import img2 from '../../assets/images/images/show-events-02.jpg';
import img3 from '../../assets/images/images/show-events-03.jpg';
import img4 from '../../assets/images/images/show-events-04.jpg';

function Carousel() {
    const images = [img1, img2, img3, img4, img1, img2, img3, img4, img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = images.length;
    const intervalRef = useRef(null);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        startAutoSlide();
        return () => clearInterval(intervalRef.current);  // Cleanup on unmount
    }, []);

    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);
    };

    const handleNext = () => {
        clearInterval(intervalRef.current);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        startAutoSlide();
    };

    const handlePrev = () => {
        clearInterval(intervalRef.current);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % 3);
        startAutoSlide();
    };

    useEffect(() => {
        const targetDate = new Date("2025-03-31T00:00:00").getTime();
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                clearInterval(countdownInterval);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });

        }, 1000);

        return () => clearInterval(countdownInterval); // Cleanup countdown timer only
    }, []);

    return (
        <div>
            <div className="main-banner">
                <div className="counter-content">
                    <ul>
                        <li>Days<span>{timeLeft.days}</span></li>
                        <li>Hours<span>{timeLeft.hours}</span></li>
                        <li>Minutes<span>{timeLeft.minutes}</span></li>
                        <li>Seconds<span>{timeLeft.seconds}</span></li>
                    </ul>
                    <span style={{ color: "white" }}>Next Show</span>
                </div>
                <div className="main-top">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="main-content" style={{marginLeft: 'auto'}}>
                                {/* <div className="next-show"> */}
                                {/* </div> */}
                                <h6>Opening on Thursday, March 31st</h6>
                                <h2>The Sunny Hill Festival 2025</h2>
                                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <div className="main-white-button">
                                        <button style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff',
                                            color: '#2a2a2a',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            padding: '12px 25px',
                                            borderRadius: '5px',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease-in-out',
                                            cursor: 'pointer',
                                            margin: '0 auto'
                                        }}>

                                        Purchase Tickets
                                        </button>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="carousel-container">
                <button className="prev-btn" onClick={handlePrev}>❮</button>
                <div className="carousel">
                    <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {images.map((image, index) => (
                            <div className="carousel-item" key={index}>
                                <NavLink to="/">
                                    <img src={image} alt={`Event ${index + 1}`} />
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="next-btn" onClick={handleNext}>❯</button>
            </div>
        </div>
    );
}

export default Carousel;

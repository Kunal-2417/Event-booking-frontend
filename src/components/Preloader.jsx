import { useState, useEffect } from "react";

const Preloader = () => {
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, []);

    if (!showPreloader) return null; // Hide the preloader after 3 seconds

    return (
        <div id="js-preloader" className="js-preloader">
            <div className="preloader-inner">
                <span className="dot"></span>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;

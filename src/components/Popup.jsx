import React, { useState } from "react";

const Popup = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                animation: "fadeIn 0.3s ease-in-out",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    width: "90%",
                    maxWidth: "400px",
                    textAlign: "center",
                    transform: "translateY(-10px)",
                    animation: "slideDown 0.3s ease-in-out forwards",
                }}
            >
                <p style={{ marginBottom: "20px", fontSize: "18px", color: "#333", fontWeight: "500" }}>
                    {message}
                </p>
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#7f7f7f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#282727")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#282727")}
                    onClick={() => setIsVisible(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;

import React from "react";
import "./Tickets.css";
import mainmap from "../../assets/images/images/map-image.jpg";
import venue1 from "../../assets/images/images/venue-01.jpg";
import venue2 from "../../assets/images/images/venue-02.jpg";
import venue3 from "../../assets/images/images/venue-03.jpg";
import event1 from "../../assets/images/images/event-01.jpg";
import event2 from "../../assets/images/images/event-02.jpg";
import event3 from "../../assets/images/images/event-03.jpg";

function Tickets() {
    const venues = [
        {
            img: venue1,
            name: "Radio City Musical Hall",
            price: "$45",
            sitemap: "250",
            user: "500",
        },
        {
            img: venue2,
            name: "Madison Square Garden",
            price: "$55",
            sitemap: "450",
            user: "650",
        },
        {
            img: venue3,
            name: "Royce Hall",
            price: "$65",
            sitemap: "450",
            user: "750",
        },
    ];

    const events = [
        {
            img: event1,
            name: "Radio City Musical Hall",
            time: "Tuesday: 15:30-19:30",
        },
        {
            img: event2,
            name: "Madison Square Garden",
            time: "Wednesday: 08:00-14:00",
        },
        {
            img: event3,
            name: "Royce Hall Square Garden",
            time: "Thursday: 09:00-23:00",
        },
    ];

    return (
        <div>
            {/* Amazing Venues Section */}
            <div className="amazing-venues">
                <div className="container">
                    <div className="row">
                        {/* Left Side - Event Description */}
                        <div className="col left-content">
                    <h2 style={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>Three Amazing Venues for Events</h2>
                            <p>
                                Welcome to Q-Hub Events, your go-to platform for seamless event booking.
                                Explore our top venues, ideal for weddings, corporate meetings, parties, and more.
                                Our platform provides a smooth booking experience with all the details you need.
                            </p>
                            <p>
                                Plan your next big event with ease! For any inquiries or assistance, visit our
                                <a href="contact.html" target="_blank"> Contact Page</a>.
                                Let’s make your event unforgettable!
                            </p>
                        </div>

                        {/* Right Side - Visit Us + Map */}
                        <div className="col right-content">
                            <h5><i className="fa fa-map-marker"></i> Visit Us</h5>
                            <span>
                                Mind Space, <br />
                                West Malad, Mumbai 400064, <br />
                                Maharashtra, India
                            </span>

                            {/* Google Maps Embed */}
                            {/* <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Mind+Space+West+Malad+Mumbai"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div> */}

                            <div className="text-button" >
                                <a style={{ color: 'White' , backgroundColor: 'grey', padding: '10px 20px', borderRadius: '5px' }}
                                    href="https://www.google.com/maps?q=Mind+Space+West+Malad+Mumbai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Need Directions? <i className="fa fa-arrow-right"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




            {/* Map Section */}
            <div className="map-images">
                <img src={mainmap} alt="Maps of 3 Venues" />
            </div>

            {/* Venues & Tickets Section */}
            <div style={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>Our Venues & Tickets</div>

            <div className="venue-tickets">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                            </div>
                        </div>

                        {venues.map((venue, index) => (
                            <div className="col-lg-4" key={index}>
                                <div className="venue-item">
                                    <div className="thumb">
                                        <img src={venue.img} alt={venue.name} />
                                    </div>
                                    <div className="down-content">
                                        <div className="left-content">

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
                                                    cursor: 'pointer'
                                                }}>

                                                Purchase Tickets
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right-content">
                                            <h4>{venue.name}</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            <ul>
                                                <li>
                                                    <i className="fa fa-sitemap"></i> {venue.sitemap}
                                                </li>
                                                <li>
                                                    <i className="fa fa-user"></i> {venue.user}
                                                </li>
                                            </ul>
                                            <div className="price">
                                                <span>
                                                    1 ticket
                                                    <br />
                                                    from <em>{venue.price}</em>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Coming Events Section */}
            <div className="coming-events">
                <div className="left-button">
                    <div className="main-white-button">
                        <a href="shows-events.html">Discover More</a>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {events.map((event, index) => (
                            <div className="col-lg-4" key={index}>
                                <div className="event-item">
                                    <div className="thumb">
                                        <a href="event-details.html">
                                            <img src={event.img} alt={event.name} />
                                        </a>
                                    </div>
                                    <div className="down-content">
                                        <a href="event-details.html">
                                            <h4>{event.name}</h4>
                                        </a>
                                        <ul>
                                            <li>
                                                <i className="fa fa-clock-o"></i> {event.time}
                                            </li>
                                            <li>
                                                <i className="fa fa-map-marker"></i> Copacabana Beach, Rio de Janeiro
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            
        </div>
    );
}

export default Tickets;

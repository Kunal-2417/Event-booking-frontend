import React from "react";
import "./Footer.css"; // Ensure you import the CSS file

function Footer() {
    return (
        <div>
            {/* Subscribe Section */}
            <div className="subscribe">
                <div className="container">
                    <div className="row align-items-center"> {/* Flexbox aligns items properly */}
                        <div className="col-lg-4">
                            <h4>Subscribe to Our Newsletter:</h4>
                        </div>
                        <div className="col-lg-8">
                            <form id="subscribe" action="" method="get">
                                <div className="row">
                                    <div className="col-lg-9">
                                        <fieldset>
                                            <input
                                                name="email"
                                                type="email"
                                                id="email"
                                                pattern="[^ @]*@[^ @]*"
                                                placeholder="Your Email Address"
                                                required
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-3">
                                        <fieldset>
                                            <button type="submit" id="form-submit" className="main-dark-button">
                                                Submit
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="address">
                                <h4>Sunny Hill Festival Address</h4>
                                <span>OAT IIIT Jabalpur, <br />Jabalpur,MP <br />India</span>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center"> {/* Center aligns */}
                            <div className="links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><a href="#">Info</a></li>
                                    <li><a href="#">Venues</a></li>
                                    <li><a href="#">Guides</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 text-end"> {/* Right aligns */}
                            <div className="hours">
                                <h4>Open Hours</h4>
                                <ul>
                                    <li>Mon to Fri: 10:00 AM to 8:00 PM</li>
                                    <li>Sat - Sun: 11:00 AM to 4:00 PM</li>
                                    <li>Holidays: Closed</li>
                                </ul>
                            </div>
                        </div>
                    </div>



                </div>
            </footer>
        </div>
    );
}

export default Footer;

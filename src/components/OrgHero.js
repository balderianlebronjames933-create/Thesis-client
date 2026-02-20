import React from 'react';
import HeroBg from '../assets/urst-bg.JPG';

const OrgHero = () => {
    return (
        <div className="position-relative overflow-hidden bg-dark text-white py-5 mb-5" 
        style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${HeroBg}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">
                            UNITE: University of Rizal System - Taytay Student Organization
                        </h1>
                        <p className="lead fs-4 mb-4 text-light-50 animate__animated animate__fadeInUp animate__delay-1s">
                            Connecting Students with Campus Organizations
                        </p>
                        {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <a href="#directory" className="btn btn-primary btn-lg px-4 gap-3 rounded-pill shadow">
                                Explore Clubs
                            </a>
                            <button className="btn btn-outline-light btn-lg px-4 rounded-pill">
                                Learn More
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgHero;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Home.css';
import { Link } from 'react-router-dom';

// ตรวจสอบให้แน่ใจว่าคุณได้ import รูปภาพทั้งหมดที่ใช้ใน Carousel และ Home
import viewImage from './view.png';
import oneImage from './one.png';
import twoImage from './two.png';
import threeImage from './three.png';
const Carousel = () => {
  return (
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={viewImage}
            className="d-block w-100"
            alt="First slide"
            style={{ objectFit: 'cover', maxHeight: '600px' }}
          />
          <div className="carousel-caption text-start">
            <h1>Modern Homes for a New Generation</h1>
            <p>Stylish, Sustainable, and Smartly Designed.</p>
          <Link
        className="btn btn-primary"
        to="/design"
        role="button"
        style={{ backgroundColor: '#6b4423', color: '#ffffff', border: 'none' }}
      >
        Explore Designs
      </Link>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src={viewImage}
            className="d-block w-100"
            alt="Second slide"
            style={{ objectFit: 'cover', maxHeight: '600px' }}
          />
          <div className="carousel-caption text-start">
            <h1>Built to Last</h1>
            <p>Our projects stand the test of time.</p>
            <Link className="btn btn-primary" to="/projects" role="button">
              View Projects
            </Link>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src={viewImage}
            className="d-block w-100"
            alt="Third slide"
            style={{ objectFit: 'cover', maxHeight: '600px' }}
          />
          <div className="carousel-caption text-start">
            <h1>Your Dream Home Awaits</h1>
            <p>Let us bring your vision to life.</p>
            <Link className="btn btn-primary" to="/aboutus" role="button">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <main>
      <Carousel />
      <br />
      <div className="text-center">
        <img
          src={oneImage}
          alt="Expert Team"
          style={{ width: '100%', height: 'auto', margin: '0' }}
        />
      </div>
      <div className="text-center">
        <img
          src={twoImage}
          alt="Expert Team"
          style={{ width: '100%', height: 'auto', margin: '0' }}
        />
      </div>
      <div className="text-center">
        <img
          src={threeImage}
          alt="Expert Team"
          style={{ width: '100%', height: 'auto', margin: '0' }}
        />
      </div>
    </main>
  );
};

export default Home;

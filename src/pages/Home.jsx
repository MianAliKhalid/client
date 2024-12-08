import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import Swiper from "swiper";
import 'swiper/css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Fetch all services from the database
  const fetchallServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/services`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fetch testimonials from the database
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}testimonial/get/testimonials`);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchallServices();
    fetchTestimonials();
  }, []);

  // Initialize Swiper after component mounts
  useEffect(() => {
    if (testimonials.length > 0) {
      new Swiper(".testimonial-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: true,
        pagination: { clickable: true },
        loop: true,
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }
  }, [testimonials]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-pink-600 to-violet-700 shadow-lg">
        <img
          src="https://source.unsplash.com/random/1600x600?business,teamwork"
          alt="Business collaboration"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10">
          <h1 className="mt-20 text-5xl font-bold mb-4 text-white">
            Empowering Your Business
          </h1>
          <p className="text-lg text-gray-100 mb-8 max-w-xl mx-auto">
            Discover innovative solutions crafted for success. Let us help you
            reach new heights with our professional services and expert
            guidance.
          </p>
          <Link
            to="/services"
            className="bg-white text-pink-600 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Our Key Services
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className="relative p-8 bg-white/10 rounded-2xl shadow-lg text-center transition transform hover:-translate-y-2 duration-300"
              >
                <img
                  src={service.image || "https://source.unsplash.com/random/400x400?solution,technology"}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                {/* <div className="mb-4">
                  <FaCheckCircle className="text-4xl text-pink-400" />
                </div> */}
                <h3 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                  {service.name}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center">Loading services...</p>
          )}
        </div>
      </section>

      
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          What Clients Say
        </h2>
        <div className="testimonial-slider swiper-container max-w-6xl mx-auto">
          <div className="swiper-wrapper">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div key={index} className="swiper-slide">
                  <div className="relative p-8 bg-white/10 rounded-2xl shadow-lg text-center transition transform hover:scale-105 duration-300">
                    <img
                      src={testimonial.image || "https://source.unsplash.com/random/400x400?person,smile"}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    {/* <div className="mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={`text-2xl flex flex- ${idx < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div> */}
                    <p className="text-gray-300 italic mb-4">
                      "{testimonial.testimony}"
                    </p>
                    <span className="text-sm text-gray-400">
                      - {testimonial.name}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-center">Loading testimonials...</p>
            )}
          </div>
          {/* Slider Navigation */}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;  
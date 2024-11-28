import React from "react";
import { useAuth } from "../store/Auth";

const About = () => {
    const { user } = useAuth();
    console.log("User:", user);
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 px-6 ">
      {/* Introduction Section */}
      <section className="text-center mb-16">
        <h2 className="mt-20 text-4xl font-extrabold text-white-900 mb-4">About Us</h2>
        <p className="text-lg text-white-600">
          Welcome {user.username} to our platform! We are a passionate team dedicated to providing the best experiences for our users.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-indigo-100 py-12 rounded-lg mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700">
            Our mission is to provide exceptional services to our community and make a lasting impact by offering personalized solutions that meet the needs of our users. We are committed to constant improvement and excellence.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center mb-16">
        <h3 className="text-3xl font-bold text-white-900 mb-6">Meet Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h4 className="text-xl font-semibold text-gray-800">John Doe</h4>
            <p className="text-gray-600">Founder & CEO</p>
            <p className="mt-2 text-gray-600">
              John is the visionary behind our platform, with a strong background in leadership and a passion for innovation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h4 className="text-xl font-semibold text-gray-800">Jane Smith</h4>
            <p className="text-gray-600">Co-Founder & CTO</p>
            <p className="mt-2 text-gray-600">
              Jane oversees the technical development of the platform, ensuring high standards of performance and security.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h4 className="text-xl font-semibold text-gray-800">Alex Taylor</h4>
            <p className="text-gray-600">Marketing Lead</p>
            <p className="mt-2 text-gray-600">
              Alex is the driving force behind our marketing strategies, working to connect with our audience and spread our message.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h3>
          <p className="text-lg text-gray-600">
            We believe in trust, integrity, and accountability. Our core values guide every decision and action, ensuring that we are always working to create a positive impact on our community.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h3 className="text-3xl font-bold text-white-900 mb-6">Get in Touch</h3>
        <p className="text-lg text-gray-600 mb-4">
          We would love to hear from you! Whether you have questions or suggestions, feel free to reach out to us.
        </p>
        <a
          href="/contact"
          className="inline-block bg-indigo-600 text-white font-semibold text-lg py-3 px-8 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;

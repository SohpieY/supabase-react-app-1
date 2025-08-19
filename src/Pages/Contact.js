import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Future: Add form submission logic
        console.log('Form submitted:', formData);
    };

    return (
        <div className="contact-page" id="contact-main-container">

            <h2 className="contact-title" id="contact-main-title">
                Want to chat? Feel free to reach out to me about anything! ˚₊· ͟͟͞͞➳❥
            </h2>

            <div className="letter-background" >
                <div className="letter-img" id="contact-images-container">
                    <img
                        src="/images/contact/letter_contactme.png"
                        alt="Letter"
                        className="contact-letter"
                        id="contact-letter-image"
                    />
                </div>
            </div>

            <div className={"postcard-big-container"}>
                <div className="postcard-img" id="contact-images-container">
                    <img
                        src="/images/contact/card_contactme.png"
                        alt="Postcard"
                        className="contact-postcard"
                        id="contact-postcard-image"
                    />
                </div>

                <div className="contact-form-container" >
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="postcard-form" >
                            <div className="postcard-left">

                                <textarea
                                    id="contact-message-textarea"
                                    className="message-textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Write your message here..."
                                    required
                                />
                            </div>
                            <div className="postcard-right">
                                <div className="form-group">
                                    <label
                                        htmlFor="name"
                                        className="name-label"
                                        id="contact-name-label"
                                    >
                                        From:
                                    </label>
                                    <input
                                        type="text"
                                        id="contact-name-input"
                                        className="name-input"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group" id="email-form-group">
                                    <input
                                        type="email"
                                        id="contact-email-input"
                                        className="email-input"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div className="postcard-to" id="postcard-to-section">
                                    <p className="to-text" id="contact-to-text">To: Tina Wan</p>
                                </div>
                                <button
                                    type="submit"
                                    className="send-button"
                                    id="contact-send-button"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>



            <div className="contact-footer" id="contact-footer-section">
                <h2 className="footer-title" id="contact-footer-title">
                    feel free to reach out to me! i'm here to respond :)
                </h2>
                <div className="contact-links" id="contact-links-container">
                    <a
                        href="mailto:tw@gmail.com"
                        className="contact-link email-link"
                        id="contact-email-link"
                    >
                        tw@gmail.com
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link instagram-link"
                        id="contact-instagram-link"
                    >
                        instagram
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link linkedin-link"
                        id="contact-linkedin-link"
                    >
                        linkedin
                    </a>
                </div>
            </div>
        </div>
    );
}
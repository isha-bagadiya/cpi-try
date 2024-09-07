'use client'
import { useState } from 'react';
interface ContactModalProps {
    closeModal: () => void;
}
const ContactModal: React.FC<ContactModalProps> = ({ closeModal }) => {

    return (
        <>
            <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
                <div className="popup text-white rounded-xl shadow-lg w-full max-w-xl p-8 relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-xl"
                        onClick={closeModal}
                    >
                        &times;
                    </button>

                    {/* Contact Form */}
                    <h2 className="text-2xl mb-4 font-mori font-semibold tracking-tighter">Contact us</h2>
                    <form className='flex flex-col font-mori'>
                        <div className="flex space-x-2 mb-2">
                            <div className="w-full md:w-1/2 font-mori">
                                <label htmlFor="name" className="p-2 font-mori font-normal text-[12px] tracking-tighter">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full font-semibold p-2 mt-2 bg-transparent rounded-lg outline-none border-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label htmlFor="email" className="p-2 font-mori font-normal text-[12px] tracking-tighter">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full font-semibold p-2 mt-2 bg-transparent rounded-lg outline-none border-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="p-2 font-mori font-normal text-[12px] tracking-tighter">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full font-normal text-[1rem] p-2 mt-2 bg-transparent rounded-lg outline-none border-none focus:ring-1 focus:ring-orange-500"
                                placeholder="Write your message here"
                            />
                        </div>

                        <button
                            type="submit"
                            aria-label="contact-us"
                            className="button-50 max-w-max self-center px-10 py-1 font-redhat font-semibold"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactModal;

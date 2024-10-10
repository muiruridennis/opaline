import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-indigo-600 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Opaline */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">About Opaline</h4>
                        <p className="text-sm">
                            Opaline is your go-to platform for booking services with top professionals in beauty, wellness, and more.
                            We make it easy to find and book appointments with trusted providers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul>
                            <li className="mb-2"><a href="#" className="text-sm hover:text-gray-300">Home</a></li>
                            <li className="mb-2"><a href="#" className="text-sm hover:text-gray-300">Services</a></li>
                            <li className="mb-2"><a href="#" className="text-sm hover:text-gray-300">How It Works</a></li>
                            <li className="mb-2"><a href="#" className="text-sm hover:text-gray-300">Testimonials</a></li>
                            <li><a href="#" className="text-sm hover:text-gray-300">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Newsletter</h4>
                        <p className="text-sm mb-4">Subscribe to our newsletter to get the latest updates and offers.</p>
                        <form>
                            <div className="flex items-center mb-4">
                                <input
                                    type="email"
                                    className="w-full py-2 px-4 rounded-l-md text-sm text-gray-800"
                                    placeholder="Enter your email"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-r-md hover:bg-gray-300 ml-3"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <p className="text-sm">123 Beauty Avenue, Nairobi, Kenya</p>
                        <p className="text-sm">Phone: +254 700 000 000</p>
                        <p className="text-sm">Email: info@opaline.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white text-indigo-600 rounded-full hover:bg-gray-300">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="p-2 bg-white text-indigo-600 rounded-full hover:bg-gray-300">
                                <FaTwitter />
                            </a>
                            <a href="#" className="p-2 bg-white text-indigo-600 rounded-full hover:bg-gray-300">
                                <FaInstagram />
                            </a>
                            <a href="#" className="p-2 bg-white text-indigo-600 rounded-full hover:bg-gray-300">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-indigo-400 pt-6 text-center text-sm">
                    <p>&copy; 2024 Opaline. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

"use client"
import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };
    const navLinks = [
        { name: 'Home', href: '#', active: true },
        { name: 'Services', href: '/services' },
        { name: 'Providers', href: '#' },
        { name: 'How It Works', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'FAQs', href: '#' },
        // Add other links here
    ];
    const isLoggedIn = false

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Opaline
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link href="/auth">
                        <button
                            type="button"
                            className={`font-medium rounded-lg text-sm px-4 py-2 text-center focus:outline-none focus:ring-4 ${isLoggedIn
                                ? "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                                : "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
                                }`}
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-cta"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className={`w-5 h-5 ${isOpen ? 'hidden' : 'block'}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                        <svg
                            className={`w-5 h-5 ${isOpen ? 'block' : 'hidden'}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l14 14M15 1l-14 14"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    id="navbar-cta"
                    className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navLinks.map(link => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`block py-2 px-3 md:p-0 rounded ${link.active ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                    aria-current={link.active ? 'page' : undefined}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;


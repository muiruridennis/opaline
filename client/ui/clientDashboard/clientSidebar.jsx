"use client"
import React from 'react';
import { Avatar } from '@/components/avatar';
import { HomeIcon, CalendarIcon, UserIcon, BellIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname  } from 'next/navigation';

const SideBar = () => {
  const pathname = usePathname ();
  const navItems = [
    { name: 'Overview', icon: HomeIcon, path: '/clientdashboard' },
    { name: 'Bookings', icon: CalendarIcon, path: '/clientdashboard/bookings' },
    { name: 'Profile Settings', icon: UserIcon, path: '/clientdashboard/profile-settings' },
    { name: 'Notifications', icon: BellIcon, path: '/clientdashboard/notifications' },
  ];
  

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('User logged out');
  };
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-6 flex items-center space-x-4">
        <Avatar
          src='/assets/Angle.jpg'
          alt='Profile Photo'
          size='medium'
          placeholder='Profile Photo'
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">Stephanie Grace</h2>
          <p className="text-sm text-gray-600">stephanie@opaline.com</p>
        </div>
      </div>
      <nav className="mt-6">
      {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`block py-2.5 px-4 rounded transition duration-200 ${
                isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-300 hover:text-black'
              }`}
            >
              <item.icon className="w-5 h-5 inline-block mr-2" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="flex items-center py-2.5 px-4 w-full text-left rounded transition duration-200"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 inline-block mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;

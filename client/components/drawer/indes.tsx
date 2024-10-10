import { useState } from 'react';
import {  XMarkIcon} from '@heroicons/react/24/solid'; 

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to open the drawer */}
      <div className="text-center">
        <button
          onClick={toggleDrawer}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Show navigation
        </button>
      </div>

      {/* Drawer component */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white w-64 dark:bg-gray-800`}
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          aria-controls="drawer-navigation"
        >
          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          
        </div>
      </div>
    </div>
  );
};

export default Drawer;

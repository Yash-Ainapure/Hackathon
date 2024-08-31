import React from 'react';

const NotificationModal = ({ onClose, onSeeMore }) => {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Notifications</h2>
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
            <button
               onClick={onSeeMore}
               className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
               See More
            </button>
            <button
               onClick={onClose}
               className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600 focus:outline-none"
            >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M6 18L18 6M6 6l12 12"
                  />
               </svg>
            </button>
         </div>
      </div>
   );
};

export default NotificationModal;

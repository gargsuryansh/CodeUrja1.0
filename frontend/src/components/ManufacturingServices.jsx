import React from 'react';
import { Link } from 'react-router-dom'; 
 
function ManufacturingServices() {
  const services = [
    { title: 'Live Disaster Map', description: 'Track real-time disasters with location insights', icon: 'production', link: '/disastermap' },
    { title: 'Volunteer Coordination', description: 'Register & get assigned for rescue tasks', icon: 'custom', link: '/volunteer' },
    { title: 'Volunteer Management System', description: 'Organize and oversee rescue operations', icon: 'quality',},
    { title: 'Emergency Alerts', description: 'Receive & send emergency alerts instantly', icon: 'technology' , link: '/smsalert'},
    { title: 'Resource Management', description: 'Track relief camps & resource distribution', icon: 'packaging' , link: '/relief'},
    { title: 'Live Location Tracking', description: 'Stay updated with real-time locations', icon: 'consulting',link: '/livelocation' },
  ];

  const Icon = ({ icon }) => {
    const iconClasses = "h-10 w-10 text-white"; // Standard icon styles
    switch (icon) {
      case 'production': return <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
      case 'custom': return <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M16 12H4" /></svg>;
      case 'quality': return <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
      case 'technology': return <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L12 20.25l2.25-3.25M15 9.75l-2.25 3.25L12 6.75l-2.25 6.25L9 9.75" /></svg>;
      case 'packaging': return <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
      case 'consulting': return <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h-2m2 0v8m-2-8l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default: return null;
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-600  via-blue-800  to-blue-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Our Services</h2>
        <p className="text-lg text-gray-300 mb-10">Empowering communities with real-time disaster response solutions.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg hover:bg-opacity-20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Icon icon={service.icon} />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {service.link ? (
                  <Link to={service.link} className="text-white hover:underline">
                    {service.title}
                  </Link>
                ) : (
                  service.title
                )}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ManufacturingServices;

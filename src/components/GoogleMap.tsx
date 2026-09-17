import React from 'react';

interface GoogleMapProps {
  height?: string;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ 
  height = '100%',
  className = '' 
}) => {
  const addressQuery = encodeURIComponent("Lisa's Natural Path, 1779 N Main St Ext, Butler, PA 16001");
  const mapSrc = `https://maps.google.com/maps?q=${addressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div 
      className={`relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100 ${className}`}
      style={{ height }}
    >
      <iframe
        title="Lisa's Natural Path Store Location Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
      ></iframe>
    </div>
  );
};

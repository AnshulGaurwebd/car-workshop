 "use client";

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Icons() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    
    const handleLoad = () => {
      setIsLoaded(true);
      
      
      gsap.fromTo(".social-sidebar-icon", 
        { 
          opacity: 0, 
          y: 50 
        }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 6, 
          stagger: 0.2, 
          ease: "power4.out",
          delay: 0.7 
        }
      );
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-4 icon">
      <a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-sidebar-icon hover:scale-110 transition-transform duration-300"
      >
        <img 
          src="/whats.jpg" 
          alt="whatsapp" 
          className="w-12 h-12 rounded-full object-cover shadow-md" 
        />
      </a>
      <a 
        href="https://instagram.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-sidebar-icon hover:scale-110 transition-transform duration-300"
      >
        <img 
          src="/insta.jpg" 
          alt="instagram" 
          className="w-12 h-12 rounded-full object-cover shadow-md" 
        />
      </a>
       <a 
        href="https://instagram.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-sidebar-icon hover:scale-110 transition-transform duration-300"
      >
        <img 
          src="/gmail.jpg" 
          alt="instagram" 
          className="w-12 h-12 rounded-full object-cover shadow-md" 
        />
      </a>
       <a 
        href="https://instagram.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-sidebar-icon hover:scale-110 transition-transform duration-300"
      >
        <img 
          src="/you.webp" 
          alt="instagram" 
          className="w-12 h-12 rounded-full object-cover shadow-md" 
        />
      </a>
    </div>
  );
}
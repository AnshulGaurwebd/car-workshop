"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './navbar.css';

const Navbar: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { contextSafe } = useGSAP(() => {
    // Create the master timeline
    const mainTl = gsap.timeline({
      paused: true,
      onComplete: () => setIsAnimating(false),
      onReverseComplete: () => setIsAnimating(false),
    });

    mainTl
      .to(".nav-bg-layer", {
        scaleY: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.inOut",
      })
      .to(".nav-items-wrapper", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.75,
        ease: "power3.inOut",
      }, "-=0.6")
      .to(".nav-item-link", {
        y: "0%",
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
      }, "-=0.4");

    tl.current = mainTl;
  }, { scope: container });

  const toggleMenu = contextSafe(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (!isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
    setIsOpen(prev => !prev);
  });

  const handleLinkClick = contextSafe(() => {
    if (isOpen && !isAnimating) {
      setIsAnimating(true);
      tl.current?.reverse();
      setIsOpen(false);
    }
  });
  const primaryLinks = [
  { label: 'Add-Ons', href: '/addons' },
  { label: 'Process', href: '/process' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
const socialLinks = [
  { label: 'YouTube', href: 'https://youtube.com/c/yourchannel' },
  { label: 'Instagram', href: 'https://instagram.com/yourprofile' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourname' },
  { label: 'X', href: 'https://twitter.com/in/yourname' },
];

  return (
    <div ref={container}>
      <nav className="navigation-bar">
        <div className="logo-wrapper">
          <Link href="/" onClick={handleLinkClick}>
            <Image src="/logos.jpg" alt="Logo" width={80} height={80} className="logo-img" priority  />
          </Link>
        </div>
        <div className='dds'> <h1>DDS</h1> </div>

        <button className="nav-toggler" onClick={toggleMenu} aria-label="Toggle Menu">
          <span style={{ transform: isOpen ? 'translateY(7px) rotate(-45deg) scaleX(0.75)' : '' }}></span>
          <span style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ transform: isOpen ? '-translateY(7px) rotate(45deg) scaleX(0.75)' : '' }}></span>
        </button>
      </nav>

      <div className={`nav-content-overlay ${isOpen ? 'is-open' : ''}`}>
        <div className="nav-bg-layer"></div>
        <div className="nav-bg-layer"></div>
        <div className="nav-bg-layer"></div>
        <div className="nav-bg-layer"></div>

        <div className="nav-items-wrapper">
         <div className="nav-col-left">
           {socialLinks.map((social) => (
            <div key={social.label} className="link-clip">
            <a 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-item-link social-link"
              onClick={handleLinkClick}
             >
             {social.label}
            </a>
            </div>
           ))}
         </div>

          <div className="nav-col-right">
  {primaryLinks.map((link) => (
    <div key={link.label} className="link-clip">
      <Link href={link.href} className="nav-item-link primary-link" onClick={handleLinkClick}>
        {link.label}
      </Link>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
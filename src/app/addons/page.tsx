"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './addons.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Premium from '../premium/premium';

const AddOns = () => {
    const container = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showIndicator, setShowIndicator] = useState(true);

    const ScrollIndicator = ({ visible }: { visible: boolean }) => (
  <div 
    className={`scroll-indicator ${!visible ? 'fade-out' : ''}`}
    style={{
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'opacity 0.5s ease, visibility 0.5s',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none'
    }}
  >
    <p style={{ color: 'white', fontSize: '12px', marginBottom: '8px', letterSpacing: '2px' }}>
      CLICK CARDS
    </p>
    <div className="mouse-icon">
       <div className="wheel"></div>
    </div>
  </div>
);
gsap.registerPlugin(ScrollTrigger);

    const recalculateZ = () => {
        
        const currentCards = gsap.utils.toArray<HTMLElement>(".card");
        currentCards.forEach((card, i) => {
            gsap.to(card, {
                
                yPercent: -30 + (8 * i), 
                z: -100 * i, 
                duration: 0.5,
                ease: "none",
                overwrite: "auto"
            });
        });
    };
  
    const initializeCards = () => {
        const cards = gsap.utils.toArray<HTMLElement>(".card");
        gsap.to(cards, {
    yPercent: (i) => -15 + 8 * i,
    z: (i) => -100 * i,
    force3D: true,
    duration: 1,
    ease: "power4.inOut",
});
    };

   useGSAP(() => {
    const headers = container.current?.querySelectorAll(".slider-title");
    headers?.forEach((header) => {
        const text = header.textContent || "";
        header.textContent = ""; 
        text.split("").forEach((char) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char; 
            header.appendChild(span);
        });
        });

       
        initializeCards();
        gsap.set(container.current, { visibility: "visible" });
        
        gsap.set(".slider-title span", { y: -200 });
        const allCards = container.current?.querySelectorAll(".card");
    if (allCards && allCards.length > 0) {
        const topCard = allCards[allCards.length - 1];
        
        gsap.killTweensOf(topCard.querySelectorAll("span"));
        gsap.set(topCard.querySelectorAll("span"), { y: 0 });
    }
    ScrollTrigger.create({
            trigger: container.current,
            start: "top top",
            onLeave: () => setShowIndicator(false),
            onEnterBack: () => setShowIndicator(true),
        });
}, { scope: container });

const [lastClickTime, setLastClickTime] = useState(0);
   
    const handleNext = () => {
       const now = Date.now();
    if (isAnimating || now - lastClickTime < 500) return; 
    setLastClickTime(now);
        setIsAnimating(true);

        const slider = container.current?.querySelector(".slider-wrapper");
        const cards = Array.from(container.current?.querySelectorAll(".card") || []);
        if (cards.length < 2) { setIsAnimating(false); return; }
        const lastCard = cards[cards.length - 1] as HTMLElement;
        const nextCard = cards[cards.length - 2] as HTMLElement;

  
        const tl = gsap.timeline({
            onComplete: () => {
                
                setIsAnimating(false);
            }
        });

       
        
           tl.to(lastCard, {
              x: "150%", 
              duration: 0.8,
              rotation: 10,
              ease: "power2.inOut",
              
          })
          
          
          .to(nextCard.querySelectorAll("span"), {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.02
          }, "-=0.5") 
          
         
          .add(() => {
              
              if (slider) slider.prepend(lastCard);
              gsap.set(lastCard, {
        x: "150%", 
        z: -500,   
        immediateRender: true 
    });
             
              recalculateZ();
              gsap.set(lastCard.querySelectorAll("span"), { y: -200 });
          })
          
          
          .to(lastCard, {
              x: "0%", 
              z: -100 * (cards.length - 1),
              yPercent: -15 + 8 * (cards.length - 1), 
              duration: 0.6,
              ease: "power2.Out",
              onStart: () => {
               
                gsap.set(lastCard.querySelectorAll(".slider-title span"), { y: -200 });
              }
          });
    };
    const cardData = [
        { img: "/side.jpg", title: "Complete Deep Cleaning", content: "Comprehensive interior and exterior deep cleaning including all surfaces, crevices, and hard-to-reach areas." },
        { img: "/left.jpg", title: "Leather Seats Ceramic Coating", content: "Professional ceramic coating applied on all leather seats providing advanced protection against stains, spills, UV damage, and everyday wear and tear." },
        { img: "/front.jpg", title: "Alloy Wheels Ceramic Coating", content: "High-heat resistant ceramic coating on all alloy wheels for protection against brake dust and environmental contaminants." },
        { img: "/side.jpg", title: "Plastic Claddings Black Coating", content: "Specialized black coating on all exterior plastic claddings, bumper trim pieces, and unpainted surfaces to restore deep black color and provide long-lasting protection." },
        { img: "/bmw.jpg", title: "Engine Bay Detailing & Dressing", content: "Complete engine bay cleaning with professional degreasing, followed by application of premium rubber and plastic dressing to protect hoses, covers, and components while restoring a factory-fresh look." },
        { img: "/front.jpg", title: "Dashboard & Gloss Parts Coating", content: "Ceramic coating application on dashboard, center console, and all interior glossy surfaces for lasting protection." },
    ];

    return (
        <div style={{ position: 'relative' }}>
          
            <ScrollIndicator visible={showIndicator} />
        <div ref={container} className="container-slider" onClick={handleNext}>
            <div className="slider-wrapper">
                {cardData.map((card, index) => (
                    <div className="card" key={index}>
                        <img src={card.img} alt="car service" decoding="async" 
  style={{ willChange: "transform" }} />
                        <div className="copy-wrapper">
                            <h1 className="slider-title">{card.title}</h1>
                            <h4 className='content'>{card.content}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Premium></Premium>
       </div>
    );
};

export default AddOns;
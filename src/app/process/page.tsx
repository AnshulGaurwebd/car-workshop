"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './process.css';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Process = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        
        const sections = gsap.utils.toArray<HTMLElement>("section");
        sections.forEach((section, index) => {
            const image = container.current?.querySelector(`#preview-${index + 1} img`);
            const startCondition = index === 0 ? "top top" : "bottom bottom";

            if (image) {
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: section,
                        start: startCondition,
                        end: "bottom top",
                        scrub: 1,
                    },
                    scale: 1.2, 
                    ease: "none",
                });
            }
        });

      
        const animateClipPath = (
            sectionSelector: string,
            previewSelector: string,
            endClipPath: string,
            start: string = "top center",
            end: string = "bottom top"
        ) => {
            const section = container.current?.querySelector(sectionSelector);
            const preview = container.current?.querySelector(previewSelector);

            if (section && preview) {
                gsap.to(preview, {
                    scrollTrigger: {
                        trigger: section,
                        start: start,
                        end: end,
                        scrub: 0.5,
                    },
                    clipPath: endClipPath,
                    ease: "none",
                });
            }
        };

        
        animateClipPath(
            "#section-1",
            "#preview-1",
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            "top center",
            "bottom center"
        );

        const totalSections = 7;
        for (let i = 2; i <= totalSections; i++) {
            const currentSection = `#section-${i}`;
            const prevPreview = `#preview-${i - 1}`;
            const currentPreview = `#preview-${i}`;

            animateClipPath(
                currentSection,
                prevPreview,
                "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                "top bottom",
                "center center"
            );

            if (i <= totalSections) {
                animateClipPath(
                    currentSection,
                    currentPreview,
                    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    "center center",
                    "bottom top"
                );
            }
        }
       
    gsap.set(".scroll-indicator", { 
        visibility: "visible", 
        opacity: 1 
    });

    gsap.to(".mouse", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut"
    });

    ScrollTrigger.create({
        trigger: "#section-1",
        start: "top 10%",
        onEnter: () => gsap.to(".scroll-indicator", { opacity: 0, pointerEvents: "none" }),
        onLeaveBack: () => gsap.to(".scroll-indicator", { opacity: 1, pointerEvents: "auto" }),
    });

}, { scope: container });

    const processSteps = [
        "Initial Assessment & Premium Wash",
        "Deep Cleaning & Surface Prep",
        "Paint Correction & Final Prep",
        "Exterior Protection Application",
        "Interior Coating & Sanitation",
        "Product Curing & Accessory Integration",
        "Quality Inspection & Handover"
    ];

    const images = [
        "/front.jpg", "/side.jpg", "/left.jpg", "/bmw.jpg", 
        "/front.jpg", "/side.jpg", "/left.jpg"
    ];

    return (
        <div ref={container} className="process-container">
            
            <div className="intro-copy">
                <h1>OUR SIGNATURE 7-STAGE PROCESS</h1>
                {processSteps.map((step, i) => (
                    <p key={i}>{step}</p>
                ))}
            </div>
            <div className="scroll-indicator">
               <div className="mouse"><div className="wheel"></div></div>
               <p>Scroll Down</p>
             </div>
          
            <div className="headers-wrapper">
                {processSteps.map((step, i) => (
                    <section key={i} id={`section-${i + 1}`} className="process-section">
                        <h1>{step}</h1>
                    </section>
                ))}
                <div className="process-spacer">  </div>
            </div>
            

          
            <div className="section-previews">
                {images.map((src, i) => (
                    <div key={i} className="preview-img-container" id={`preview-${i + 1}`}>
                        <img src={src} alt={`Process stage ${i + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Process;
"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './home.css';
import Card from './cards/card';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("hasSeenAnimation");
    if (hasSeenAnimation) {
      setIsFirstVisit(false);
    } else {
      setIsFirstVisit(true);
    }
  }, []);

  useGSAP(() => {
    if (isFirstVisit === null) return;
    if (isFirstVisit === false) {
      
      gsap.set(".hero-imgs img", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      gsap.set(".website-content", { opacity: 1, visibility: "visible" });
      return;
    }

    if (isFirstVisit === true) {
      if (digit3Ref.current) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 10; j++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = j.toString();
            digit3Ref.current.appendChild(div);
          }
        }
        const finalDigit = document.createElement("div");
        finalDigit.className = "num";
        finalDigit.textContent = "0";
        digit3Ref.current.appendChild(finalDigit);
      }

      const animateDigit = (selector: string, duration: number, delay: number = 1) => {
        const el = document.querySelector(selector);
        if (el) {
          const numHeight = el.querySelector(".num")?.clientHeight || 100;
          const totalDistance = (el.querySelectorAll(".num").length - 1) * numHeight;
          gsap.to(el, {
            y: -totalDistance,
            duration: duration,
            delay: delay,
            ease: "power2.inOut",
          });
        }
      };

      animateDigit(".digit-3", 5);
      animateDigit(".digit-2", 6);
      animateDigit(".digit-1", 2, 5);

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasSeenAnimation", "true");
        }
      });

      tl.to(".progress-bar-container", {
        width: "100%",
        duration: 2,
        delay: 7,
        ease: "power3.inOut",
      })
      .to(".progress-bar-container", {
        opacity: 0,
        duration: 0.5,
      })
      .to(".pre-loader", {
        y: "-100%",
        duration: 1.5,
        ease: "power4.inOut",
      }, "-=0.2")
      .to(".hero-imgs img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2.3,
        ease: "power4.inOut",
        stagger: 0.2,
      }, "-=1")
      .to(".website-content", {
        opacity: 1,
        visibility: "visible",
        duration: 1,
      }, "-=0.5");
    }
  }, { scope: containerRef, dependencies: [isFirstVisit] });

  if (isFirstVisit === null) return <div className="bg-black h-screen w-full" />;

  

  return (
    <div ref={containerRef} className="bg-black relative overflow-hidden">
      {isFirstVisit && (
        <>
          <div className="pre-loader">
            <p>Loading</p>
            <div className="counter">
              <div className="digit digit-1">
                <div className="num">0</div>
                <div className="num">1</div>
              </div>
              <div className="digit digit-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, i) => (
                  <div key={i} className="num">{n}</div>
                ))}
              </div>
              <div ref={digit3Ref} className="digit digit-3"></div>
              <div className="digit">%</div>
            </div>
          </div>
          <div className="progress-bar-container"></div>
        </>
      )}

      <section className="heros-container">
        <div className="hero-imgs">
          <img src="/car.jpg" alt="car 1" />
          <img src="/bmw.jpg" alt="car 2" />
          <img src="/front.jpg" alt="car 3" />
          <img src="/left.jpg" alt="car 4" />
          <img src="/side.jpg" alt="car 5" />
          <img src="/car.jpg" alt="car 6" />
        </div>

        <div className="website-content">
          <h1 className="text-6xl font-bold">WELCOME <br /> TO <br></br> DESERT DETAILING STUDIO</h1>
        </div>
      </section>
      <Card></Card>
    </div>
  );
}
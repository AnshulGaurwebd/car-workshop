"use client"; 
import { useEffect, useRef } from "react";
import "./cards.css";
import Link from "next/link";

export default function Card() {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      },
      { threshold: 0.2 } 
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="slide-container" ref={cardRef}>
      <div className="slide">
        <h1 className="head"> OUR <span className="pre"> SERVICES  </span></h1>
        <div className="cards">
          <Link href="/home/interior">
            <div className="interior">
              <h3 className="text">INTERIOR</h3>
            </div>
          </Link>
          <Link href="/home/exterior">
            <div className="exterior">
              <h3 className="text">EXTERIOR</h3>
            </div>
          </Link>
          <Link href="/home/interior">
            <div className="interior">
              <h3 className="text">SPA</h3>
            </div>
          </Link>
          <Link href="/home/interior">
            <div className="interior">
              <h3 className="text">BODY WORK</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
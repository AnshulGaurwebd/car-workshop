"use client"; 
import { useEffect, useRef } from "react";
import './about.css'

export default function About() {
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
<div>
    <div className="about"> About Us</div>
    <div className="slide-container" ref={cardRef}>
      <div className="slide">
        <h1 className="head"> OUR <span className="pre"> WORKSHOP </span>SERVICES </h1>
        <div className="cards">
           <div className='service'>
         <div className='photo1'></div>
         <div className='detail'>
            <h1>WORKSHOP VAISHALI</h1>
            <h4>These are the details of the WORKSHOP.</h4>
         </div>
        </div>
            <div className='service'>
         <div className='detail'>
            <h1>WORKSHOP MANSAROVAR</h1>
            <h4>These are the details of the WORKSHOP.</h4>
         </div>
         <div className='photo1'></div>
        </div>
        </div>
      </div>
    </div>
</div>
  );
}
"use client"; 
import { useEffect, useRef } from "react";
import './contact.css'

export default function Contact() {
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
    <div className="about"> Contact Us</div>
    <div className="slide-container" ref={cardRef}>
      <div className="slide">
        <h1 className="head"> CONTACT <span className="pre">DETAILS</span> </h1>
        <div className="cards">
           <div className='service'>
         <div className='photo1'></div>
         <div className='detail'>
            <h1>WORKSHOP CLIENT SUPPORT</h1>
            <h4>Banbury Road
Gaydon
Warwick
CV35 0DB
United Kingdom 
<br />
<br />
Mon-Thu: 08:00 - 17:00 <br />

Fri: 08:00 - 15:30 <br />

Tel: 44 (0) 1926 644722 <br />

 <br /> <br />

US customers: (866) 278-6661

<br /><br />
Gaydon Headquarters

Switchboard: +44 (0)1926 644644</h4>
         </div>
        </div>
        </div>
      </div>
    </div>
</div>
  );
}
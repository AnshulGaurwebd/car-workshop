import './premium.css'
import { useEffect, useRef } from "react";
export default function Premium(){
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
        <div className='interiorpage'>
        <div className='service'>
         <div className='photo1'></div>
         <div className='detail'>
            <h1>PREMIUM ADD-ONS</h1>
            <h4>These are the details of the Add-ons.</h4>
         </div>
        </div>
        <div className='service'>
            <div className='detail'>
            <h1>PREMIUM ADD-ONS</h1>
            <h4>These are the details of the Add-ons.</h4>
         </div>
         <div className='photo2'></div>
        </div>
        <div className='service'>
         <div className='photo3'></div>
            <div className='detail'>
            <h1>PREMIUM ADD-ONS</h1>
            <h4>These are the details of the Add-ons.</h4>
         </div>
        </div>
        </div>
        </div>
        </div>
    )
}
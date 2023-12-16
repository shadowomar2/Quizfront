import { useState, useEffect } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
 
import AOS from "aos";
import "aos/dist/aos.css";
import soundEffect from "./click.mp3";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css";
 


const Navbar = ({  }) => {
  
  const [audio] = useState(new Audio(soundEffect));
  const [name, setName] = useState("");
  
 
 
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    const links = document.querySelectorAll(".nav-menu ul li a");
    links.forEach((link) => {
      link.addEventListener("click", playSoundEffect);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", playSoundEffect);
      });
    };
  }, []);

  const playSoundEffect = () => {
    audio.currentTime = 0;
    audio.play();
  };

  const setActiveLink = (e) => {
    const links = document.getElementsByTagName("a");
    Array.from(links).forEach((el) => el.classList.remove("active"));
    const lis = document.querySelectorAll(".nav-menu ul li");
    lis.forEach((li) => {
      li.classList.remove("active", "chosen");
    });
    const li = e.currentTarget.closest("li");
    li.classList.add("active", "chosen");
  };

  return (
    <>
   
      <header id="header" className="fixed-top ">
        <div className="container-fluid  navbur">
          <div className="navi">
              <h5 className="ld-flex mr-auto devman">
                <Link to="/" className="ld-flex mr-auto devman">
                  <div className="animate__animated  animate__rubberBand icon-font ">
                    <span className="animate__animated     ">Q U I Z</span>
                  </div>
                </Link>
              </h5>
            
               
         
            
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

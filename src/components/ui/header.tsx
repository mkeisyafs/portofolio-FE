import { useState } from "react";
import Menu from "./menu";
import { useNavigate } from "react-router-dom";

interface Data {
  Data: any;
}

const Header:React.FC<Data> = ({Data}) => {
  const [Open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <header className="w-full h-16 bg-black flex fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full px-6">
        <p onClick={() => navigate("/")} className="text-white font-semibold cursor-pointer">My Portfolio</p>

        <nav className="flex gap-6">
          <a
            href="#home"
            className="text-white hover:text-white/50 cursor-pointer"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-white/50 cursor-pointer"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-white hover:text-white/50 cursor-pointer"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white  hover:text-white/50 cursor-pointer"
          >
            Contact
          </a>
        </nav>

        <div className="rounded-full h-10 w-10 bg-[#3e3e3e] object-cover cursor-pointer">
          <button className="w-full h-full" onClick={() => setOpen(!Open)}>
          <img
            src={`http://localhost:4000${Data?.foto}` || `images/1032.png`}
            alt=""
            className="object-cover w-full h-full rounded-full"
            draggable={false}
          />
          </button>
          {Open &&
          <div className=" -right-10 ">
           <Menu open={Open} onClose={() => setOpen(false)} />
            </div>}
            
        </div>
      </div>
    </header>
  );
};

export default Header;

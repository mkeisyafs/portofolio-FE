import Header from "../components/ui/header";
import Home from "../components/dashboard/home";
import About from "../components/dashboard/about";
import Contact from "../components/dashboard/contact";
import Footer from "../components/dashboard/footer";
import Project from "../components/dashboard/project";
import { useParams } from "react-router-dom";
import { type portfolio } from "../types/type";
import { useEffect, useState } from "react";
import axios from "axios";

const dashboard = () => {
  const [Portfolio, setPortfolio] = useState<portfolio | null>(null);

  const { portfolio_id } = useParams();

  useEffect(() => {
    const fetchPortfolio = async () => {
      await axios
        .get(`http://localhost:4000/api/portfolio/find-one/${portfolio_id}`)
        .then((res) => setPortfolio(res.data.data))
        .catch(console.error);
    };
    fetchPortfolio();
  }, [portfolio_id]);
  

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden scroll-smooth ">
      <Header Data={Portfolio}/>
      <div className="w-full h-full">
        <section id="home">
          <Home Data={Portfolio} />
        </section>
        <section id="about">
          <About data={Portfolio} />
        </section>
        <section id="projects"></section>
        <Project data={Portfolio}/>
        <section id="contact">
          <Contact Data={Portfolio} />
        </section>
        <footer>
          <Footer Data={Portfolio}/>
        </footer>
      </div>
    </div>
  );
};

export default dashboard;

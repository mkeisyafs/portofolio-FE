import Header from "../components/ui/header";
import Home from "../components/dashboard/home";
import About from "../components/dashboard/about";
import Contact from "../components/dashboard/contact";
import Footer from "../components/dashboard/footer";
import Project from "../components/dashboard/project";
import { useParams } from "react-router-dom";
import { type portfolio } from "../types/type";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

const dashboard = () => {
  const [Portfolio, setPortfolio] = useState<portfolio | null>(null);

  const { portfolio_id } = useParams();
  console.log("Portfolio ID:", portfolio_id);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!portfolio_id) return;
      try {
        const res = await api.get(`/portfolio/find-one/${portfolio_id}`);
        setPortfolio(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
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

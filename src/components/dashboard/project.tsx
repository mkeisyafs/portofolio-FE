import Projects from "./projects";

interface ProjectProps {
  data: any;
}

const Project: React.FC<ProjectProps> = ({ data }) => {
  return (
    <div className="w-screen h-fit bg-black flex flex-col ">
      <div className="w-full h-full ">
        <h2 className="text-white  ml-10 font-bold text-3xl mt-22">Project</h2>
        <Projects data={data} />
      </div>
    </div>
  );
};
export default Project;

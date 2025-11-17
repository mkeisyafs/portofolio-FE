import SKills from "./skills";

interface Data  {
  data: any
}

const About: React.FC<Data> = ({data}) => {

  return (
    <div className="w-full h-screen bg-[#FAFAFA] flex flex-col">
      <h2 className="text-black mt-22 ml-10 font-bold text-3xl">
        Tentang Saya
      </h2>
      <p className="mt-5 mx-10 text-black">
        {data?.bio}
      </p>
      <div className="mt-5">
        <h2 className="text-black mt-10 ml-10 font-bold text-3xl">Skills</h2>
        <div className="ml-10 mt-5">
        <SKills data={data}/> 
        </div>
      </div>
    </div>
  );
};

export default About;

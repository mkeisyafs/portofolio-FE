import { type portfolio } from "../../types/type";


interface DataPortfolio {
  Data: portfolio | null;
}

const Home: React.FC<DataPortfolio> = ({Data}) => {

  console.log(Data);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="flex flex-row z items-center justify-center ">
        <div className="bg-[#3e3e3e] h-88 w-88 flex justify-between mx-10 items-center rounded ml">
          <img
            className="object-cover h-full w-full rounded-lg"
            src={ `http://localhost:4000${Data?.foto}` ||`/images/1032.png`}
            alt="logo"
            draggable={false}
          />
        </div>
      </div>
      <div className="mx-15">
        <h1 className="flex mb-5 font-bold">Halo, nama saya {Data?.nama}</h1>
        <p className="text-white text-lg mb-5">{Data?.bio}</p>
        <a
          href="#about"
          className="bg-white px-10 py-2.5 text-black font-bold text-center rounded-md hover:bg-white/50 outline"
        >
          Tentang saya
        </a>
      </div>
    </div>
  );
};

export default Home;

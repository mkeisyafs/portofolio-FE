import { Mail, Phone, MapPin } from "lucide-react";
import { type portfolio } from "../../types/type";
interface Data {
  Data: portfolio | null;
}

const Contact: React.FC<Data> = ({ Data }) => {
  return (
    <div className="w-full h-fit flex flex-col bg-[#FAFAFA]">
      <h2 className="text-3xl text-black font-bold mt-22 ml-10">Kontak</h2>
      <div className="flex flex-row mt-10 mx-10 justify-between">
        <div className="flex flex-col">
          {Data?.email ? (
            <>
              <p className="text-black flex font-bold  text-xl">
                <Mail className="mr-3" />
                Email
              </p>
              <p className="text-black mt-1">{Data?.email}</p>
            </>
          ) : (
            ""
          )}

          {Data?.nomor_telepon ? (
            <>
              <p className="text-black flex font-bold  text-xl mt-10">
                <Phone className="mr-3" />
                Nomor Telepon
              </p>
              <p className="text-black mt-1">{Data?.nomor_telepon}</p>
            </>
          ) : (
            ""
          )}

          {Data?.lokasi ? (
            <>
              <p className="text-black flex font-bold  text-xl mt-10">
                <MapPin className="mr-3" />
                Lokasi
              </p>
              <p className="text-black mt-1">{Data?.lokasi}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-120 h-fit bg-[#f2f2f2] border border-[#E0E0E0] shadow-md rounded-lg px-10 py-7 mb-10 space-y-2.5">
          <label className="text-black font-bold">Nama</label>
          <input type="text" className="w-full h-10 bg-white rounded-lg mt-3" />
          <label className="text-black font-bold">Email</label>
          <input type="text" className="w-full h-10 bg-white rounded-lg mt-3" />
          <label className="text-black font-bold">Pesan</label>
          <br />
          <textarea
            className="bg-white w-full rounded-lg mt-3"
            rows={5}
          ></textarea>
          <button className="bg-black w-full h-10 mt-5 rounded-lg hover:bg-black/50">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
export default Contact;

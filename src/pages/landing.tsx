import { ExternalLink, SquarePen, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { type portfolio } from "../types/type";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../components/ui/deletemodal";
import EditModal from "../components/ui/editmodal";

const Landing = () => {
  const navigate = useNavigate();
  const [Portfolio, setPortfolio] = useState<portfolio[]>([]);
  const [OpenDelete, setOpenDelete] = useState(false);
  const [DeleteId, setDeleteId] = useState<any>(null);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [EditId, setEditId] = useState<any>(null);

  useEffect(() => {
    const fetchportfolio = async () => {
      await axios
        .get("http://localhost:4000/api/portfolio/find-all")
        .then((res) => setPortfolio(res.data.data))
        .catch(console.error);
    };  
    fetchportfolio();
  }, []);

  const handleDelete = async (id: any) => {
    await axios
      .delete(`http://localhost:4000/api/portfolio/delete/${id}`)
      .then(() => {
        setPortfolio(Portfolio.filter((p) => p.portfolio_id !== id));
        setOpenDelete(false);
      })
      .catch(console.error);
  };

  const handleEdit = async (id: any) => {
    setPortfolio(Portfolio.map((p) => (p.portfolio_id === id ? p : p)));
    setOpenEdit(false);
    navigate(`/p`, { state: { portfolio_id: id } });
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col overflow-x-hidden">

      <div className="flex justify-between">
        <h2 className="text-white font-bold mt-12  ml-10 w-full text-3xl">
          Portofolioku
        </h2>
        <button
          onClick={() => navigate("/p")}
          className="bg-[#FAFAFA] w-50 h-10 mr-10 mt-12 font-bold rounded-lg text-black hover:bg-white/75"
        >
          Buat Portfolio
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-5 p-4 w-full h-full">
        {Portfolio.map((p) => (
          <div
            key={p.portfolio_id}
            className="w-full max-h-56  bg-[#FAFAFA] flex mt-8 rounded-lg hover:bg-white/75 transition duration-100"
          >
            <div className="flex flex-col justify-between h-full p-5 w-full">
              <div>
                <h2 className="text-black font-black flex justify-between">
                  {p.nama}{" "}
                  <ExternalLink
                    className="ml-2 cursor-pointer "
                    onClick={() => navigate(`/portfolio/${p.portfolio_id}`)}
                  />
                </h2>

                <p className="text-black/50 text mt-3 line-clamp-4">{p.bio}</p>
              </div>
              <div className="flex h-full w-full justify-end items-end gap-3">
                <SquarePen className="text-black cursor-pointer" onClick={() => {
                  setOpenEdit(true);
                  setEditId(p.portfolio_id);
                }}/>
                <Trash2
                  className="text-[#FF0000] cursor-pointer"
                  onClick={() => {
                    setOpenDelete(true);
                    setDeleteId(p.portfolio_id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
                    { OpenDelete && (
        <DeleteModal
          onDelete={() => handleDelete(DeleteId)}
          onCancel={() => setOpenDelete(false)}
        />
      )}
      { OpenEdit && (
        <EditModal
          onEdit={() => handleEdit(EditId)}
          onCancel={() => setOpenEdit(false)}
        />
      )}

      </div>
    </div>
      
  );
};
export default Landing;

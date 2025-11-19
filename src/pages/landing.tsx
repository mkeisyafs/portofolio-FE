import { ExternalLink, SquarePen, Trash2, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { type portfolio } from "../types/type";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/ui/deletemodal";
import EditModal from "../components/ui/editmodal";
import { api } from "../lib/api";
import { useAuth } from "../lib/userauth";

const Landing = () => {
  const navigate = useNavigate();
  const [Portfolio, setPortfolio] = useState<portfolio[]>([]);
  const [OpenDelete, setOpenDelete] = useState(false);
  const [DeleteId, setDeleteId] = useState<any>(null);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [EditId, setEditId] = useState<any>(null);

  const userId = useAuth();
  console.log(userId);

  useEffect(() => {
    if (!userId) return;
    const fetchportfolio = async () => {
      try {
        const res = await api.get(`/portfolio/find-all/${userId}`);
        if (res.data.data.length === 0) {
          navigate("/create", { state: { user_id: userId } });
        }
        setPortfolio(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchportfolio();
  }, [userId, navigate]);

  const handleDelete = async (id: any) => {
    try {
      await api.delete(`/portfolio/delete/${id}`);
      setPortfolio(Portfolio.filter((p) => p.portfolio_id !== id));
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: any) => {
    setPortfolio(Portfolio.map((p) => (p.portfolio_id === id ? p : p)));
    setOpenEdit(false);
    navigate(`/create`, { state: { portfolio_id: id } });
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col overflow-x-hidden">
      <div className="flex justify-between">
        <h2 className="text-white font-bold mt-12  ml-10 w-full text-3xl">
          Portofolioku
        </h2>
        <LogOut
          className="text-white mt-12 mr-10 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
          }}
        />
      </div>
      <button
        onClick={() => navigate("/create")}
        className="bg-[#FAFAFA] w-50 h-15 ml-10 mt-8 font-bold rounded-lg text-black hover:bg-white/75"
      >
        Buat Portfolio
      </button>
      <div className="grid grid-cols-3 gap-x-5 py-4 pl-10 w-full h-full">
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
                <SquarePen
                  className="text-black cursor-pointer"
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(p.portfolio_id);
                  }}
                />
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
        {OpenDelete && (
          <DeleteModal
            onDelete={() => handleDelete(DeleteId)}
            onCancel={() => setOpenDelete(false)}
          />
        )}
        {OpenEdit && (
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

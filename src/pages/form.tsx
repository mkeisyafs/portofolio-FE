import React, { useEffect, useState } from "react";
import Back from "../components/ui/back";
import axios from "axios";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Form: React.FC = () => {
  const [IsEdit, setIsEdit] = useState(false);
  const [Nama, setNama] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const [Email, setEmail] = useState("");
  const [Tentang, setTentang] = useState("");
  const [Lokasi, setLokasi] = useState("");
  const [Telepon, setTelepon] = useState("");
  const [Github, setGithub] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [Skill, setSkill] = useState<string[]>([]);

  const [FotoOFile, setFotoOFile] = useState<File | null>(null);
  const [FotoOUrl, setFotoOUrl] = useState("");

  const [Projects, setProjects] = useState<any[]>([
    {
      judul_project: "",
      deskripsi: "",
      cover: null,
      coverUrl: "",
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const { portfolio_id } = location.state || {};

 useEffect(() => {
  if (!portfolio_id) return;
  const FetchData = async () => {
    setIsEdit(true);
    try {
      const res = await axios.get(`http://localhost:4000/api/portfolio/find-one/${portfolio_id}`);
      const data = res.data.data;
      console.log(data);
      setNama(data.nama || "");
      setDeskripsi(data.deskripsi || "");
      setEmail(data.email || "");
      setTentang(data.bio || "");
      setLokasi(data.lokasi || "");
      setTelepon(data.nomor_telepon || "");
      setGithub(data.github || "");
      setLinkedin(data.linkedin || "");
      setFotoOUrl(data.foto ? `http://localhost:4000${data.foto}` : "");

      if (Array.isArray(data.skill)) {
        setSkill(data.skill.map((s: any) => s.nama_skill || ""));
      } else {
        setSkill([]);
      }
      if (Array.isArray(data.project) && data.project.length > 0) {
        const mapped = data.project.map((p: any) => ({
          project_id: p.project_id ?? null,           
          judul_project: p.judul_project || "",
          deskripsi: p.deskripsi || "",
          cover: null, 
          coverUrl: p.cover ? `http://localhost:4000${p.cover}` : "", 
        }));
        setProjects(mapped);
      } else {
        setProjects([
          {
            project_id: null,
            judul_project: "",
            deskripsi: "",
            cover: null,
            coverUrl: "",
          },
        ]);
      }

    } catch (err) {
      console.error(err);
      alert("Terjadi error saat mengambil data portofolio");
    }
  };
  FetchData();
}, [portfolio_id]);


// Upload helper
async function uploadFile(file: File | null) {
  if (!file) return null;
  const fd = new FormData();
  fd.append('image', file);
  const res = await axios.post('http://localhost:4000/api/upload', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return res.data?.path ?? null;
}

const handleSubmit = async () => {
  try {
    // ini untuk mode edit
    if (IsEdit && portfolio_id) {
      let fotoPath = FotoOUrl;
      
      if (FotoOFile) {
        fotoPath = await uploadFile(FotoOFile) || FotoOUrl;
      }

      if (fotoPath && fotoPath.startsWith("http")) {
        fotoPath = fotoPath.replace("http://localhost:4000", "");
      }

      await axios.put(`http://localhost:4000/api/portfolio/update/${portfolio_id}`, {
        nama: Nama,
        foto: fotoPath,
        email: Email,
        deskripsi: Deskripsi,
        bio: Tentang,
        lokasi: Lokasi,
        nomor_telepon: String(Telepon),
        github: Github,
        linkedin: Linkedin,
      });

      await axios.delete(`http://localhost:4000/api/project/delete-by-portfolio/${portfolio_id}`);
      
      const projectsData = await Promise.all(
        Projects.map(async (project) => {
          let coverPath = project.coverUrl;
          
          if (project.cover) {
            coverPath = await uploadFile(project.cover) || project.coverUrl;
          }

          if (coverPath && coverPath.startsWith("http")) {
            coverPath = coverPath.replace("http://localhost:4000", "");
          }
                    
          return {
            judul_project: project.judul_project,
            deskripsi: project.deskripsi,
            cover: coverPath,
            portfolio_id: portfolio_id,
          };
        })
      );

      if (projectsData.length > 0) {
        const dataP = {
          projects: projectsData,
        };
        await axios.post('http://localhost:4000/api/project/create-many', dataP);
      }

      await axios.delete(`http://localhost:4000/api/skill/delete-by-portfolio/${portfolio_id}`);
      
      const dataS = {
        skill: Skill.map((s) => ({
          portfolio_id: portfolio_id,
          nama_skill: s,
        })),
      };
      if (Skill.length > 0) {
        await axios.post('http://localhost:4000/api/skill/create-many', dataS);
      }

      alert('Portfolio berhasil diupdate!');
      navigate('/');
      return;
    }


    // Ini untuk mode create
    const fotoPath = await uploadFile(FotoOFile);

    const res = await axios.post('http://localhost:4000/api/portfolio/create', {
      nama: Nama,
      foto: fotoPath,     
      email: Email,     
      deskripsi: Deskripsi,
      bio: Tentang,
      lokasi: Lokasi,
      nomor_telepon: String(Telepon),
      github: Github,
      linkedin: Linkedin,
    });

    const NewPortId = res.data.portfolio_id;

    const projectsData = await Promise.all(
      Projects.map(async (project) => {
        const coverPath = await uploadFile(project.cover);
        return {
          judul_project: project.judul_project,
          deskripsi: project.deskripsi,
          cover: coverPath,
          portfolio_id: NewPortId,
        };
      })
    );

    if (projectsData.length > 0) {
      const dataP = {
        projects: projectsData,
      };
      await axios.post('http://localhost:4000/api/project/create-many', dataP);
    }

    const dataS = {
      skill: Skill.map((s) => ({
        portfolio_id: NewPortId,
        nama_skill: s,
      })),
    };
    await axios.post('http://localhost:4000/api/skill/create-many', dataS);

    alert('Portfolio berhasil dibuat!');
    navigate('/');

  } catch (err) {
    console.error(err);
    alert('Terjadi error saat membuat/update portofolio');
  }
};

  const handleFileChangeFotoO = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    setFotoOUrl(tempUrl);
    setFotoOFile(file);
  };

  const IncreaseSkill = () => {
    setSkill([...Skill, ""]);
  };

const DecreaseSkill = (index: number) => {
    const updated = [...Skill];
    updated.splice(index, 1);
    setSkill(updated);
  }

  const updateSkill = (index: number, value: string) => {
    const updated = [...Skill];
    updated[index] = value;
    setSkill(updated);
  };

  const IncreaseProject = () => {
    setProjects([
      ...Projects,
      {
        judul_project: "",
        deskripsi: "",
        cover: null,
        coverUrl: "",
      },
    ]);
  };

  const DecreaseProject = (index: number) => {
    const updated = [...Projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  const updateProjectField = (index: number, field: string, value: any) => {
    const updated = [...Projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleFileChangeProject = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    updateProjectField(index, "coverUrl", tempUrl);
    updateProjectField(index, "cover", file);
  };

  return (
    <div className="w-screen  h-screen bg-[#FAFAFA] overflow-hidden flex flex-col">
      <div className="w-full   h-full flex flex-col overflow-y-auto overflow-x-hidden">
        <Back />
        <h2 className="text-black font-bold mt-10 ml-10 text-2xl">
          Buat Portofolio
        </h2>
        <div className="flex flex-col mx-10 outline mt-5 w-full mb-10">
          <label className="font-bold text-black ">Nama</label>
          <input
            type="text"
            value={Nama}
            required
            onChange={(e) => setNama(e.target.value)}
            className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
          />
          <label className="font-bold text-black ">Email</label>
          <input
            type="email"
            value={Email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="focus:invalid:border-red-500 text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
          />
          <label className="font-bold text-black mt-5">Foto</label>
          <input
            type="file"
            onChange={handleFileChangeFotoO}
            className={` text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg cursor-pointer`}
          />
          {FotoOUrl && (
            <div>
              <img
                src={FotoOUrl}
                alt="Preview"
                className="mt-2 w-fit max-h-65 object-cover rounded-lg  border border-[#e0e0e0]"
              />
            </div>
          )}
          <label className="font-bold text-black mt-5">Deskripsi</label>
          <textarea
            value={Deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className=" text-black p-2 w-100  bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg resize-none"
            rows={5}
          ></textarea>
          <label className="font-bold text-black mt-5">Tentang Saya</label>
          <textarea
            value={Tentang}
            onChange={(e) => setTentang(e.target.value)}
            className=" text-black p-2 w-100  bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg resize-none"
            rows={5}
          ></textarea>
          <label className="font-bold text-black ">Lokasi</label>
          <input
            value={Lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            type="text"
            className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
          />
          <label className="font-bold text-black mt-5">Nomor Telepon</label>
          <input
            value={Telepon}
            onChange={(e) => setTelepon(e.target.value)}
            type="number"
            className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
          />
          <label className="font-bold text-black mt-5">Github (Opsional)</label>
          <input
            value={Github}
            onChange={(e) => setGithub(e.target.value)}
            type="text"
            className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
          />
          <label className="font-bold text-black mt-5">
            LinkedIn (Opsional)
          </label>
          <input
            value={Linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            type="text"
            className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
          />

          <label className="font-bold text-black mt-5 ">Skills</label>

          <div className="flex flex-row ">
            <div className="grid grid-cols-4 gap-2">
              {Skill.map((skill, index) => (
                <div key={index} className="flex justify-center items-center">
                <input
                  
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  type="text"
                  className=" text-black p-2 w-40 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
                />
                <Trash2 className="text-red-500 cursor-pointer mx-2" onClick={() => DecreaseSkill(index)}/> 
                </div>
              ))}
              <button
                onClick={() => IncreaseSkill()}
                className=" mt-2 flex bg-[#F2F2F2] border border-[#e0e0e0] w-20 h-10 items-center  justify-center rounded-lg "
              >
                <Plus className="text-black" />
              </button>
            </div>
          </div>

          <label className="font-bold text-black mt-5 text-2xl">Projects</label>
          {Projects.map((project, projectIndex) => (
            <div
              key={projectIndex}
              className="w-fit h-fit bg-[#F2F2F2] border border-[#e0e0e0] mt-5 rounded-lg p-3 flex flex-row"
            >
              <div className="flex flex-col mr-3">
                <label className="font-bold text-black mt-3">Judul Project</label>
                <input
                  value={project.judul_project}
                  onChange={(e) =>
                    updateProjectField(projectIndex, "judul_project", e.target.value)
                  }
                  type="text"
                  className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg "
                />
                <label className="font-bold text-black mt-3">
                  Deskripsi Project
                </label>
                <textarea
                  value={project.deskripsi}
                  onChange={(e) =>
                    updateProjectField(projectIndex, "deskripsi", e.target.value)
                  }
                  className=" text-black p-2 w-100  bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg resize-none"
                  rows={10}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-black mt-3">Foto</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChangeProject(projectIndex, e)}
                  className=" text-black p-2 w-100 h-10 bg-white border border-[#E0E0E0] outline-none mt-2 rounded-lg cursor-pointer"
                />
                {project.coverUrl && (
                  <div>
                    <img
                      src={project.coverUrl || ""}
                      alt="Preview"
                      className="mt-11 w-fit max-h-65  h-fit object-cover rounded-lg border border-[#e0e0e0]"
                    />
                  </div>
                )}
              </div>
              {Projects.length > 1 && (
                <button
                  onClick={() => DecreaseProject(projectIndex)}
                  className="ml-3 mt-3 flex  w-12 h-10 items-center justify-center rounded-lg "
                >
                  <Trash2 className="text-red-500 cursor-pointer" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => IncreaseProject()}
            className=" mt-2 flex bg-[#F2F2F2] border border-[#e0e0e0] w-32 h-10 items-center  justify-center rounded-lg hover:bg-[#E0E0E0]"
          >
            <Plus className="text-black mr-2" />
          </button>
          <button
            onClick={handleSubmit}
            className="w-80 h-10 mt-10 bg-black text-white font-bold rounded-lg hover:bg-black/75"
          >
            {IsEdit ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Form;

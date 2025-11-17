import { type portfolio } from "../../types/type";

interface DataPortfolio {
  data: portfolio | null;
}

const Projects: React.FC<DataPortfolio> = ({ data }) => {
  return (
    <div className="grid-cols-2  grid gap-2 overflow-hidden p-4 mb-6">
      {data?.project?.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        data?.project?.map((p) => (
          <div
            key={p.project_id}
            className="min-w-20 min-h-55 h-fit w-fit bg-[#FAFAFA] mx-4 mt-5 flex-col rounded-lg p-7 hover:scale-105 transition duration-100"
          >
            <p className="text-black font-bold text-2xl">{p.judul_project}</p>
            <div className="h-full w-full mt-3">
              <img
                src={`http://localhost:4000${p.cover}`}
                className="w-full h-50 object-cover rounded-lg"
              />
              <p className="text-black/50 mt-5 ">{p.deskripsi}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;

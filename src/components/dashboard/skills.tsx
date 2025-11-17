
import { type portfolio } from "../../types/type";

interface data {
  data: portfolio | null;
}

const SKills: React.FC<data> = ({ data }) => {

  return (
    <div className="w-fit grid grid-cols-5 gap-3  ">
      {data?.skill?.length === 0 ? (
        <p className="text-black">Tidak ada skill</p>
      ) : (
        data?.skill?.map((s) => (
          <div
            key={s.skill_id}
            className="flex min-w-20  h-10 bg-[#f2f2f2] border border-[#E0E0E0] rounded-lg p-2"
          >
            <p className="text-black flex items-center justify-center  w-full h-full ">
              {s.nama_skill}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
export default SKills;

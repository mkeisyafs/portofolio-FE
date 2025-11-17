import type React from "react";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}
const Menu: React.FC<MenuProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex justify-end mt-15 mx-5" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#121212] w-30 h-fit z-50 flex flex-col justify-start gap-3 rounded-lg py-5 ">
        <a href="/p" className="text-white text-sm  text-center hover:text-white/50 cursor-pointer">Buat Portofolio</a>
        <a href="/" className="text-white text-sm text-center hover:text-white/50 cursor-pointer">Portofolioku</a>
      </div>
    </div>
  );
};
export default Menu;

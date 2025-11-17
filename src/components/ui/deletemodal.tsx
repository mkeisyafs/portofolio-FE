import type React from "react";

interface DeleteModalProps {
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onDelete, onCancel }) => {
    return (
        <div className="z-50 h-screen w-screen bg-black/25 fixed top-0 left-0 flex justify-center items-center" onClick={onCancel}>
            <div className="bg-gray-200 w-96 h-48 inset-0 rounded-lg flex flex-col justify-center items-center shadow-lg" onClick={(e) => e.stopPropagation}>
                <h2 className="text-black font-bold text-lg mb-8 text-center ">Are you sure you want to delete this portfolio?</h2>
                <div className="flex gap-x-14">
                    <button className="bg-red-500 text-white px-9 py-2 rounded hover:bg-red-600" onClick={onDelete}>Delete</button>
                    <button className="bg-gray-500 text-white px-9 py-2 rounded hover:bg-gray-600" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal;
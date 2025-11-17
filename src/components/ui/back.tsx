import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Back = () => {
   const navigate = useNavigate();
    return(
        <div className="flex ">
            <button className="flex text-black ml-10 mt-10 cursor-pointer font-bold" onClick={() => {navigate(-1)}}>
                <ArrowLeft className="mr-2"/> Back
            </button>
        </div>
    )
}
export default Back;
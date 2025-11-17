interface Data {
    Data:any
}

const Footer:React.FC<Data> = ({Data}) => {
    return(
        <div className="w-full h-40 flex flex-col bg-black ">
            {Data?.github ? (<a href={Data?.github} className="text-white/50 mt-10 ml-10 w-fit hover:text-white">Github</a>) :(
           "" )}

            {Data?.linkedin ? ( <a href={Data?.linkedin} className="text-white/50 mt-5 ml-10 w-fit hover:text-white ">LinkedIn</a>) : (
           "")}
            <div className="flex flex-col-reverse items-center w-full h-full mb-5">
                <h2 className="text-white  ">©2025 My portofolio</h2>
            </div>
        </div>
    )
}
export default Footer;
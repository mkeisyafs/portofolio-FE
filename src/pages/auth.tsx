import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [IsRegister, setIsRegister] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setConfirmPassword("");
    try {
      const res = await axios.post("http://192.168.18.129:4000/api/auth/login", {
        email: Email,
        password: Password,
      });

      if (Email === "" || Password === "") {
        alert("Please fill all fields");
        return;
      }

      console.log(res.data);
      let UserId = res.data.user.user_id;
      localStorage.setItem("token", res.data.token);
      navigate(`/portfolio`, { state: { user_id: UserId } });
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    if (Password !== ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        email: Email,
        password: Password,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      let UserId = res.data.user.user_id;
      navigate(`/portfolio`, { state: { user_id: UserId } });
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#212121] justify-center items-center">
      <div className="w-150 h-fit bg-[#121212] rounded-lg p-5">
        <h2 className="text-white font-bold flex justify-center text-4xl">
          {IsRegister ? "Register" : "Login"}
        </h2>
        <div className="flex flex-col p-5 gap-y-4 ">
          <label className="text-white text-xl font-semibold">Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:invalid:border-red-500 text-white p-2 w-full h-15 bg-[#212121] border border-[#3e3e3e] outline-none mt-2 rounded-lg "
          />
          <label className="text-white text-xl font-semibold">Password</label>
          <div className="relative">
            <input
              onKeyDown={(e) => {
                if (!IsRegister && e.key === "Enter") {
                  IsRegister ? handleRegister() : handleLogin();
                }
              }}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type={ShowPassword ? "text" : "password"}
              className=" text-white p-2 w-full h-15 bg-[#212121] border border-[#3e3e3e] outline-none mt-2 rounded-lg "
            />
            {ShowPassword ? (
              <Eye
                onClick={() => setShowPassword(!ShowPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/3 cursor-pointer text-white"
              />
            ) : (
              <EyeClosed onClick={() => setShowPassword(!ShowPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/3 cursor-pointer text-white" />
            )}
          </div>
          {IsRegister ? (
            <div>
              <label className="text-white text-xl font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    IsRegister ? handleRegister() : handleLogin();
                  }
                }}
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={ShowPassword ? "text" : "password"}
                className=" text-white p-2 w-full h-15 bg-[#212121] border border-[#3e3e3e] outline-none mt-2 rounded-lg "
              />
                          {ShowPassword ? (
              <Eye
                onClick={() => setShowPassword(!ShowPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/3 cursor-pointer text-white"
              />
            ) : (
              <EyeClosed onClick={() => setShowPassword(!ShowPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/3 cursor-pointer text-white" />
            )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between">
            {/* {IsRegister ? (
              ""
            ) : (
              <a href="" className="font-semibold text-lg underline">
                Forgot Password
              </a>
            )} */}
            <p
              className="font-semibold text-sm"
              onClick={() => setIsRegister(!IsRegister)}
            >
              {IsRegister
                ? "Already have an account?"
                : "Don't have an account? "}
              <a
                onClick={() => setIsRegister(!IsRegister)}
                className="underline cursor-pointer ml-3"
              >
                {IsRegister ? "Login Here" : "Register Here"}
              </a>
            </p>
          </div>
          <button
            onClick={() => {
              IsRegister ? handleRegister() : handleLogin();
            }}
            className="w-full h-15 font-bold text-xl bg-white text-black rounded-lg cursor-pointer mt-2 hover:bg-white/75"
          >
            {IsRegister ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;

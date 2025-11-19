import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      const decoded: any = jwtDecode(token);
      const id = decoded.user_id as string;

      if (!id) {
        navigate("/auth");
        return;
      }

      setUserId(id);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/auth");
    }
  }, [navigate]);

  return userId;
};

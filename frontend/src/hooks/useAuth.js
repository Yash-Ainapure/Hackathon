import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("auth-token");
      console.log('Token from useAuth:', token);
      
      if (!token && !hasRedirectedRef.current) {
        alert("Sorry! You need to login first.");
        hasRedirectedRef.current = true;
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/validate-token",
          {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          }
        );
      
        console.log('Response status:', response.status); // Add this line to debug
      
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("auth-token"); // Correct key
          hasRedirectedRef.current = true;
          navigate("/");
        } else if (response.status !== 200) {
          throw new Error("Failed to validate token");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        alert("An error occurred. Please log in again.");
        localStorage.removeItem("auth-token"); // Correct key
        hasRedirectedRef.current = true;
        navigate("/");
      }
    };

    validateToken();
  }, [navigate]);
};

export default useAuth;

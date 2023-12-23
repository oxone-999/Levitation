import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import Loading from "../lottie/loading.json";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        toast.success("Registered successfully!");
        setLoading(false);
        navigate("/login", { replace: true });
      } else {
        toast.error("Something went wrong!");
        setLoading(false);
      }

      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={Loading} />
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default Register;

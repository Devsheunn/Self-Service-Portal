import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./LoginPage.css";
import PublicApi from "../../Utils/axios";
import AuthContext from "../../Context/AuthContext";
import Loader from "../Loader/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { accessToken, setAccessToken, user, setUser } =
    useContext(AuthContext);
  const { refreshToken, setRefreshToken, isLoading, setIsLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await PublicApi.post(
        "api/users/token/",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.setItem("access", response.data.access);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      navigate("/homePage");
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Missing Username or Password");
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
        setError("Unauthorized");
      } else {
        console.log("Login Failed");
        setError("Login Failed");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader />
      <div className="login-container">
        <form action="/" onSubmit={handleSubmit}>
          <img src={assets.egbinLogo} alt="" />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            id=""
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <p className="error"> {error}</p>
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Header = () => {
  // Variables
  const [accountVisible, setAccountVisible] = useState(false);
  const sectionRefs = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setUser, activeLink, setActiveLink } = useContext(AuthContext);
  const navigate = useNavigate();

  // Functions

  useEffect(() => {
    setActiveLink(1);
    const handleIsScrolled = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleIsScrolled);

    return () => {
      window.removeEventListener("scroll", handleIsScrolled);
    };
  }, []);

  const handleScroll = num => {
    console.log(sectionRefs.current);
    console.log(sectionRefs.current[num]);
    sectionRefs.current[num].scrollIntoView({ behaviour: "smooth" });
  };

  const handleAccountVisibility = () => {
    setAccountVisible(prev => !prev);
  };

  const logOut = () => {
    localStorage.removeItem("access");
    navigate("/login");
    setUser(null);
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <header
        className={isScrolled ? "scrolled header" : "header"}
        ref={el => (sectionRefs.current[0] = el)}
      >
        <div className="logo">
          <img src={assets.egbinLogo} alt="company Logo" />
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link
                className={activeLink === 1 ? "link active-link" : "link"}
                to={"/homePage"}
                onClick={e => setActiveLink(1)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={activeLink === 2 ? "link active-link" : "link"}
                to={"/inconvenience-allowance"}
                onClick={e => setActiveLink(2)}
              >
                Inconvinience Allowance
              </Link>
            </li>
            <li>
              <Link
                className={activeLink === 3 ? "link active-link" : "link"}
                to={"/homePage"}
                onClick={e => setActiveLink(3)}
              >
                CBA
              </Link>
            </li>
            <li>
              <Link
                className={activeLink === 4 ? "link active-link" : "link"}
                to={"/homePage"}
                onClick={e => setActiveLink(4)}
              >
                {" "}
                Change Password
              </Link>
            </li>
          </ul>
          <div className="account-section">
            <img
              onClick={handleAccountVisibility}
              src={assets.accountIcon}
              alt="account icon"
            />
          </div>
        </nav>
        {accountVisible ? (
          <div
            className="account-dropdown-overlay"
            onClick={e => {
              if (e.target.classList.contains("account-dropdown-overlay")) {
                setAccountVisible(false);
              }
            }}
          >
            <div className="account-dropdown">
              <div className="account-info">
                <div className="profile-pic">
                  {user && user?.first_name.charAt(0)}
                </div>
                <p className="account-name">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="account-mail">{user?.email}</p>
              </div>
              <div className="account-features">
                <div className="theme">
                  <img src={assets.settingsIcon} alt="theme icon" />
                  <p>Theme(inprogress)</p>
                </div>
                <div className="settings">
                  <img src={assets.settingsIcon} alt="settings icon" />
                  <p>Settings</p>
                </div>
                <div onClick={() => logOut()} className="log-out">
                  <img src={assets.logOutIcon} alt="log-out icon" />
                  <p onClick={() => logOut()}>Log Out</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;

import React, { useEffect, useState, useRef, useContext } from "react";
import { assets } from "../../assets/assets";
import "./HomePage.css";
import Card from "../Card/Card";
import Header from "../Header/Header";
import AuthContext from "../../Context/AuthContext";
import GetUserDetails from "../GetUserDetails";
import Loader from "../Loader/Loader";

const HomePage = () => {
  // Variables
  const sectionRefs = useRef([]);
  const { user, setUser, getDepartment, setIsLoading, isLoading } =
    useContext(AuthContext);
  const getUser = GetUserDetails();

  useEffect(() => {
    setIsLoading(true);
    getUser();
  }, []);

  console.log(user);

  // Functions
  const handleScroll = num => {
    console.log(sectionRefs.current);
    console.log(sectionRefs.current[num]);
    sectionRefs.current[num].scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <>
      <div className="landingPageContainer">
        <Header />

        <section
          className="section--1"
          ref={el => (sectionRefs.current[1] = el)}
        >
          <h1>
            {user?.last_name} {user?.first_name}
            {/* Aina Oluwatobiloba Seun */}
          </h1>
          <p>Welcome to Egbin Power Plant Self Service Portal</p>
        </section>

        <section
          className="section--2 cards"
          ref={el => (sectionRefs.current[2] = el)}
        >
          <Card
            tittle="Reset Password"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati nobis accusamus ."
            image={assets.passwordReset}
            url="/page1"
          />

          <Card
            tittle="CBA"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati nobis accusamus ."
            image={assets.review}
            url="/page1"
          />

          <Card
            tittle="Inconvenience Allowance"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Obcaecati nobis accusamus ."
            image={assets.allowance}
            url="/inconvenience-allowance"
          />

          <Card
            tittle="Coming Soon..."
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Obcaecati nobis accusamus ."
            image={assets.soon}
            url="/page1"
          />
        </section>

        <section
          className="section--3"
          ref={el => (sectionRefs.current[3] = el)}
        >
          <h3>Egbin Foundation</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam a
            exercitationem, doloribus sint ut vitae labore dignissimos, maxime
            minima voluptates qui, veniam mollitia eum enim! Magnam debitis
            quasi natus atque?
          </p>
          <button>Learn More</button>
        </section>

        <footer className="footer" ref={el => (sectionRefs.current[4] = el)}>
          <div className="social-media">
            <img src={assets.twitterLogo} alt="" />
            <img src={assets.facebookLogo} alt="" />
            <img src={assets.linkedInLogo} alt="" />
            <img src={assets.instaLogo} alt="" />
          </div>
        </footer>
      </div>
      <Loader />
    </>
  );
};

export default HomePage;

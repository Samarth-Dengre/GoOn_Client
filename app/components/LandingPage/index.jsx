"use client";
import { Lato } from "next/font/google";
import { useState } from "react";
import styles from "./LandingPage.module.css";
import Login from "../Login";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Backdrop from "../Backdrop";
import CustomButton from "../CustomButton";
import Link from "next/link";
const Signup = dynamic(() => import("../Signup"), {
  loading: () => <CircularProgress />,
});

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const index = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  return (
    <>
      <div className={styles.navBar}>
        <Image src="/logo_blue.png" alt="Go-On" width={100} height={100} />
        <div className={styles.navBar__RightItems}>
          <Link href="#about" className={styles.navLink}>
            <button className={styles.button}>About Us</button>
          </Link>
          <CustomButton
            title="Register your shop"
            onClick={() => {}}
            className={styles.button}
            disabled={false}
          />
          <CustomButton
            title="Login"
            onClick={() => {
              setShowBackdrop(true);
              setShowSignupForm(false);
            }}
            className={styles.button}
            disabled={false}
          />
        </div>
      </div>
      <div className={styles.container}>
        <Image src="/landing.jpg" alt="Go-On" fill="responsive" />
        <div className={styles.formContainer}>
          {showBackdrop && (
            <Backdrop hideBackdrop={() => setShowBackdrop(false)}>
              {showSignupForm ? (
                <Signup showSignupForm={() => setShowSignupForm(false)} />
              ) : (
                <Login showSignupForm={() => setShowSignupForm(true)} />
              )}
            </Backdrop>
          )}
        </div>
      </div>
      <div className={styles.aboutUsContainer} id="about">
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.aboutUsContent}>
          <div className={styles.aboutUsContentLeft}>
            <div className={styles.aboutUsContentLeftTitle}>
              <h3>What is Go.On?</h3>
            </div>
            <div
              className={`${styles.aboutUsContentLeftText} ${lato.className}`}
            >
              Go.On is the perfect platform for your online shopping needs,
              offering a unique and innovative approach to ecommerce. With
              Go.On, we empower users to choose the shop from which they want to
              shop, giving them the flexibility and freedom to explore a wide
              range of options.
              <h3>Here's why Go.On stands out from the rest:</h3>
              <ul>
                <li>
                  <strong>Shop Selection:</strong> We understand that every
                  customer has different preferences when it comes to shopping.
                  With Go.On, users have the ability to select the shop that
                  best suits their needs, ensuring a personalized and tailored
                  shopping experience. Whether it's a local boutique or a
                  well-known brand, Go.On brings together a diverse range of
                  shops, providing endless choices under one platform.
                </li>
                <li>
                  <strong>Variety and Diversity:</strong> With a multitude of
                  registered shops, Go.On offers a diverse range of products,
                  ensuring that customers can find exactly what they need. From
                  fashion and electronics to home decor and beyond, Go.On caters
                  to a wide range of interests and preferences. This variety
                  allows users to explore different options and discover new
                  brands or local shops they may have never encountered before.
                </li>
                <li>
                  <strong>Convenience and Efficiency:</strong> Go.On simplifies
                  the online shopping process by bringing together a wide array
                  of shops into a single website. Users can easily navigate
                  through different shops, compare products, and make informed
                  decisions. This saves time and effort, eliminating the need to
                  visit multiple websites or physical stores to find what
                  they're looking for.
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.aboutUsContentRight}>
            <div className={styles.aboutUsContentRightTitle}>
              <h3>Why Go.On?</h3>
            </div>
            <div
              className={`${styles.aboutUsContentRightText}  ${lato.className}`}
            >
              Go.On is an innovative and user-centric ecommerce platform that
              revolutionizes the way people shop online. It is a comprehensive
              marketplace that brings together a multitude of shops, offering
              customers a seamless and personalized shopping experience. With
              Go.On, users can explore a vast array of products and choose from
              a wide range of shops, all in one convenient location. <br />
              <br />
              At its core, Go.On is a hub of possibilities, where shoppers can
              discover new brands, explore local businesses, and find unique
              products that match their individual preferences. It provides a
              platform for shopkeepers to showcase their offerings and connect
              with a larger customer base, expanding their reach and driving
              business growth. <br />
              <br />
              Go.On fosters a vibrant community of shoppers and shopkeepers,
              creating a dynamic environment for engagement and interaction.
              Customers can share reviews, recommendations, and engage in
              discussions, creating a sense of belonging and connection. This
              community-driven approach enhances the overall shopping
              experience, making it more engaging and enjoyable.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

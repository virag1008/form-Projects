import { ReactNavbar } from "overlay-navbar";
import { Routes, Route } from "react-router-dom";
import "./overlay.css";
import Home from "./Home";
import About from "./About";
import Products from "./Products";

// to use this overlay u need to install overlay-navbar first from npm

function Overlay() {
  return (
    <div>
      <ReactNavbar
        logo="https://www.lunapic.com/editor/premade/transparent.gif"
        burgerColor="crimson"
        navColor1="#fff5f5"
        burgerColorHover="#900"
        logoWidth="50%"
        logoHoverColor="crimson"
        link1Size="1.2rem"
        link1Color="#121212"
        link1Padding="1vmax"
        link1ColorHover="crimson"
        nav2justifyContent="flex-end"
        link1Margin="1vmax"
        link2Margin="0"
        link3Margin="0"
        link4Margin="1vmax"
        nav3justifyContent="flex-start"
        link1Text="Home"
        link1Url="/home"
        link1Family="sans-serif"
        link2Text="Products"
        link2Url="/product"
        link3Text="About Us"
        link3Url="/about"
        link4Text="Contact Us"
        nav4justifyContent="flex-start"
      />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Products />} />
      </Routes>
    </div>
  );
}
export default Overlay;

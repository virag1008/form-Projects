// import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import FrontPage from "./AllFiles/FrontPage";
// import Overlay from "./OverlayNavbar/Overlay";
import FormComponent from "./Form-Project/FormComponent";

function App() {
  return (
    <BrowserRouter>
      <FrontPage />
      {/* <Overlay /> */}
      {/* <FormComponent />; */}
    </BrowserRouter>
  );
}

export default App;

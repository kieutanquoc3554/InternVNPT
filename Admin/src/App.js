import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";

function App() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const loginLayout = () => {
    if (location.pathname === "/login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    loginLayout();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        {isLogin === false && localStorage.getItem("isLogin") ? (
          <>
            <SideMenu></SideMenu>
            <PageContent></PageContent>
          </>
        ) : (
          <Login></Login>
        )}
      </div>
      <AppFooter />
    </div>
  );
}
export default App;

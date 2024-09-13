import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Category from "./Pages/Category";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Components/Test/Test";
import Table from "./Components/TableManage/Table";
import Booking from "./Components/Booking/Booking";
import OrderManage from "./Components/OrderManage/OrderManage";
import ViewOrder from "./Components/ViewOrder/ViewOrder";
import OrderDetail from "./Components/OrderDetail/OrderDetail";
import { useEffect } from "react";
import Refund from "./Components/Refund/Refund";
import Progressing from "./Components/Progressing/Progressing";

function App() {
  useEffect(() => {
    const resetData = () => {
      localStorage.removeItem("table");
    };
    resetData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Category category="coffee" />}></Route>
          <Route path="/tea" element={<Category category="tea" />}></Route>
          <Route path="/latte" element={<Category category="latte" />}></Route>
          <Route path="/fruit" element={<Category category="fruit" />}></Route>
          <Route
            path="/milktea"
            element={<Category category="milktea" />}
          ></Route>
          <Route
            path="/yogurt"
            element={<Category category="yogurt" />}
          ></Route>
          {/* <Route path="/product" element={<Product />}></Route>
          <Route path="/product/:productId" element={<Product />}></Route> */}
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/tablemanage" element={<Table />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/ordermanager" element={<OrderManage />}>
            <Route path="vieworder" element={<ViewOrder />} />
            <Route path="refund" element={<Refund />} />
            <Route path="notcomplete" element={<Progressing />} />
            <Route path="vieworder/:orderId" element={<OrderDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

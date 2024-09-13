import { Route, Routes } from "react-router-dom";
import Coupon from "../../Pages/Coupon";
import Analytics from "../../Pages/Analytics";
import Login from "../../Pages/Login";
import Users from "../../Pages/Users";
import Register from "../../Pages/Register";
import EditRegister from "../../Pages/Register/editRegister";
import EditCoupon from "../../Pages/Coupon/editCoupon";
import Products from "../../Pages/Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Analytics />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/coupon" element={<Coupon />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/editregister/:id" element={<EditRegister />}></Route>
      <Route path="/editpromote/:id" element={<EditCoupon />}></Route>
    </Routes>
  );
}
export default AppRoutes;

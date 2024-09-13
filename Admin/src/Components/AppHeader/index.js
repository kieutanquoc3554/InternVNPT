import { Button } from "antd";
import "../../App.css";
import { useNavigate, useLocation } from "react-router-dom";

function AppHeader() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login");
		window.location.reload();
	};
	return (
		<div className="AppHeader">
			<h3>Hệ thống quản lý dành cho quản trị viên</h3>
			<Button onClick={handleLogout}>Đăng xuất</Button>
		</div>
	);
}
export default AppHeader;

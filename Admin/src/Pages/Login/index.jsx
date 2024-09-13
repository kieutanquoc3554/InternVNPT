import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { loginAdmin } from "../../API";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const [phone, setPhone] = useState();
	const [password, setPassword] = useState();
	const [message, setMessage] = useState();
	const [result, setResult] = useState("false");
	const onChangePhone = (e) => {
		setPhone(e.target.value);
	};
	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		console.log(phone);
		const res = await loginAdmin({ data: { phone: phone, password: password } });
		if (res.success) {
			console.log(res.success);
			setMessage(res.success);
			localStorage.setItem("isLogin", res.token);
			navigate("/");
			window.location.reload();
		} else {
			console.log("FALSE");
			setResult("false");
			setMessage(res.errors);
		}
	};
	return (
		<div className="login-form">
			<div>
				{result === "true" ? (
					<p style={{ color: "green", textAlign: "center" }}>{message}</p>
				) : (
					<p style={{ color: "red", textAlign: "center" }}>{message}</p>
				)}
				<h3 style={{ textAlign: "center", marginBottom: 20 }}>Đăng nhập hệ thống Admin</h3>
				<Form
					name="basic"
					autoComplete="off"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
				>
					<Form.Item
						label="Số điện thoại"
						name="phone"
						rules={[
							{
								required: true,
								message: "Nhập số điện thoại!",
							},
						]}
					>
						<Input onChange={onChangePhone} style={{ width: "100%" }} type="number" />
					</Form.Item>

					<Form.Item
						label="Mật khẩu"
						name="password"
						rules={[
							{
								required: true,
								message: "Nhập mật khẩu!",
							},
						]}
					>
						<Input.Password onChange={onChangePassword} />
					</Form.Item>

					<div style={{ textAlign: "center" }}>
						<Button type="primary" onClick={handleLogin}>
							Submit
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default Login;

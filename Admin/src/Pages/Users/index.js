import { Space, Table, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./index.css";

function Users() {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);

	const navigate = useNavigate();
	const handleAddAccount = () => {
		navigate("/register");
	};

	useEffect(() => {
		setLoading(true);

		axios
			.get("http://localhost:4000/users/user")
			.then((res) => {
				setDataSource(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching users:", error);
				setLoading(false);
			});
	}, []);

	const handleDelete = (id) => {
		console.log("id", id);
		Swal.fire({
			title: "Bạn có chắc chắn muốn xóa?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`http://localhost:4000/users/user/${id}`)
					.then((response) => {
						if (response.status === 200) {
							console.log("Xóa thành công:", response.data);
							Swal.fire({
								title: "Xóa thành công!",
								text: "Tài khoản đã được xóa thành công.",
								icon: "success",
								confirmButtonText: "OK",
							});
							window.location.reload();
						} else {
							console.log("Không thể xóa:");
						}
					})
					.catch((error) => {
						console.error("Lỗi khi xóa dữ liệu:", error);
					});
			}
		});
	};

	const handleEdit = (id) => {
		navigate(`/editregister/${id}`);
	};

	return (
		<div className="user-container">
			<div>
				<Typography.Title level={4}>QUẢN LÝ NHÂN VIÊN</Typography.Title>
				<Space>
					<Button type="primary" onClick={handleAddAccount}>
						Thêm tài khoản
					</Button>
				</Space>
			</div>
			<Table
				loading={loading}
				columns={[
					{
						title: "Tên",
						dataIndex: "ND_TEN",
					},
					{
						title: "Tên đăng nhập",
						dataIndex: "ND_TENNGUOIDUNG",
					},
					{
						title: "Email",
						dataIndex: "ND_EMAIL",
					},
					{
						title: "Số điện thoại",
						dataIndex: "ND_SDT",
					},

					{
						title: "Phân quyền",
						dataIndex: "ND_VAITRO",
					},
					{
						title: "Tác vụ",
						render: (id) => (
							<Space>
								<p className="update-btn" onClick={() => handleEdit(id._id)}>
									Cập nhật
								</p>
								<p className="delete-btn" onClick={() => handleDelete(id._id)}>
									Xóa
								</p>
							</Space>
						),
					},
				]}
				dataSource={dataSource}
				pagination={{
					pageSize: 5,
				}}
			></Table>
		</div>
	);
}
export default Users;

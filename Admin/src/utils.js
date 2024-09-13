export const formatDay = (date) => {
	//date: Sun Jun 02 2024
	try {
        console.log('formatDay', date);
		const day = date.getDate(); // Lấy ngày
		const month = date.getMonth() + 1; // Lấy tháng (cộng thêm 1 vì tháng bắt đầu từ 0)
        
		const formattedDay = day.toString().padStart(2, "0"); // Đảm bảo ngày có hai chữ số
		const formattedMonth = month.toString().padStart(2, "0"); // Đảm bảo tháng có hai chữ số

		const formattedDate = `${formattedDay}/${formattedMonth}`;
		return formattedDate; // In ra định dạng "02/06"
	} catch (error) {
		return false;
	}
};

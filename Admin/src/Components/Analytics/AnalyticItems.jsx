import { useEffect, useState } from "react";
import { getAnalyticItemByWeek, getAnalyticItemByMonth } from "../../API";
import { Table, DatePicker, Button } from "antd";
import moment from "moment";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { FileExcelOutlined } from "@ant-design/icons";

function AnalyticItems() {
  const [state, setState] = useState("weeks");
  const [totalPriceWeek, setTotalPriceWeek] = useState(0);
  const [totalPriceMonth, setTotalPriceMonth] = useState(0);

  const [startOfWeek, setStartOfWeek] = useState("");
  const [endtOfWeek, setEndOfWeek] = useState("");

  const [weeklyQuantity, setWeeklyQuantity] = useState([]);
  const [monthlyQuantity, setMonthlyQuantity] = useState([]);

  const [startMonth, setStartMonth] = useState("");
  const [startDay, setStartDay] = useState("");

  useEffect(() => {
    const currentWeekStart = moment().startOf("week");
    const currentMonthStart = moment().startOf("month");
    setStartDay(currentWeekStart.toDate());
    setStartMonth(currentMonthStart.format("YYYY-MM-DD"));
    getQuantityByWeek(currentWeekStart.toDate());
    getQuantityByMonth(currentMonthStart.format("YYYY-MM-DD"));
  }, []);

  const handleChangeSelect = (e) => {
    setState(e.target.value);
  };

  const getQuantityByWeek = async (startWeek) => {
    try {
      const res = await getAnalyticItemByWeek({ data: startWeek });
      setTotalPriceWeek(res.totalPrice);
      const data = Object.keys(res.quantityByWeek).map((key, index) => ({
        key: index,
        name: key,
        quantity: res.quantityByWeek[key].quantity,
        price: Intl.NumberFormat().format(
          res.quantityByWeek[key].price * res.quantityByWeek[key].quantity
        ),
      }));
      setWeeklyQuantity(data);
    } catch (error) {
      console.error("Error fetching weekly data:", error);
    }
  };
  const getQuantityByMonth = async (startMonth) => {
    try {
      const res = await getAnalyticItemByMonth({ data: startMonth });
      setTotalPriceMonth(res.totalPrice);
      const dataMonth = Object.keys(res.quantityByMonth).map((key, index) => ({
        key: index,
        name: key,
        quantity: res.quantityByMonth[key].quantity,
        price: Intl.NumberFormat().format(
          res.quantityByMonth[key].price * res.quantityByMonth[key].quantity
        ),
      }));
      setMonthlyQuantity(dataMonth);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  const handleChangeWeek = (date) => {
    const startOfWeek = date.startOf("week").format("DD-MM");
    const endOfWeek = date.endOf("week").format("DD-MM");
    setStartOfWeek(startOfWeek);
    setEndOfWeek(endOfWeek);
    const startDay = new Date(date.startOf("week"));
    getQuantityByWeek(startDay);
  };

  const handleChangeMonth = (date) => {
    const formattedDate = date.startOf("month").format("YYYY-MM-DD");
    setStartMonth(formattedDate);
    getQuantityByMonth(formattedDate);
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng bán",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
  ];
  const columns_month = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng bán",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
  ];

  const exportExcel = () => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Thống kê sản phẩm");

    const headerStyle = {
      font: { bold: true, name: "Arial", size: 12 },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "D9EAD3" } },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const dataStyle = {
      font: { name: "Arial", size: 12 },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "F4F4F4" } },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const titleStyle = {
      font: { bold: true, name: "Arial", size: 14 },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    ws.columns = [
      {
        header: "Sản phẩm",
        key: "name",
        width: 30,
      },
      { header: "Số lượng bán", key: "quantity", width: 20 },
      { header: "Tổng tiền", key: "price", width: 20 },
    ];

    const title =
      state === "weeks"
        ? `Thống kê từ ngày ${startOfWeek} đến ngày ${endtOfWeek}`
        : `Thống kê tháng ${moment(startMonth, "YYYY-MM-DD").format(
            "MM-YYYY"
          )}`;
    ws.mergeCells("A1:C2");
    ws.getCell("A1").value = title;
    ws.getCell("A1").style = titleStyle;
    ws.getCell("B1").style = titleStyle;
    ws.getCell("C1").style = titleStyle;

    ws.getRow(2).eachCell((cell) => {
      cell.style = headerStyle;
    });

    const data = state === "weeks" ? weeklyQuantity : monthlyQuantity;
    data.forEach((item) => {
      const row = ws.addRow({
        name: item.name,
        quantity: item.quantity,
        price: item.price.replace(/[^0-9]/g, ""),
      });

      row.eachCell((cell) => {
        cell.style = dataStyle;
      });
    });

    const fileName =
      state === "weeks"
        ? `Thống_kê_tuần_${startOfWeek}_đến_${endtOfWeek}.xlsx`
        : `Thống_kê_tháng_${moment(startMonth, "YYYY-MM-DD").format(
            "MM-YYYY"
          )}.xlsx`;

    wb.xlsx.writeBuffer().then((buff) => {
      const blob = new Blob([buff], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    });
  };
  return (
    <div className="analytics-container">
      <p className="analytics-title">Thống kê số lượng sản phẩm bán ra</p>
      <div className="analytics-select">
        <label htmlFor="option">Thống kê theo:</label>
        <select name="analyticBy" id="option" onChange={handleChangeSelect}>
          <option value="weeks">Theo tuần</option>
          <option value="months">Theo tháng</option>
        </select>
      </div>
      {state === "weeks" ? (
        <div className="analytics-weeks">
          <p className="analytics-title">(Theo tuần)</p>
          {startOfWeek && (
            <p style={{ textAlign: "center" }}>
              Từ ngày {startOfWeek} đến {endtOfWeek}
            </p>
          )}
          <DatePicker
            style={{ marginLeft: "70%", marginBottom: 20 }}
            onChange={handleChangeWeek}
            picker="week"
            placeholder="Chọn tuần"
          />
          <Button
            type="primary"
            onClick={exportExcel}
            icon={<FileExcelOutlined />}
            style={{
              backgroundColor: "#217346",
              borderColor: "#217346",
              color: "#fff",
            }}
          >
            Xuất Excel
          </Button>
          <Table
            pagination={false}
            showSorterTooltip={false}
            bordered
            dataSource={weeklyQuantity}
            columns={columns}
            style={{ width: "80%", margin: "0 auto" }}
          />
          <p style={{ marginLeft: 120 }}>
            Tổng doanh thu trong tuần:
            <strong style={{ marginLeft: 10, color: "green" }}>
              {Intl.NumberFormat().format(totalPriceWeek)}đ
            </strong>
          </p>
        </div>
      ) : (
        <div className="analytics-months">
          <p className="analytics-title">(Theo tháng)</p>
          <DatePicker
            style={{ marginLeft: "70%", marginBottom: 10 }}
            onChange={handleChangeMonth}
            picker="month"
            placeholder="Chọn tháng"
          />
          <Button
            type="primary"
            onClick={exportExcel}
            icon={<FileExcelOutlined />}
            style={{
              backgroundColor: "#217346",
              borderColor: "#217346",
              color: "#fff",
            }}
          >
            Xuất Excel
          </Button>
          <Table
            pagination={false}
            showSorterTooltip={false}
            bordered
            dataSource={monthlyQuantity}
            columns={columns_month}
            style={{ width: "80%", margin: "0 auto" }}
          />
          <p style={{ marginLeft: 120 }}>
            Tổng doanh thu trong tháng:
            <strong style={{ marginLeft: 10, color: "green" }}>
              {Intl.NumberFormat().format(totalPriceMonth)}đ
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default AnalyticItems;

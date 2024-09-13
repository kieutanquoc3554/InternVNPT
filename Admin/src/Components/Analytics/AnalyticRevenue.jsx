import { useEffect, useState } from "react";
import { getAnalyticByMonth, getAnalyticByWeek } from "../../API";
import "../../Pages/Analytics/Analytics.css";
import { Bar } from "react-chartjs-2";
import { Button, DatePicker } from "antd";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FileExcelOutlined } from "@ant-design/icons";

function AnalyticsRevenue() {
  const [state, setState] = useState("weeks");
  const [dates, setDates] = useState([]); //week
  const [revenues, setRevenues] = useState([]); //week

  const [months, setMonths] = useState([]); //month
  const [revenuesMonth, setRevenuesMonth] = useState([]); //month

  let startDay = "";

  const [startOfWeek, setStartOfWeek] = useState();
  const [endtOfWeek, setEndOfWeek] = useState();

  const getStartOfCurrentWeek = () => {
    const current = new Date();
    const startWeek = current.getDate() - current.getDay();
    startDay = new Date(current.setDate(startWeek));
  };

  const getRevenueByWeek = async (startWeek) => {
    const res = await getAnalyticByWeek({ data: startWeek });
    setDates(Object.keys(res.revenueByDay));
    setRevenues(Object.values(res.revenueByDay));
  };

  const getRevenueByMonth = async (startMonth) => {
    const res = await getAnalyticByMonth();
    setMonths(Object.keys(res.revenueByMonth));
    setRevenuesMonth(Object.values(res.revenueByMonth));
  };

  const data_week = {
    labels: dates,
    datasets: [
      {
        label: "Doanh thu trong tuần",
        data: revenues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options_week = {
    responsive: true,
  };
  const data_month = {
    labels: months,
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: revenuesMonth,
        backgroundColor: "rgba(100, 183, 255, 0.5)",
      },
    ],
  };
  const options_month = {
    responsive: true,
  };

  const handleChangeSelect = (e) => {
    setState(e.target.value);
  };

  const handleChangeWeek = (date, dateString) => {
    setStartOfWeek(date.startOf("week").format("DD-MM"));
    setEndOfWeek(date.endOf("week").format("DD-MM"));
    startDay = new Date(date.startOf("week"));
    getRevenueByWeek(startDay);
  };

  const exportExcel = () => {
    const book = new ExcelJS.Workbook();
    const sheet = book.addWorksheet("Doanh thu");
    const headers =
      state === "weeks" ? ["Ngày", "Doanh thu"] : ["Tháng", "Doanh thu"];
    const headerRow = sheet.addRow(headers);

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFB6D4FA" },
      };
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    if (state === "weeks") {
      dates.forEach((date, index) => {
        const row = sheet.addRow([date, revenues[index]]);
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });
      });
    } else {
      months.forEach((month, index) => {
        const row = sheet.addRow([month, revenuesMonth[index]]);
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });
      });
    }

    sheet.columns.forEach((c) => {
      c.width = 20;
    });

    const currentDate = new Date();
    const fileName =
      state === "weeks"
        ? `Doanh thu_Tuan_${startOfWeek.replace(
            "-",
            "_"
          )}_den_${endtOfWeek.replace("-", "_")}.xlsx`
        : `Doanh thu_Thang_${currentDate.getMonth() + 1}.xlsx`;

    book.xlsx.writeBuffer().then((b) => {
      const blob = new Blob([b], { type: "application/octet-stream" });
      saveAs(blob, fileName);
    });
  };

  useEffect(() => {
    getStartOfCurrentWeek();
    getRevenueByWeek(startDay);

    getRevenueByMonth();
  }, []);

  return (
    <>
      <div className="analytics-container">
        <p className="analytics-title">Thống kê doanh thu</p>
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
            <div style={{ display: "flex", gap: "10px" }}>
              <DatePicker
                style={{ marginLeft: "70%" }}
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
            </div>
            <div className="analytics-chart">
              <Bar data={data_week} options={options_week} />
            </div>
          </div>
        ) : (
          <div className="analytics-months">
            <p className="analytics-title">(Theo tháng)</p>
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
            <div className="analytics-chart">
              <Bar data={data_month} options={options_month} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AnalyticsRevenue;

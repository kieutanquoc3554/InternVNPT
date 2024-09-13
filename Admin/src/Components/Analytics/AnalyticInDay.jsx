import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { getAnalyticInDay } from "../../API";
import "../../Pages/Analytics/Analytics.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FileExcelOutlined } from "@ant-design/icons";
import moment from "moment";

function AnalyticInDay() {
  const [dataProduct, setDataProduct] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const current = new Date().toLocaleDateString("en-US");

  const getData = async () => {
    const res = await getAnalyticInDay();
    if (!res || !res.productQuantities) {
      throw new Error("Định dạng phản hồi không hợp lệ");
    }
    setTotalPrice(res.totalPrice);
    const data = Object.keys(res.productQuantities).map((key, index) => ({
      key: index,
      name: key,
      quantity: res.productQuantities[key].quantity,
      price: Intl.NumberFormat().format(
        res.productQuantities[key].price * res.productQuantities[key].quantity
      ),
    }));
    setDataProduct(data);
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

  const exportExcel = () => {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet("Doanh thu trong ngày");

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

    workSheet.columns = [
      { header: "Sản phẩm", key: "name", width: 30 },
      { header: "Số lượng bán", key: "quantity", width: 15 },
      { header: "Tổng tiền", key: "price", width: 20 },
    ];

    workSheet.getRow(1).eachCell((cell) => {
      cell.style = headerStyle;
    });
    dataProduct.forEach((item, index) => {
      const rowIndex = index + 2;
      workSheet.addRow(item);
      workSheet.getRow(rowIndex).eachCell((cell) => {
        cell.style = dataStyle;
      });
    });
    const totalRow = workSheet.addRow({
      name: "Tổng",
      quantity: "",
      price: Intl.NumberFormat().format(totalPrice),
    });
    totalRow.eachCell((cell) => {
      cell.style = headerStyle;
    });

    workBook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `Doanh thu_${current}.xlsx`);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="analytics-container">
      <div className="analytics-day">
        <div className="header">
          <div>
            <p className="analytics-title">
              Doanh thu trong ngày{" "}
              <span style={{ color: "#1677ff" }}>
                {moment(current).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>
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

        <Table
          pagination={false}
          showSorterTooltip={false}
          bordered
          dataSource={dataProduct}
          columns={columns}
        />
        <p>
          Tổng doanh thu trong ngày:
          <strong style={{ marginLeft: 10, color: "green" }}>
            {Intl.NumberFormat().format(totalPrice)}đ
          </strong>
        </p>
      </div>
    </div>
  );
}

export default AnalyticInDay;

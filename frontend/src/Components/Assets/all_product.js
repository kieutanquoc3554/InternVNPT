import p1_img from "../Assets/p1_img.jpg";
import p2_img from "../Assets/p2_img.jpg";
import p3_img from "../Assets/p3_img.jpg";
import p4_img from "../Assets/p4_img.jpg";
import p5_img from "../Assets/p5_img.jpg";
import p6_img from "../Assets/p6_img.jpg";
import p7_img from "../Assets/p7_img.jpg";
import p8_img from "../Assets/p8_img.jpg";
let all_product = [
  {
    id: 1,
    SP_TEN: "Cà phê đá",
    SP_MOTA: "",
    SP_LOAI: "coffee",
    SP_ANH: p1_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "30000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "35000",
      },
    ],
  },
  {
    id: 2,
    SP_TEN: "Cà phê sữa",
    SP_MOTA: "",
    SP_LOAI: "coffee",
    SP_ANH: p2_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "30000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "35000",
      },
    ],
  },
  {
    id: 3,
    SP_TEN: "Bạc xĩu",
    SP_MOTA: "",
    SP_LOAI: "coffee",
    SP_ANH: p3_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "30000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "35000",
      },
    ],
  },
  {
    id: 4,
    SP_TEN: "Lục trà Lài",
    SP_MOTA: "",
    SP_LOAI: "tea",
    SP_ANH: p4_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "32000",
      },
    ],
  },
  {
    id: 5,
    SP_TEN: "Trà Olong đỏ",
    SP_MOTA: "",
    SP_LOAI: "tea",
    SP_ANH: p5_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "32000",
      },
    ],
  },
  {
    id: 6,
    SP_TEN: "Hồng trà Đài Loan",
    SP_MOTA: "",
    SP_LOAI: "tea",
    SP_ANH: p6_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "32000",
      },
    ],
  },
  {
    id: 7,
    SP_TEN: "Trà lúa mạch dinh dưỡng Nhật Bản",
    SP_MOTA: "",
    SP_LOAI: "tea",
    SP_ANH: p7_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "32000",
      },
    ],
  },
  {
    id: 8,
    SP_TEN: "Trà hoàng kim",
    SP_MOTA: "",
    SP_LOAI: "tea",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "32000",
      },
    ],
  },
  {
    id: 9,
    SP_TEN: "Trà sữa Olong",
    SP_MOTA: "",
    SP_LOAI: "milktea",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 10,
    SP_TEN: "Hồng trà sữa",
    SP_MOTA: "",
    SP_LOAI: "milktea",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 11,
    SP_TEN: "Trà sữa Olong vị đường nướng",
    SP_MOTA: "",
    SP_LOAI: "milktea",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 12,
    SP_TEN: "Trà sữa lúa mạch",
    SP_MOTA: "",
    SP_LOAI: "milktea",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 13,
    SP_TEN: "Sữa chua Đào",
    SP_MOTA: "",
    SP_LOAI: "yogurt",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 14,
    SP_TEN: "Sữa chua Dâu",
    SP_MOTA: "",
    SP_LOAI: "yogurt",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 15,
    SP_TEN: "Sữa chua Hạt đác",
    SP_MOTA: "",
    SP_LOAI: "yogurt",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 16,
    SP_TEN: "Sữa chua Xoài",
    SP_MOTA: "",
    SP_LOAI: "yogurt",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 17,
    SP_TEN: "Sữa chua Thanh Long",
    SP_MOTA: "",
    SP_LOAI: "yogurt",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 18,
    SP_TEN: "Sữa tươi kem trứng nướng",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: p8_img,
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "35000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 19,
    SP_TEN: "Sữa tươi trân châu đường đen",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 20,
    SP_TEN: "Latte Coffee Matcha vị Vani",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 21,
    SP_TEN: "Latte Matcha vị Bạc Hà",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 22,
    SP_TEN: "Latte Socola vị Bạc Hà",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 23,
    SP_TEN: "Latte Caramel vị Vani",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 24,
    SP_TEN: "Latte Matcha Dâu",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 25,
    SP_TEN: "Latte Matcha Xoài",
    SP_MOTA: "",
    SP_LOAI: "latte",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 26,
    SP_TEN: "Lục trà/Olong vải",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 27,
    SP_TEN: "Lục trà/Olong Đào",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 28,
    SP_TEN: "Lục trà/Olong Dâu",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 29,
    SP_TEN: "Lục trà/Olong Xoài",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 30,
    SP_TEN: "Lục trà Thanh Long + Vải",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 31,
    SP_TEN: "Lục trà Thanh Long + Dâu",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 32,
    SP_TEN: "Lục trà Dứa - Hồng hạc",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 33,
    SP_TEN: "Trà Olong Dứa - Xoài",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 34,
    SP_TEN: "Trà Olong Xoài - Chanh Leo",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 35,
    SP_TEN: "Lục trà Ổi Hồng",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 36,
    SP_TEN: "Lục trà Dâu - Ổi hồng",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 37,
    SP_TEN: "Lục trà Ổi - Chanh Leo",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 38,
    SP_TEN: "Trà hoa cúc Ổi Hồng",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 39,
    SP_TEN: "Trà Hoa cúc Lệ chi Mật ong",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 40,
    SP_TEN: "Hồng trà Kim quất",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 41,
    SP_TEN: "Trà Mãng cầu",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
  {
    id: 42,
    SP_TEN: "Trà Trái cây nhiệt đới",
    SP_MOTA: "",
    SP_LOAI: "fruit",
    SP_ANH: "",
    CHITIETSANPHAM: [
      {
        KC_ID: "1",
        KC_TEN: "M",
        KC_DUNGTICH: "500 ML",
        CTSP_GIA: "36000",
      },
      {
        KC_ID: "2",
        KC_TEN: "L",
        KC_DUNGTICH: "700 ML",
        CTSP_GIA: "39000",
      },
    ],
  },
];

export default all_product;

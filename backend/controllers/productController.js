const product = require("../models/product");

const addProduct = async (req, res) => {
  const { name, desp, category, image, details } = req.body;
  try {
    const existedProduct = await product.findOne({ SP_TEN: name });
    if (existedProduct) {
      res.status(500).send("Đã tồn tại sản phẩm");
    } else {
      const newProduct = new product({
        SP_TEN: name,
        SP_MOTA: desp,
        SP_LOAI: category,
        SP_ANH: image,
        CHITIETSANPHAM: details,
      });
      await newProduct.save();
      res.status(200).send("Thêm thành công");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req, res) => {
  const productData = await product.find().populate("CHITIETSANPHAM.KC_ID");
  res.status(200).json(productData);
};

const findProductByName = async (req, res) => {
  const { SP_TEN } = req.body;
  try {
    const productData = await product.findOne({ SP_TEN });
    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const generateCommonMistakes = (productName) => {
  let mistakes = [];
  const commonMistakes = {
    "Cà phê": ["cafe", "ca phe", "caphe"],
    Sữa: ["sua", "sua"],
    Đá: ["da", "da"],
    Nóng: ["nong", "nong"],
    Trà: ["tra", "tra"],
    Lài: ["lai", "lai"],
    Olong: ["olong", "oolong"],
    xỉu: ["xiu", "siu", "xiu"],
  };

  productName.split(" ").forEach((word) => {
    if (commonMistakes[word]) {
      mistakes = mistakes.concat(commonMistakes[word]);
    } else {
      mistakes.push(word);
    }
  });

  return mistakes;
};

const generateAbbreviations = (productName) => {
  const words = productName.split(" ");
  const abbreviation = words.map((word) => word[0].toUpperCase()).join("");
  const altAbbreviation = words.map((word) => word[0].toLowerCase()).join("");
  const lowerCase = productName.toLowerCase();
  const upperCase = productName.toUpperCase();
  const titleCase = words
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const reverseOrder = words.slice().reverse().join(" ");
  const hyphenated = words.join("-");
  const underscored = words.join("_");
  const noSpace = productName.replace(/\s+/g, "");
  const commonAbbreviations = {
    "Cà phê": "cf",
    Trà: "tra",
    Sữa: "sua",
    Đá: "da",
    Nóng: "nong",
  };

  const customAbbreviations = words
    .map((word) => commonAbbreviations[word] || word)
    .join(" ");
  const noTones = removeVietnameseTones(productName);
  const commonMistakes = generateCommonMistakes(productName).join(" ");
  const keywordSet = new Set([
    abbreviation,
    altAbbreviation,
    lowerCase,
    upperCase,
    titleCase,
    reverseOrder,
    hyphenated,
    underscored,
    noSpace,
    customAbbreviations,
    noTones,
    commonMistakes,
    productName,
  ]);

  return Array.from(keywordSet);
};

const updateKeyword = async (req, res) => {
  const { SP_TEN } = req.body;
  if (!SP_TEN) {
    return res.status(404).send("SP_TEN is required");
  }
  try {
    const products = await product.find({ SP_TEN });
    if (!products.length) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }
    const keywords = generateAbbreviations(SP_TEN).map((keyword) => ({
      KW_TEN: keyword,
    }));
    await Promise.all(
      products.map((product) => {
        product.SP_KEYWORD = keywords;
        return product.save();
      })
    );
    res.json({ message: "Keywords updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating keywords" });
  }
};

const categoryProduct = [
  "coffee",
  "tea",
  "latte",
  "fruit",
  "milktea",
  "yogurt",
];

const returnCategory = (req, res) => {
  return res.status(200).json(categoryProduct);
};

module.exports = {
  addProduct,
  getAllProducts,
  findProductByName,
  updateKeyword,
  returnCategory,
};

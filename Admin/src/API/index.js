export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
export const getAnalyticInDay = async () => {
  return await fetch("http://localhost:4000/orders/analysis/analytic-day").then(
    (res) => res.json()
  );
};
export const getAnalyticByWeek = (data) => {
  return fetch("http://localhost:4000/orders/analysic/analytic/week", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
export const getAnalyticByMonth = (data) => {
  return fetch(
    "http://localhost:4000/orders/analysic/month/analytic-month"
  ).then((res) => res.json(data));
};
export const getAnalyticItemByWeek = (data) => {
  return fetch("http://localhost:4000/orders/item/analytic-items-week", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
export const getAnalyticItemByMonth = (data) => {
  return fetch("http://localhost:4000/orders/item/month/analytic-items-month", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
export const loginAdmin = async (data) => {
  console.log("loginAdmin", data);
  return await fetch("http://localhost:4000/users/login-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

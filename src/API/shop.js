import axios from "axios";

export default {
  getProducts: () => axios.get("http://localhost:8000/products.json"),
  buyProducts: payload => new Promise((resolve, reject) => resolve(payload)) //只是为了模拟axios.post的效果
};


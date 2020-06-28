import axios from "axios";



export default {
  getProducts: () => axios.get("./product/products.json"),
  buyProducts: payload => new Promise((resolve, reject) => resolve(payload)) //只是为了模拟axios.post的效果
};


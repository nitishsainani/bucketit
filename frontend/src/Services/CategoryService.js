import { BASE_URL } from "./Constants";
import AuthService from "./AuthService";
import axios from "axios";


class CategoryService {
  static async getCategories() {
    let res = await axios.get(
      BASE_URL + 'category',
      {
        params: {limit: 100}
      }
    );
    return res.data;
  }
}

export default CategoryService;

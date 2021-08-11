import { BASE_URL } from "./Constants";
import axios from "axios";
import AuthService from "./AuthService";


class ProductService {
  static async queryProducts(recent, categories, page, limit) {
    let params = {};
    params.sortBy = recent ? 'createdAt:desc' : 'upvoteCount:desc';
    params.page = page;
    params.limit = limit;

    let res = await axios.get(
      BASE_URL + 'product',
      {
        params: params
      }
    );
    return res.data;
  }

  static async getProduct(productId) {
    let res = axios.get(
      BASE_URL + 'product/' + productId,
      {
        headers: await AuthService.getAuthorizationHeader(),
      }
    )
    return res.data;
  }

  static async postProduct(categories, title, tagline, description, logo, website, appLink) {
    let res = axios.post(
      BASE_URL + 'product/',
      {categories, title, tagline, description, logo, website, appLink},
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }

  static async editProduct(productId, categories, title, tagline, description, logo, website, appLink) {
    let res = axios.patch(
      BASE_URL + 'product/' + productId,
      {categories, title, tagline, description, logo, website, appLink},
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }

  static async deleteProduct(productId) {
    let res = axios.delete(
      BASE_URL + 'product/' + productId,
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }
}

export default ProductService;

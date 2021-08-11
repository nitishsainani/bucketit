import { BASE_URL } from "./Constants";
import axios from "axios";
import AuthService from "./AuthService";


class UpvoteService {
  // static async getProductUpvotes(productId, page, limit) {
  //   let res = await axios.get(
  //     BASE_URL + 'product/' + productId + '/upvote/',
  //     {
  //       headers: await AuthService.getAuthorizationHeader(),
  //       params: {page, limit}
  //     }
  //   );
  //   return res.data;
  // }

  static async postUpvote(productId) {
    let res = axios.post(
      BASE_URL + 'product/' + productId + '/upvote/',
      {},
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }


  static async deleteUpvote(productId) {
    let res = axios.delete(
      BASE_URL + 'product/' + productId + '/upvote/',
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }
}

export default UpvoteService;

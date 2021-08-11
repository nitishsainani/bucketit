import { BASE_URL } from "./Constants";
import axios from "axios";
import AuthService from "./AuthService";


class CommentService {
  static async getProductComments(productId, page, limit) {
    let res = await axios.get(
      BASE_URL + 'product/' + productId + '/comment/',
      {
        headers: await AuthService.getAuthorizationHeader(),
        params: {page, limit}
      }
    );
    return res.data;
  }

  static async postComment(productId, text) {
    let res = axios.post(
      BASE_URL + 'product/' + productId + '/comment/',
      {text},
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }

  static async editComment(productId, commentId, text) {
    let res = axios.patch(
      BASE_URL + 'product/' + productId + '/comment/' + commentId,
      {text},
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }

  static async deleteComment(productId, commentId) {
    let res = axios.delete(
      BASE_URL + 'product/' + productId + '/comment/' + commentId,
      {headers: await AuthService.getAuthorizationHeader()}
    )
    return res.data;
  }
}

export default CommentService;

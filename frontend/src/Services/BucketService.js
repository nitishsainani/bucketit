import { BASE_URL } from "./Constants";
import axios from "axios";
import AuthService from "./AuthService";


class BucketService {
  static async getUserBuckets(page, limit) {
    let res = await axios.get(
      BASE_URL + '/bucket/',
      {
        headers: await AuthService.getAuthorizationHeader(),
        params: {page, limit}
      }
    );
    return res.data;
  }

  static async postBucket(productId) {
    let res = axios.post(
      BASE_URL + '/bucket/',
      {},
      {headers: await AuthService.getAuthorizationHeader(), params: {productId}}
    )
    return res.data;
  }

  static async deleteBucket(productId, bucketId) {
    let res = axios.delete(
      BASE_URL + '/bucket/',
      {headers: await AuthService.getAuthorizationHeader(), params: {productId}}
    )
    return res.data;
  }
}

export default BucketService;

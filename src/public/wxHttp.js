import wepy from 'wepy'
import { HOST, PRO_HOST, MOCK_HOST } from './conf'
const plugin = requirePlugin("loginPlugin")
const wx = wepy

class WxHttp {
  static async request (method = 'GET', url, data = {}, config) {
    const host = config && config.product ? PRO_HOST : HOST
    const URL = host + url
    const param = {
      url: URL,
      method: method,
      data: data,
      header: {
        'Cookie': `pt_key=${plugin.getStorageSync('jdlogin_pt_key')}`,
        'Authorization': 'token 53a91df5-dfc2-45fc-ba3b-a3871db9d0c1'
      }
    };
    const res = await wx.request(param);
    if (this.isSuccess(res)) {
      return res.data;
    } else {
      console.error(method, url, data, res);
      throw this.requestException(res);
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }
    const wxData = res.data;
    return (wxData && wxData.code !== 0);
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const serverData = wxData.data;
    if (serverData) {
      error.serverCode = wxData.code;
      error.message = serverData.message;
      error.serverData = serverData;
    }
    return error;
  }

  static get (url, data, config) {
    return this.request('GET', url, data, config)
  }

  static put (url, data, config) {
    return this.request('PUT', url, data, config)
  }

  static post (url, data, config) {
    return this.request('POST', url, data, config)
  }

  static patch (url, data, config) {
    return this.request('PATCH', url, data, config)
  }

  static delete (url, data, config) {
    return this.request('DELETE', url, data, config)
  }
}

export { WxHttp }
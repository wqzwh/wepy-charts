import { WxHttp } from '@/public/wxHttp'
import { config } from './loginConfig.js'
const plugin = requirePlugin("loginPlugin")

const goBack = () => {
  let params = plugin.getLoginParams(),
    { returnPage, pageType } = params;
  if(!returnPage){
    console.log('没有returnPage,无法跳转')
    return
  }
  switch (pageType) {
    case 'switchTab':
      wx.switchTab({
        url: returnPage
      })
      break
    case 'h5':
      redirectToH5({ page: returnPage })
      break 
    case 'reLaunch':
      wx.reLaunch({ url: returnPage })
      break
    default:
      redirectPage(returnPage)
  }
}

const redirectPage = (url) => {
  wx.redirectTo({
    url
  });
}

const redirectToH5 = ({ page, wvroute }) => {
  let url = plugin.formH5Url({ page: decodeURIComponent(page), wvroute })
  redirectPage(url)
}

const handleComponentRedirect = (params={}) => {
  let { url, isNavigateTo } = params;
  if (url) {
    if (!isNavigateTo){
      redirectPage(url);
      return
    }
    wx.navigateTo({url})
  } else {
    goBack();
  }
}

const setLoginParamsStorage = (obj) => {
  let loginParams = config;
  if (plugin.isObject(obj)) {
    loginParams = { ...config, ...obj }
  } else {
    console.log('登录参数必须为对象')
  }
  plugin.setLoginStorageSync(loginParams);
}

/**
 *
 * url 登陆成功后返回的页面
 * pageType 返回页面的跳转形式 switchTab，reLaunch，redirectTo，redirectToH5（h5暂时用不到）
 * 
 * 返回true 则代表已经登陆
 * 返回false  跳转登陆页面
 *
*/
const toLogin = (pageurl, pageType) => {
  return new Promise((resolve, reject) => {
    checkPtKey().then((res) => {
      if(!res) {
        if (pageType) {
          wx.navigateTo({ url: `/pages/login/index/index?returnPage=${pageurl}&pageType=${pageType}` })
        } else {
          wx.navigateTo({ url: `/pages/login/index/index?returnPage=${pageurl}` })
        }
      }
      resolve(res)
    },(error) => {
      reject(error)
    })
  })
}

/**
 *
 * 判断登陆是否有效
 * 返回true则有效，替换本地存储的UserId和JdPin
 * 反之则无效
 *
*/
const checkPtKey = () => {
  const ptKey = plugin.getStorageSync('jdlogin_pt_key')
  return new Promise((resolve, reject) => {
    if(ptKey) {
        WxHttp.post('/login/check').then((res) => {
          if(!res.data) resolve(false)
          const data = res.data
          wx.setStorageSync('storePin', data.pin)
          wx.setStorageSync('storeTabBar', data.menuPermissions)
          resolve(true)
        }, (error) => {
          reject(error)
        })
    } else {
      resolve(false)
    }
  })
}

/** 
 * 
 * 退出登陆方法
 * 
*/
const loginOut = () => {
  const cf = Object.assign({}, config)
  cf.isLogout = 'loginOut'
  plugin.logout(cf)
}

export default {
  goBack,
  redirectToH5,
  handleComponentRedirect,
  redirectPage,
  setLoginParamsStorage,
  toLogin,
  checkPtKey,
  loginOut
}

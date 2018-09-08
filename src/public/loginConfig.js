export let config = {
  wxversion: 'wxc85eb92066ddc4a5',
  appid: 658,
  returnPage: undefined,
  pageType: undefined,
  isLogout: undefined,
  noWXinfo: 1,
  h5path: undefined,
  logoPath: undefined,
  isTest: undefined,  //预发接口，改为undefined 调用线上接口
  isKepler:undefined
}
/*
  wxversion   必传，小程序开发的appid
  appid       必传，接入登录申请的appid,如269
  returnPage  必传，登录成功回退页面
  pageType    选传，登录成功回退页面的页面类型
  isLogout    选传，传人任何值都表示退出后重新登录
  tabNum      选传，控制手机号登录和帐号密码登录，默认不传即手机号登录，1 显示一个tab 2 显示两个tab
  currentTab  选传，当前选中的tab,如传tabNum则需传该值，不传默认手机号。'idTab'帐号密码， 'mobileTab'手机号
  noWXinfo    选传，传入任何值都将不获取微信用户信息，即分流页点登录直接进入登录页
  h5path      选传，打开H5页面所需web-view所在文件路径，默认路径 /pages/login/web-view/web-view。如路径改变需传此值，不变不要传
  logoPath    自定义logo，默认京东狗，默认尺寸 318* 390 像素。需为线上地址。如：https://m.360buyimg.com/mobilecms/s1280x624_jfs/t23335/340/832672210/168787/ab0b8220/5b448c0aNb6ccca54.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp
*/
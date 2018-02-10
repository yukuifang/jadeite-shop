const app = getApp()
var MD5 = require('./md5.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const priceChange=price=>{
  
  if(price>10000)
   {
    return price / 10000 + "万"
   }
   return price;

}
function getDownloadUrl(){
  wx.showModal({
    title: '提示',
    content: '请点击下方复制链接，前往浏览器打开链接下载APP，或在公众号菜单栏直接下载APP ',
    confirmText: '复制链接',
    success: function (res) {
      if (res.confirm) {
        try {
    var res = wx.getSystemInfoSync()
    console.log(res.pixelRatio)
    var downloadUrl =""
    if (res.platform == "ios")
    {
      downloadUrl = "https://itunes.apple.com/cn/app/%E7%BF%A1%E7%BF%A0%E8%B4%A7%E6%BA%90/id1258425995?mt=8"
    }else
    {
      downloadUrl = "http://shouji.baidu.com/software/22919744.html"
    }
    wx.setClipboardData({
      data: downloadUrl,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 500
        })
      }
    })
  } catch (e) {
  }
        console.log('用户点击确定')
      }
    }
  })
}
// 拨打电话
function callPhone(phone)
{
  wx.makePhoneCall({
    phoneNumber: phone 
  })
}
function ToastSuccess(text){
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 500
  })
}
function MessageToast(text)
{
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000
  })
}
// 检测是否绑定用户
function checkBindStatus(){
  console.log("checkBindStatus")
  console.log(app.globalData.login)
  if (app.globalData.login.accessToken)
  {
    return true;
  }
  wx.navigateTo({
    url: '../login/login',
  })
  return false;
}
// 检查是否绑定用户 不自动体搜转登录界面
function checkLanding(){
  if (app.globalData.login.accessToken) {
    return true;
  }
  return false;
}
// md5加密
function md5(str)
{
  return MD5.hex_md5(str)
}
// 在线客服
function linePhone(){
  return app.globalData.csPhone

}
module.exports = {

 formatTime: formatTime,
  priceChange: priceChange,
  getDownloadUrl: getDownloadUrl,
  callPhone: callPhone,
  ToastSuccess: ToastSuccess,
  checkBindStatus: checkBindStatus,
  checkLanding:checkLanding,
  MessageToast: MessageToast,
  md5: md5,
  linePhone: linePhone

}

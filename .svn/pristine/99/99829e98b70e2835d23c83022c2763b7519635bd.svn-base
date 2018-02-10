const app = getApp()
var util = require('./util.js');
//get请求
function RequestGet(url,params,callBack,failueBack,hidenToast){
  var URL = app.globalData.urlBase + url;
  if(!hidenToast)
  {
    console.log(url)
    console.log("hiden++++++++++++++++++")
    wx.showLoading({
      title: '加载中',
    })
  }
  var that = this;
  wx.request({
    url: URL,
    data:paramsHandle(params),
    method: 'GET', 
    header: setHeader(), 
    success: function (res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(res)
      resulHandle(res, callBack)
    },
    fail: function (res) {
      wx.hideLoading()
      if (failueBack)
      {
        failueBack(res)
      }
      console.log("failure==================")
      console.log(res);

    },
    complete: function (res) {
      console.log("complete=========")
      console.log(res)
     
    }
  })
}

// post请求
function RequestPost(url, params, callBack, failueBack,hidenToast) {
  console.log("ni")
  var URL = app.globalData.urlBase + url;
  if (!hidenToast) {
    console.log(url)
    console.log("hiden++++++++++++++++++")
    wx.showLoading({
      title: '加载中',
    })
  }
  wx.request({
    url: URL,
    data: paramsHandle(params),
    method: 'POST',
    header: setHeader(),
    success: function (res) {
      wx.hideLoading()
      console.log(res)
      wx.stopPullDownRefresh()
      // success
      resulHandle(res, callBack,failueBack)

    },
    fail: function (res) {
      wx.hideLoading()
      console.log("failure")
      if (failueBack)
      {
        console.log("failureHandle")
        failueBack(res)
      }
      console.log(res);

    },
    complete: function (res) {
      
    }
  })
}
// 请求参数处理
function paramsHandle(params){
 
  return params
  
}
//请求头配置
function setHeader(){
  var header={
    "content-type": "application/x-www-form-urlencoded"
  }
  if (app.globalData.login.accessToken)
  {
    header.mobile = app.globalData.login.userName
    header.accessToken = app.globalData.login.accessToken
    header.uid = app.globalData.login.uid
    header.platform = 1
  }
  console.log(header)
  return header
}
// 请求结果处理
function resulHandle(result, callBack, failueBack)
{
  if(result.data.code == 10000 )
  {
    if (callBack)
    {
      callBack(result.data.object)
    }
  } else if (result.data.code == 20018)//AccessToken 不合法
  {
    if (!app.globalData.accessTokenlegal)
    {
      return
    }
    app.globalData.accessTokenlegal = false
    wx.login({
      success: res => {
        app.globalData.login.code = res.code
        app.globalData.login.accessToken = null
        wx.setStorage({
          key: "login",
          data: app.globalData.login
        })
        wx.navigateTo({
          url: '../login/login',
          success:function(){
            app.globalData.accessTokenlegal = true
          }
        })

      }
    })
  }else
  {
    if (failueBack)
    {
      failueBack(result)
    }
    if (result.data.message)
    {
      util.MessageToast(result.data.message)
    }
  }
}
module.exports = {
  RequestGet: RequestGet,
  RequestPost: RequestPost
}

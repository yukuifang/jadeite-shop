//app.js
App({
  
  onLaunch: function () {
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var _this = this;
    // 获取登录信息
    this.getLocalLogin()
    // 微信登录
   this.login()
   this.checkUseInfo()
  },
  checkUseInfo: function () {
    var _this = this
    console.log("checkUseInfo=============")
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("checkUseInfo=============1")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          _this.getUserInfo();
        }
        else {
          console.log("checkUseInfo=============2")
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log("checkUseInfo=============3")
              _this.getUserInfo();
            }
          })
        }
      }
    })

  },
  getUserInfo:function(){
    console.log(">>>>>")
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        // if (this.userInfoReadyCallback) {
        //   this.userInfoReadyCallback(res)
        // }
      }
    })

  },
  // 获取登录信息
    getLocalLogin:function(){
      try {
        var login = wx.getStorageSync('login')
        console.log(">>>>><<<<<<<<<<<")
        console.log(login)
        if (login) {
          console.log(">>>>>123<<<<<<<<<<<")
          this.globalData.login = login
        }
      } catch (e) {
      }
  },
  // 微信登录 
  login:function(){
    var _this = this
    wx.checkSession({
      success: function () {
        console.log("code合法")
       
      },
      fail: function () {
         // 登录
    wx.login({
      success: res => {
        _this.globalData.login.code = res.code
        _this.updateAccessToken()
       
      }
    })
      }
    })
  },
  // 更新AccessToken
  updateAccessToken:function(){
    if (this.globalData.login.accessToken){//存在说明已登录
       var _this = this;
      var params = {
        userName: this.globalData.login.userName,
        wxCode: this.globalData.login.code
      }
      wx.request({
        url: this.globalData.urlBase +'passport/updateAccessToken.do',
        data:params ,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("++++++++++++===========")
          console.log(res)
          _this.globalData.login.accessToken = res.accessToken
          wx.setStorage({
            key: "login",
            data: _this.globalData.login
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    accessTokenlegal:true,//防止accessToken不合法被重复刷新
    csPhone:"",//客服电话
    login:{
      accessToken:null,
      code:null
    },
    //请求Base地址
    urlBase : "https://wechat.goucui.vip/fchy/"
// urlBase : "https://test.wb.goucui.vip/fchy/"
  }
})
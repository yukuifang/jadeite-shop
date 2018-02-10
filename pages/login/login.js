var util = require('../../utils/util.js');
var RequestManager = require('../../utils/RequestHelper.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    passWord:"",
    mobileCode:"",
    showMask:false,
    times:60,
    canGetIdentify:true,
    getText:"获取",
    timer:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCode();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.accessTokenlegal = true
    clearInterval(this.data.timer)
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  // 清除手机号码
  clearPhone:function(){
    console.log(this.data.phone)
    this.setData({
      phone:""
    })
  },
  // 获取手机号码
  getPhone:function(event)
  {
    this.setData({
      phone: event.detail.value
    })
    console.log(this.data.phone)
  },
  getPassWord:function(event){
    this.setData({
      passWord: event.detail.value
    })
  },
  //获取验证码
  getMobileCode:function(event){
    this.setData({
      mobileCode: event.detail.value
    })
  },
  // 发送验证码
  sendMobileCode:function(){
    if(this.data.phone.length<=0)
    {
      util.MessageToast("请输入手机号码")
      return 
    }
    if (!this.data.canGetIdentify) {
      return
    }
    var _this = this;
    var params = {
      mobileNum:this.data.phone,
      type:4
    }
    RequestManager.RequestPost('user/mobileCode.do', params, function (res) {
      util.ToastSuccess("验证码已成功发送")
      _this.countdown();
      _this.setData({
        canGetIdentify: false,
        getText:"60s",
        times:60
      })
      console.log(res)
    })

  }, 
  // 登录按钮点击事件
  sureClick:function(){
    if (this.data.passWord.length <= 0) {
      util.MessageToast("请输入登录密码")
      return
    }
    this.land()
  },
  // 登录按钮点击事件
  land: function () {
    var _this = this
    var params = {
      veriCode: this.data.mobileCode,
      wxCode: app.globalData.login.code,
      userName: this.data.phone,
      password: util.md5(this.data.passWord)
    }
    RequestManager.RequestPost('user/userLoginWxMini.do', params, function (res) {
      // app.globalData.login
      console.log(res)
      app.globalData.login.accessToken = res.accessToken
      app.globalData.login.userName = res.userName
      app.globalData.login.uid = res.id
      wx.setStorage({
        key: "login",
        data: app.globalData.login
      })
      wx.navigateBack({
        delta: 1
      })
    },function(res){
      _this.getCode()
    })
  },
  prevented:function(){

  },
  hidenMask:function(event){
    this.setData({
      showMask:false
    })
  },
  // 检测是否为新用户
  newUserOrNot:function(){
    if (this.data.phone.length <= 0) {
      util.MessageToast("请输入手机号码")
      return
    }
    if (this.data.mobileCode.length <= 0) {
      util.MessageToast("请输入短信验证码")
      return
    }
    var _this = this 
    var params = {
      userName: this.data.phone
    }
    RequestManager.RequestPost('user/newUserOrNot.do', params, function (res) {
      if(res)
      {
        _this.setData({
          showMask: true
        })
      }else
      {
        _this.land()
      }
    })
  },
  
  // 倒计时
  countdown:function(){
    var _this = this
    var timers = setInterval(function () {
      _this.setData({
        times: _this.data.times-1,
        timer:timers
      })
      if (_this.data.times == 0)
      {
        _this.setData({
          canGetIdentify:true,
          getText:"获取"
        })
        clearInterval(timers)
      }else
      {
        _this.setData({
          getText: _this.data.times+"s"
        })
      }
      
    }, 1000);
    
  },
  // 重新获取code
  getCode:function(){
    wx.login({
      success: res => {
        app.globalData.login.code = res.code
        app.globalData.login.accessToken = null
        wx.setStorage({
          key: "login",
          data: app.globalData.login
        })
      }
    })
  }

})
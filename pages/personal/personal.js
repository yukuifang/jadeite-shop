var common = require('../../utils/common.js');
var util = require('../../utils/util.js');
var RequestManager = require('../../utils/RequestHelper.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    messgeInfo: {},
    orderWaitReadData:{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getUserInfo();
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
    if (util.checkLanding()) {
      this.getRedDot();
      this.orderWaitRead();
    }
    
    
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
  //获取用户信息
  getUserInfo:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }

  },
  // 去订单列表
  checkOrderList:function(event){
    if (!util.checkBindStatus()) {
      return
    }
    // type 0 全部 1 待付款 2 待发货 3 待收货 4 交易成功 5 退货
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../orderList/orderList?type='+type
    })
  },
  // 列表被点击
  listItemCliclk:function(event){
    // index 0 收货地址 1 客服热线 2  在线客服 3 使用帮助 4 关于我们
    var index = event.currentTarget.dataset.index;
    var _this = this;
    if(index == 0)
    {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.address']) {
            _this.goAddress();
          }
          else {
            wx.authorize({
              scope: 'scope.address',
              success() {
                _this.goAddress();
              }
            })
          }

        }
      })
    }else if(index == 1)
    {
      util.callPhone(util.linePhone())
    }else if(index == 3 || index == 4)
    {
      wx.navigateTo({ 
        url: '../webView/webView?type=' + (index - 2)
      })
    }
  },
  goAddress:function(){
    var _this = this 
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          name: res.userName,
          phone: res.telNumber,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo
        }
        wx.setStorage({
          key: "defaultAddress",
          data: addressInfo
        })
        
      }
    })
  },
  // 查看消息列表
  checkInforList: function () {
    if (!util.checkBindStatus()) {
      return
    }
    wx.navigateTo({
      url: '../informationList/informationList',
    })
  },
  // 获取小红点
  getRedDot: function () {
    var _this = this;
    common.getRedDot(function (res) {
      _this.setData({
        messgeInfo: res
      })

    })
  },
  // 获取订单各状态未读数
  orderWaitRead:function(){
    var _this = this;
    RequestManager.RequestPost('api/order/orderWaitRead.do', null, function (res) {
      console.log('orderWaitRead======');
      console.log(res);
      _this.setData({
        orderWaitReadData:res
      })
    },null,true)

  }

})
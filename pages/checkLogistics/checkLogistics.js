var util = require('../../utils/util.js');
var RequestManager = require('../../utils/RequestHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    deliveryInfo:{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
    })
    this.logisticsList()
    
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
  // 复制按钮点击事件
  copyClick:function(){
    wx.setClipboardData({
      data: this.data.deliveryInfo.deliveryNo,
      success: function (res) {
        wx.showToast({
          title: '物流单号复制成功',
          icon: 'success',
          duration: 500
        })
      }
    })
  },
  //获取物流信息
logisticsList:function(){
  var params = {
    orderId: this.data.orderId
  }
  var _this = this
  RequestManager.RequestGet('api/order/deliveryInfo.do', params, function (res) {
    console.log(res)
    _this.setData({
      deliveryInfo:res
    })
   })
  }
})
var RequestManager = require('../../utils/RequestHelper.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    goodsData:{},
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScrollHeight();
    this.setData({
      goodsData:JSON.parse(options.goodsData)

    })
    console.log(this.data.goodsData)
    
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
  //获取scroll-view的高度
  getScrollHeight: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scrollHeight: res.windowHeight - 70

        })
      }
    })
  },
  // 去商品详情页
  goGoodsDetail: function () {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + this.data.goodsData.goodsId
    })
  },
  // 立即购买
  confirmationOrder:function(){
    wx.navigateTo({
      url: '../confirmationOrder/confirmationOrder?goodsData='+JSON.stringify(this.data.goodsData),
    })
  },
  // 播放视屏
  viedoPlay:function(event){
    if (event.currentTarget.dataset.index == 0 && this.data.goodsData.goodsVideoPath.length>0)
    {
      wx.navigateTo({
        url: '../videoPlay/videoPlay?goodsVideoPath=' + this.data.goodsData.goodsVideoPath,
      })
    }

  },
  // 购翠宝服务介绍
  serviceIntroduce: function () {
    wx.navigateTo({
      url: '../webView/webView?type=3'
    })
  },
})

















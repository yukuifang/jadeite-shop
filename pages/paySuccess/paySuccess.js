var RequestManager = require('../../utils/RequestHelper.js');
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:"",
    orderId:"",
    goodsList: [],
    showResaleMask:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsId: options.goodsId,
      orderId: options.orderId
     
    })
    this.getListData()
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
  // 查看订单详情
  checkOrder:function(){
    wx.redirectTo({
      url: '../orderDetail/orderDetail?orderId='+this.data.orderId,
    })
  },
  // 列表数据
  checkInforList: function () {
    wx.navigateTo({
      url: '../informationList/informationList',
    })
  },
  // 转售按钮点击事件
  reSale: function () {
    this.setData({
      showResaleMask:true
    })
  },
  getListData: function () {
    var params = {
      goodsId:this.data.goodsId,
    }
    var _this = this;
    RequestManager.RequestGet('api/goods/likeGoods.do', params, function (res) {
      _this.setData({
        goodsList: res,
      });
    })
  },
  // 收藏按钮点击
  collectionSelect: function (event) {
    var _this = this
    common.collectGoods(this.data.goodsList, event.currentTarget.dataset.index, function (res) {
      _this.setData({
        goodsList: res
      })
    })

  },
  // 去商品详情页
  goGoodsDetail: function (event) {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + this.data.goodsList[event.currentTarget.dataset.index].goodsId
    })
  },
  // 防止冒泡
  prevented: function () { },
  hidenResaleMask: function () {
    this.setData({
      showResaleMask: false
    })
  }
})
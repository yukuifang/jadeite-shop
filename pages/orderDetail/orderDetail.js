var RequestManager = require('../../utils/RequestHelper.js');
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight:0,
    showMask:false,
    hasLogistics:true,
    orderId:"",
    orderData:{},
    orderStatus:0,
    returnReason:"",
    orderIcon: ["cancelOrder.png", "waitPay.png", "waitSend.png", "waitGet.png","tradeSuccess.png",""],
    orderTitle:["订单已取消","订单已提交","等待平台发货","等待用户收货","交易成功",""]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScreenHeight();
    this.setData({
      orderId:options.orderId
    })
    this.getOrderData();
    
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
  //获取屏幕的高度
  getScreenHeight: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight

        })
        console.log(_this.data.screenHeight)
      }
    })
  },
  // 防止冒泡
  prevented:function(){},
  // 申请退货
  applyReturn:function(){
    this.setData({
      showMask:true
    })

  },
  // 查看物流
  checkLogistics:function(){
    if (!this.data.hasLogistics)
    {
      return
    }
    wx.navigateTo({
      url: '../checkLogistics/checkLogistics?orderId=' + this.data.orderData.orderId ,
    })
  },
  // 申请售后的取消按钮的点击事件
  cancelClick:function(){
    this.setData({
      showMask: false
    })
  },
  // 获取申请退货时输入框内容
   getTextareaText:function(event){
     this.setData({
       returnReason: event.detail.value
     })
   },
  //  申请退货时提交按钮点击事件
   commit: function () {
     var _this = this;
     var params = {
       orderId: this.data.orderId,
       orderStatus: this.data.orderData.orderStatus,
       returnReason: this.data.returnReason

     }
     console.log(params)
     RequestManager.RequestPost('api/order/returnGoods.do', params, function (res) {
       _this.setData({
         showMask: false
       })
       _this.OrderHandleSucceess(5);
     })
   },
  //  取消订单
  cancelOrder:function(){
    var _this = this;
    var params = {
      orderId:this.data.orderId,
      orderStatus: this.data.orderData.orderStatus

    }
    RequestManager.RequestPost('api/order/cancelOrder.do', params, function (res) {
      _this.OrderHandleSucceess(0);
    })
  },
  OrderHandleSucceess:function(status){
    var array = getCurrentPages();
    if (array[array.length - 2].__route__ == "pages/orderList/orderList") {
      wx.navigateBack({
        delta: 1,
        success: function () {
          array[array.length - 2].setData({
            orderStatus: status
          })
          if (array[array.length - 2].updateData)
          {
            array[array.length - 2].updateData()
          }
        }
      })
    }
  },

  // 获取订单信息
  getOrderData: function () {
    var params = {
      orderId: this.data.orderId
    }
    var _this = this;
    RequestManager.RequestGet('api/order/orderDetail.do', params, function (res) {
      var deliveryInfoList =[]
      if (res.deliveryInfoList.length<=0){
        _this.setData({
          hasLogistics:false
        })
        deliveryInfoList.push({
          acceptTime: res.createTime,
          remark:"您提交了订单，请等待系统确认"
        })
        res.deliveryInfoList = deliveryInfoList;
      }
      
      _this.setData({
        orderData: res
      })
      _this.handleOrderInfo();
    })
  },
  // 付款按钮点击事件
  payOrder:function(){
    var _this = this 
    common.payOrderByWechat(this.data.orderId, function (res) {//成功回调
      wx.redirectTo({
        url: '../paySuccess/paySuccess?goodsId=' + _this.data.orderData.goodsId + "&orderId=" + _this.data.orderId
      })
    }, function (res) {//失败回调
      // wx.redirectTo({
      //   url: '../personal/personal'
      // })
    })
  },
  // 处理订单信息数据
  handleOrderInfo:function(){
    // 呈现给用户的订单状态 -2:交易超时 -1:已取消 0:待付款 1:待发货 2:待收货 3:交易成功 4:交易成功 5:退货 6:退货
    var orderStatus = 0;
    if (this.data.orderData.orderStatus == 0){
      orderStatus = 1
    } else if (this.data.orderData.orderStatus == 1) {
      orderStatus = 2
    } else if (this.data.orderData.orderStatus == 2) {
      orderStatus = 3
    } else if (this.data.orderData.orderStatus == 3 || this.data.orderData.orderStatus == 4) {
      orderStatus = 4
    } else if (this.data.orderData.orderStatus == 5 || this.data.orderData.orderStatus == 6) {
      orderStatus = 5
    }
    this.setData({
      orderStatus: orderStatus
    })
  },
  // 确认收货
  sureGet:function(){
    var _this = this;
    var params = {
      orderId: this.data.orderId,
      orderStatus: this.data.orderData.orderStatus

    }
    RequestManager.RequestPost('api/order/confirmGoods.do', params, function (res) {
      _this.OrderHandleSucceess(4);
    })
  },
  // 去商品详情页
  checkBigPicture: function () {
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + this.data.orderData.goodsId
    })
  },
})
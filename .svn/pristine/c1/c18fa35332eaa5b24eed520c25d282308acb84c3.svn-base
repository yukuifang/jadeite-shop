var RequestManager = require('../../utils/RequestHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType:["全部","待付款","待发货","待收货","交易成功","退货"],
    orderStatus:0,
    orderListData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // type 0 全部 1 待付款 2 待发货 3 待收货 4 交易成功 5 退货
     this.setData({
       orderStatus: options.type
     })
     this.updateData()
     this.updateOrderRead();
     
    
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
  // 订单类型切换点击事件
  orderTypeChange:function(event){
    var type = event.currentTarget.dataset.index;
    if (type == this.data.orderStatus)
    {
      return
    }
    this.chngeOrderStatus(type);
  },
  // 订单类型切换
  chngeOrderStatus:function(type){
    this.setData({
      orderStatus: type
    })
    this.getOrderList()

  },
  // 查看订单详情
  checkOrderDetail:function(event){
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + this.data.orderListData[event.currentTarget.dataset.index].orderId
    })
  },
  // 获取订单列表
  getOrderList: function () {
    var queryStatus = 10
    if (this.data.orderStatus > 0)
    {
      if (this.data.orderStatus==5)
      {
        queryStatus = this.data.orderStatus
      }else
      {
        queryStatus = this.data.orderStatus - 1
      }
      
    }
    var params = {
      queryStatus: queryStatus
    }  
    var _this = this;
    console.log("orderlist===================")
    console.log(params)
    RequestManager.RequestGet('api/order/listOrder.do', params, function (res) {
      console.log("orderlist===================")
        console.log(res)
        _this.setData({
          orderListData:res
        })
    })
  },
  // 更新界面数据
  updateData:function(){
    this.chngeOrderStatus(this.data.orderStatus);
  },
  // 将订单标记未已读
  updateOrderRead:function(){
    var queryStatus = 10
    if (this.data.orderStatus > 0) {
      if (this.data.orderStatus == 5) {
        queryStatus = this.data.orderStatus
      } else {
        queryStatus = this.data.orderStatus - 1
      }
    }
    var params = {
      orderStatus: queryStatus
    }
    var _this = this;
    RequestManager.RequestPost('api/order/readOrder.do', params, function (res) {
      console.log("updateOrderRead=========+++++")
    })
  }
})
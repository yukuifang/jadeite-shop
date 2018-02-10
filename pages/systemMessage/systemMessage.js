var RequestManager = require('../../utils/RequestHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.cancelRedDot();
    
    
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
  // 获取系统消息列表
  getList: function () {
    var _this = this;
    RequestManager.RequestGet('api/notice/listSysMessage.do', null, function (res) {
      console.log(res)
      _this.setData({
        listData: _this.data.listData.concat(res)
      })
    })
  },
  //查看详情
  checkDetail:function(event){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + this.data.listData[event.currentTarget.dataset.index].goodsId
    })
    
  },
  //取消小红点
  cancelRedDot: function () {
    var params = {
      oprType: 2
    }
    RequestManager.RequestPost('api/notice/oprSysMessageRedDot.do', params, function (res) {
      console.log("++++")
      console.log(res)
    })
  }

})
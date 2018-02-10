var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messgeInfo:{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
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
    this.getRedDot()
    
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
  //查看系统消息 
  checkSystemInfo:function(event){
    var url =""
    if (event.currentTarget.dataset.type == 0){
      url = '../notice/notice'
    }else
    {
      url = '../systemMessage/systemMessage'
    }
    wx.navigateTo({
      url: url ,
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
  }
})
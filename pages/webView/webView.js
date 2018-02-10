const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.type == 0)//公告
    {
      wx.setNavigationBarTitle({
        title: '公告'
      })
      this.setData({
        url: app.globalData.urlBase + options.url + "?id=" + options.id
      })
    }else if(options.type == 1)//使用帮助
    {
      wx.setNavigationBarTitle({
        title: '使用帮助'
      })
      this.setData({
        url: app.globalData.urlBase + "useHelp/list.do"
      })
    }else if(options.type == 2)//关于我们
    {
      wx.setNavigationBarTitle({
        title: '关于我们'
      })
      this.setData({
        url: app.globalData.urlBase + "publicHelp/detail.do?id=7"
      })
    }else if(options.type == 3)//购翠宝服务介绍
    {
      wx.setNavigationBarTitle({
        title: '购翠宝服务介绍'
      })
      this.setData({
        url: app.globalData.urlBase + "publicHelp/detail.do?id=9"
      })
    }
    
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

})
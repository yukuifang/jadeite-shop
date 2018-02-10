var RequestManager = require('../../utils/RequestHelper.js');
var common = require('../../utils/common.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight:0,
    goodsList:{},
    goodsData:[],
    selectIndex:1,
    messgeInfo: {},
    adsImage:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScreenHeight();
    this.getListData();
    this.getAdsImage();
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
      this.getRedDot()
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
  // 搜索想要的按钮被点击
  searchClick: function () {
    wx.navigateTo({
      url: '../search/search'
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
  // 查看商品列表
  checkGoodsList: function (event) {
    wx.navigateTo({
      url: '../searchResult/searchResult?firstIndex=' + this.data.selectIndex + '&secondIndex=' + event.currentTarget.dataset.index,
    })
  },
  // 获取列表数据
  getListData: function () {
    var _this = this;
    common.classifyListData(function(res){
      console.log(res)
      var first = [{ name: "全部" }];
      _this.setData({
        goodsList: first.concat(res),
      });
      _this.setGoodsData();

    })
    
    
  },
  // 左侧列表被选中
  listSelect:function(event)
  {
    console.log(event.currentTarget.dataset.index)
    if (event.currentTarget.dataset.index == 0){
      wx.navigateTo({
        url: '../searchResult/searchResult?firstIndex=0&secondIndex=0' 
      })

    }else
    {
      var array = [{ name: "全部" }]
      this.setData({
        selectIndex: event.currentTarget.dataset.index,
        goodsData: array.concat(this.data.goodsList[event.currentTarget.dataset.index].childClassifyList)

      })
    }
  },
  //初始化商品数据
  setGoodsData:function()
  {
    var array = [{ name: "全部" }]
    this.setData({
      goodsData: array.concat(this.data.goodsList[this.data.selectIndex].childClassifyList)

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
  // 轮廓图
  getAdsImage: function () {
    var _this = this
    common.getAdsImage(function (res) {
      _this.setData({
        adsImage: res
      })

    })
  }

})
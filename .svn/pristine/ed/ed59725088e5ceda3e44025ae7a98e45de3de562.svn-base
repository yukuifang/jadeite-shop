var util = require('../../utils/util.js');
var RequestManager = require('../../utils/RequestHelper.js');
var common = require('../../utils/common.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    adsImage:[],
    page:1,
    type_title:["新品","精选","高货","手镯"],
    select_status:0,
    image_select: ["../../image/icons8_Fire_2.png",
      "../../image/icons8_Diamond_2.png",
      "../../image/icons8_Receive_2.png",
      "../../image/icon-shouzuo-2.png"],
    image_normal: ["../../image/icons8_Fire_1.png", "../../image/icons8_Diamond_1.png",
     "../../image/icons8_Receive_Cash.png",
      "../../image/icon-shouzuo.png"],
      messgeInfo:{},
      showResaleMask:false,
      animationData:{},
      showGoTop:false,
      isTop:true

    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
    this.getAdsImage()
    this.getCsPhone()
  
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
    this.creatAnimationData();
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
    this.setData({
      page:1,
    })
    this.getListData() 
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getListData();
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onPageScroll: function (e) {
    if (e.scrollTop>700)
    {
      this.setData({
        showGoTop: true
      })
    }else
    {
      this.setData({
        showGoTop: false
      })
    }
    if (e.scrollTop <160){
      this.setData({
        isTop:true
      })
    }else
    {
      this.setData({
        isTop: false
      })
    }
  },
  // 商品种类切换
  typeSelect: function (event) {
    this.setData({
      select_status: event.currentTarget.dataset.index,
      page:1
    })
    console.log("<<<<<<<<<<<<<<<<<<<<<<<")
    console.log(this.data.page)
    this.getListData(true);
  },
  // 去商品详情页
  checkBigPicture:function(event){
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + event.currentTarget.dataset.goodsdata.goodsId
    })
  },
  // 收藏按钮点击
  collectionSelect:function(event){
    var _this = this
    common.collectGoods(this.data.goodsList, event.currentTarget.dataset.index, function (res) {
      _this.setData({
        goodsList: res
      })
    })
    
  },
  // 搜索想要的按钮被点击
  searchClick:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 查看消息列表
  checkInforList:function(){
    if (!util.checkBindStatus()) {
      return
    }
    wx.navigateTo({
      url: '../informationList/informationList',
    })
  },
  // 转售按钮点击事件
  reSale:function(){
    this.setData({
      showResaleMask: true
    })
  },
  getListData: function (hidenToast) {
    var length = this.data.goodsList.length
    var time = util.formatTime(new Date());
    if(length>0)
    {
      time = this.data.goodsList[0].createTimeStr
    }
    var marketClassifyId=0;
    if (this.data.select_status==3)
    {
      marketClassifyId = 6
    }else
    {
      marketClassifyId = this.data.select_status + 1
    }
    console.log(this.data.page)
    var params = {
      marketClassifyId: marketClassifyId,
      pageNo: this.data.page,
      pageSize:10,
      refleshTime: time
    }
    if (util.checkLanding()) {
      params.uid = app.globalData.login.uid
    }
    console.log("params=================")
    console.log(params)
    var _this = this;
    RequestManager.RequestGet('goods/listGoods.do', params, function (res) {
      var  goodsList = _this.data.goodsList;
      if (_this.data.page == 1) {
        goodsList = [];
        _this.setData({
          goodsList:[]
        })

      }
      if(res.length>0)
      {
        goodsList = goodsList.concat(res);
        _this.setData({
          goodsList: goodsList,
          page: _this.data.page + 1
        });
      }
    },null,hidenToast)
  },
  // 获取小红点
  getRedDot:function(){
   var _this = this;
    common.getRedDot(function(res){
      _this.setData({
        messgeInfo:res
      })

    })
  },
  // 轮廓图
  getAdsImage:function(){
    var _this = this
    common.getAdsImage(function(res){
      _this.setData({
        adsImage:res
      })

    })
  },
  //获取客服电话
  getCsPhone: function () {
    RequestManager.RequestPost('user/getCsPhone.do', null, function (res) {
      app.globalData.csPhone = res
    })
  },
  prevented:function(){

  },
  hidenResaleMask:function(){
    this.setData({
      showResaleMask:false
    })
  },
  creatAnimationData:function(){
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
      delay:2000
    })
  
    animation.opacity(1.0).right(85).step()
    animation.opacity(0).right(8).step({ delay: 4000})
    this.setData({
      animationData: animation.export()
    })
  
  },
  // 回顶部
  goTop:function(){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

  }

})
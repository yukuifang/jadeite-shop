var RequestManager = require('../../utils/RequestHelper.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_text:"",
    history_search:[],
    hotKeyword:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotKeyword();

    
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
    this.getHistorySearch();
    
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
  // 查看搜索结果
  checkSearchResult:function(){
    if (this.data.search_text.length<=0)
    {
      util.MessageToast("请输入宝贝名称")
      return;

    }
    wx.redirectTo({
      url: '../searchResult/searchResult?firstIndex=0&secondIndex=0&title=' + this.data.search_text
    })
  },
  // 获取历史搜索
  getHistorySearch:function(){
    try {
      var value = wx.getStorageSync('history_search')
      if (value) {
        this.setData({
          history_search: value
        })
      }
    } catch (e) {
      
    }
  },
// 清除历史搜索
   clearHistorySearch:function(){
     var _this = this;
     wx.removeStorage({
       key: 'history_search',
       success: function (res) {
         _this.setData({
           history_search:[]
         })
       }
     })
   },
  //  热门搜索获历史搜索被点击
   itemClick:function(event){
     this.setData({
       search_text: event.currentTarget.dataset.text
     })
   },
   // 获取热门搜索
   getHotKeyword: function () {
     var _this = this;
     RequestManager.RequestGet('/goods/hotKeyword.do', null, function (res) {
       _this.setData({
         hotKeyword: res,
       });

     })
   },
  //  获取输入框输入的内容
   getInputText:function(event)
   {
     this.setData({
       search_text: event.detail.value
     })
   }
  
   
})
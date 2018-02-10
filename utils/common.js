var RequestManager = require('./RequestHelper.js');
var util = require('./util.js');
// 收藏商品与取消收藏商品
function collectGoods(data,index,callBack){
  if (!util.checkBindStatus()) {
        return
  }
  var _this = this;
  var params ={
    goodsId: data[index].goodsId,
    collectStatus: data[index].isCollect
  }
  RequestManager.RequestPost('api/goods/collectGoods.do', params, function (res) {
    data[index].isCollect = (data[index].isCollect+1)%2
    if (data[index].isCollect==1)
    {
      data[index].collectCount +=1
    }else
    {
      data[index].collectCount -= 1
    }
    data[index].collectCount+
    callBack(data)
  })
}
// 分类列表数据
function classifyListData(callBack) {
  var _this = this;
  RequestManager.RequestGet('goods/listGoodsClassify.do', null, function (res) {
    
    callBack(res)
  })
}
// 获取小红线
function getRedDot(callBack){
  var _this = this;
  RequestManager.RequestGet('api/notice/getRedDot.do', null, function (res) {
    callBack(res)
  },null,true)
}
// 订单微信支付
function payOrderByWechat(orderId,successBack,failureBack){
  var _this = this;
  var params = {
    orderId:orderId,
    payType:1
  }
  RequestManager.RequestPost('api/order/payOrderByWechat.do', params, function (res) {
console.log("pay")
console.log(res)
    wx.requestPayment({
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonceStr,
      'package': res.prepayId,
      'signType': res.signType,
      'paySign': res.paySign,
      'success': function (res) {
        successBack(res)
      },
      'fail': function (res) {
        console.log("支付取消或失败")
        console.log(res)
       
        failureBack(res)

      },
      'complete':function(res){
        console.log(res)
      }
    })

  },function(res){
    console.log("微信支付请求异常")
    failureBack(res)
  })
    
}
// 轮廓图
function getAdsImage(callBack){
  RequestManager.RequestPost('ad/adImgs.do', null, function (res) {
    callBack(res)
  },null,true)
}














module.exports = {
  collectGoods: collectGoods,
  classifyListData: classifyListData,
  getRedDot: getRedDot,
  payOrderByWechat: payOrderByWechat,
  getAdsImage: getAdsImage
 
}
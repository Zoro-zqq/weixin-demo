// pages/post_detail/post_detail.js
import {postList} from "../../data/data"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    _pid: null,
    collected: false,
    _postsCollected: {},
    isPlaying: false,
    _player: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = parseInt(options.pid);
    this.data._pid = id
    this.data._postsCollected = wx.getStorageSync('posts_collectedy')
    const collected = this.data._postsCollected[this.data._pid] === undefined?false:this.data._postsCollected[this.data._pid]
    for (let i = 0; i < postList.length; i++) {
      if (postList[i].postId === id) {
        this.setData({
          postData: postList[i],
          collected,
          isPlaying: this.currentPlayingMusic()
        })
      }
    }
    const player = wx.getBackgroundAudioManager()
    this.data._player = player
    player.onPlay(this.onMusicStart)
    player.onPause(this.onMusicStop)
  },

  currentPlayingMusic(){
    if (app.globalData.g_playingPostId === this.data._pid && app.globalData.g_isPlayingMusic) {
      return true
    }
    return false
  },

  onTangleCollect() {
    this.data._postsCollected[this.data._pid] = !this.data.collected
    wx.setStorageSync('posts_collectedy', this.data._postsCollected)
    this.setData({
      collected: !this.data.collected
    })
    wx.showToast({
      title: this.data.collected?"收藏成功":"取消收藏",
      duration: 2000
    })
  },

  onShare() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈','分享给QQ好友','分享给微信好友'],
    })
  },

  onMusicStart() {
    let player = this.data._player
    const music = postList[this.data._pid].music
    player.src = music.url
    player.title = music.title
    player.coverImgUrl = music.coverImg
    app.globalData.g_isPlayingMusic = true
    app.globalData.g_playingPostId = this.data._pid
    this.setData({
      isPlaying: true
    })
  },

  onMusicStop() {
    let player = this.data._player
    player.pause()
    app.globalData.g_isPlayingMusic = false
    app.globalData.g_playingPostId = -1
    this.setData({
      isPlaying: false
    })
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

  }
})
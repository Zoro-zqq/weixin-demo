// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGoToDetail() {
      wx.navigateTo({
        url: '/pages/movie-detail/movie-detail?mid='+this.properties.movie.id,
      })
    }
  }
})

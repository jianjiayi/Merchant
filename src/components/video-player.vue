<template>
  <div class="container">
    <div class="player">
      <video-player
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="options"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player';

  export default {
    props:['playOptions'],
    data () {
      return {
        options:{
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: 'http://vjs.zencdn.net/v/oceans.mp4'
          }],
          poster: 'http://img4.imgtn.bdimg.com/it/u=4075891162,1049402170&fm=15&gp=0.jpg', //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
      }
    },
    created(){
      this.options.sources[0].src = this.playOptions.src;
      this.options.poster = this.playOptions.poster;
    },
    watch:{
      playOptions(val,oldval){
        this.options.sources.src = this.playOptions.src;
        this.options.poster = this.playOptions.poster;
        console.log(this.playOptions)
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      initLoad(){
        this.$refs.videoPlayer.initialize()
      },
      onPlayerPlay(player) {
        console.log("play");
      },
      onPlayerPause(player){
        console.log("pause");
      },
    },
    components: {
      videoPlayer
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
  .vjs-poster{
    background-size: cover;
  }
</style>

<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-16-9 vjs-theme-city"></video>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import videojs from "video.js";
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log("onPlayerReady", this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
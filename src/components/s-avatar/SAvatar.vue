<template>
  <div :class="avatar" @click="onClick">
    <img :src="src" alt="">
  </div>
</template>
<script>
const sieCls = "sie-avatar";
export default {
  name: "SAvatar",
  props: {
    shape: {
      type: String,
      default: "circle",
      validator: function(value) {
        return ["circle", "square"].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: "default",
      validator(value) {
        return ["small", "large", "default"].indexOf(value) !== -1;
      }
    },
    src: {
      type: String
    }
  },

  data() {
    return {
      sieCls: sieCls
    };
  },
  computed: {
    avatar() {
      return [`${sieCls}`, `${sieCls}-${this.size}`, `${sieCls}-${this.shape}`];
    }
  },
  watch: {},
  methods: {
    onClick() {
      this.$emit("on-click");
    }
  },
  mounted() {}
};
</script>
<style lang="less"  scoped>
.sie-avatar {
  display: inline-block;
  width: 60px;
  height: 60px;
  overflow: hidden;
  // border: 1px solid #aaa;
  img {
    display: block;
    width: 100%;
    height:100%;
  }
}

.sie-avatar-circle {
  border-radius: 50%;
}

.sie-avatar-small {
  width: 30 px;
  height: 30 px;
}

.sie-avatar-large {
  width: 100px;
  height: 100px;
}
</style>
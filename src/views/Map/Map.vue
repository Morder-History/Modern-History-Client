<template>
  <!-- 地图 -->
  <MapPage @handleOpen="handleOpen"></MapPage>
  <!-- 战争信息弹框 -->
  <WarPopup :jumpBox="jumpBox"></WarPopup>
</template>

<script lang="ts">
import MapPage from "./components/MapPage.vue";
import WarPopup from "./components/WarPopup.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export default {
  setup() {
    let jumpBox = ref(false);
    // 弹出框dom
    let targetDom = ref();

    // 显示战争弹出框
    const handleOpen = (value) => {
      console.log(value);
      jumpBox.value = value;
    };

    // 点击关闭弹出框
    const handleClose = () => {
      jumpBox.value = false;
    };

    // 当点击到目标dom的外面时隐藏
    onClickOutside(targetDom, () => {
      jumpBox.value = false;
    });

    return {
      jumpBox,
      handleOpen,
      handleClose,
    };
  },
  components: {
    MapPage,
    WarPopup,
  },
};
</script>

<style lang="scss"></style>

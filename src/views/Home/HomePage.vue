<template>
  <div id="main" ref="mainPage">
    <div
      class="full-page"
      ref="fullPage"
      @mousewheel.stop="mouseWheelHandle"
      @DOMMouseScroll="mouseWheelHandle"
    >
      <!-- 第一页 -->
      <div class="section section1">
        <HomeFirstPage></HomeFirstPage>
      </div>
      <!-- 第二页 -->
      <div class="section section2" style="zoom: 1 !important">
        <HomeShowDetail></HomeShowDetail>
      </div>
      <!-- 第三页 -->
      <div class="section section3">
        <HomeMapDetail></HomeMapDetail>
      </div>
      <!-- 第四页 -->
      <!-- <div class="section section4">
        <HomeShowCollection></HomeShowCollection>
      </div> -->
      <!-- 第五页 -->
      <div class="section section5">
        <HomeShowPerson></HomeShowPerson>
      </div>
      <!-- 第六页 -->
      <!-- <div class="section section6">6</div> -->
    </div>
    <div class="ico_down" v-if="current <= 5" @click="next"></div>
    <div class="ico_Up" v-if="current >= 1" @click="prev"></div>
  </div>
</template>

<script lang="ts" setup>
import HomeMapDetail from "@/views/Home/components/HomeMapDetail.vue";
import HomeShowDetail from "@/views/Home/components/HomeShowDetail.vue";
import HomeFirstPage from "@/views/Home/components/HomeFirstPage.vue";
// import HomeShowCollection from "@/views/Home/components/HomeShowCollection.vue";
import HomeShowPerson from "@/views/Home/components/HomeShowPerson.vue";

import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
//#region 全屏滚动效果
const current = ref(0);
const isScrolling = ref(false);
const mainPage = ref();
const fullPage = ref();
const deltaY = ref(0);
const route = useRoute();

// next()
const next = () => {
  if (current.value < 3) {
    current.value += 1;
    move(current.value);
  } else {
    current.value = 0;
    move(current.value);
  }
};
// prev()
const prev = () => {
  if (current.value > 0) {
    current.value -= 1;
    move(current.value);
  } else {
    current.value = 3;
    move(current.value);
  }
};
// move()
const move = (index: number) => {
  isScrolling.value = true;
  directToMove(index);
  setTimeout(() => {
    isScrolling.value = false;
  }, 1000);
};
// directToMove()
const directToMove = onMounted(() => {
  let height = mainPage.value.clientHeight;
  let scrollPage = fullPage.value;
  let scrollHeight;
  scrollHeight = -current.value * height + "px";
  scrollPage.style.transform = "translateY(" + scrollHeight + ")";
});
// mouseWheelHandle()
const mouseWheelHandle = (event) => {
  if (isScrolling.value) return false;
  let e = event.originalEvent || event;
  deltaY.value = e.deltaY;
  if (deltaY.value > 0) {
    next();
  } else {
    prev();
  }
};
// 页面重定向
const resize = () => {
  let height = mainPage.value.clientHeight;
  let scrollPage = fullPage.value;
  let scrollHeight;
  scrollHeight = -current.value * height + "px";
  scrollPage.style.transform = "translateY(" + scrollHeight + ")";
};
onMounted(() => {
  window.addEventListener("resize", resize);

  if (route.params.current) {
    next();
  }
});

//#endregion
</script>

<style lang="scss">
#main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; //一定要设置，多余的先隐藏
}
.full-page {
  width: 100%;
  height: 100%;
  transition: all linear 0.5s;

  .section {
    width: 100%;
    height: 100%;
  }

  .section1 {
    background-color: #fff;
  }

  .section2 {
    background-color: #fff;
  }
  .section3 {
    background-color: #a2dbff;
    position: relative;
    overflow: hidden;
  }
  .section4 {
    background-color: gold;
  }
  .section5 {
    background-color: #000;
  }
  .section6 {
    background-color: wheat;
  }
}
.ico_down {
  width: 3vmin;
  height: 3vmin;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: rotate(135deg);
  animation: moveDown 1.5s infinite;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    border-width: 0.8vmin 0.8vmin 0 0;
    border-style: solid;
    border-color: #fafafa;
    transition: 0.2s ease;
    display: block;
    transform-origin: 100% 0;
  }

  &:after {
    content: "";
    float: left;
    position: relative;
    top: -100%;
    width: 100%;
    height: 100%;
    border-width: 0 0.8vmin 0 0;
    border-style: solid;
    border-color: #fafafa;
    transform-origin: 100% 0;
    transition: 0.2s ease;
  }
}
.ico_Up {
  width: 3vmin;
  height: 3vmin;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: rotate(-45deg);
  animation: moveUp 1.5s infinite;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    border-width: 0.8vmin 0.8vmin 0 0;
    border-style: solid;
    border-color: #fafafa;
    transition: 0.2s ease;
    display: block;
    transform-origin: 100% 0;
  }

  &:after {
    content: "";
    float: left;
    position: relative;
    top: -100%;
    width: 100%;
    height: 100%;
    border-width: 0 0.8vmin 0 0;
    border-style: solid;
    border-color: #fafafa;
    transform-origin: 100% 0;
    transition: 0.2s ease;
  }
}
@keyframes moveUp {
  0% {
    top: 5%;
  }
  50% {
    top: 7%;
  }
  100% {
    top: 5%;
  }
}
@keyframes moveDown {
  0% {
    bottom: 5%;
  }
  50% {
    bottom: 7%;
  }
  100% {
    bottom: 5%;
  }
}
</style>

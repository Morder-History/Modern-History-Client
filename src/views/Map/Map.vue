<template>
  <!-- 地图 -->
  <MapPage
    :key="warYear"
    :warYear="warYear"
    @handleWarOpen="handleWarOpenOrClose"
    @handlePeopleOpen="handlePeopleOpenOrClose"
  ></MapPage>

  <!-- 战争信息弹框 -->
  <WarPopup
    :jumpWarBox="jumpWarBox"
    @handleWarClose="handleWarOpenOrClose"
  ></WarPopup>

  <!-- 人物信息弹框 -->
  <PeoplePage
    :jumpPeopleBox="jumpPeopleBox"
    :PeopleList="PeopleList"
    @handlePeopleClose="handlePeopleOpenOrClose"
  ></PeoplePage>

  <!-- 时间轴 -->
  <TimeAxis @handleTimeAxis="handleTimeAxis"></TimeAxis>
</template>

<script lang="ts">
import MapPage from "./components/MapPage.vue";
import WarPopup from "./components/WarPopup.vue";
import PeoplePage from "./components/PeoplePage.vue";
import TimeAxis from "./components/TimeAxis.vue";
import { ref } from "vue";

export default {
  setup() {
    // 战争信息弹框
    let jumpWarBox = ref();
    // 人物信息弹框
    let jumpPeopleBox = ref(false);
    // 人物信息
    let PeopleList = ref();
    // 战争年份
    let warYear = ref(1931);

    // 显示/隐藏战争弹出框
    const handleWarOpenOrClose = (value) => {
      // console.log(value);
      jumpWarBox.value = value;
    };

    // 显示/隐藏人物弹出框
    const handlePeopleOpenOrClose = (value, peopleValue) => {
      jumpPeopleBox.value = value;
      PeopleList.value = peopleValue;
      // console.log(PeopleList.value);
    };

    // 实时时间轴时间
    const handleTimeAxis = (year) => {
      warYear.value = Number(year);
    };

    return {
      jumpWarBox,
      jumpPeopleBox,
      PeopleList,
      warYear,
      handleWarOpenOrClose,
      handlePeopleOpenOrClose,
      handleTimeAxis,
    };
  },
  components: {
    MapPage,
    WarPopup,
    PeoplePage,
    TimeAxis,
  },
};
</script>

<style lang="scss"></style>

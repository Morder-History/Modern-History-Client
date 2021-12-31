<template>
  <div class="home-second">
    <!-- 时间轴 -->
    <div class="second-left test-1">
      <div class="timeline-title">
        <h2>抗日战争十大战役</h2>
      </div>
      <div class="timeline" v-for="item in warFight" :key="item.id">
        <div class="timeline-date">{{ item.date }}</div>
        <div class="dot"></div>
        <div class="timeline-content">{{ item.title }}</div>
      </div>
      <!-- 滚动条 -->
      <div class="scrollbar" />
    </div>
    <!-- 书 -->
    <div class="second-right">
      <!-- /* box为整个页面展示区 */ -->
      <div id="box">
        <!-- /* page有前后两面 */ -->
        <div class="page" v-for="item in 5" :key="item">
          <div class="front" @click="togoleRegister(true)">front</div>
          <div class="back" @click="togoleRegister(false)">back</div>
        </div>
        <!-- /* page2为翻页之后显示的*/ -->
        <!-- <div class="page2" @click="togoleRegister(false)"></div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
("HomeShowDetail");
// 初始化数据
const warFight = ref([
  {
    id: 1,
    title: "淞沪会战",
    date: "1937年8月",
  },
  {
    id: 2,
    title: "上高会战",
    date: "1941年3月",
  },
  {
    id: 3,
    title: "南京保卫战",
    date: "1937年12月",
  },
  {
    id: 4,
    title: "太原会战",
    date: "1937年9月",
  },
  {
    id: 5,
    title: "徐州会战",
    date: "1938年1月",
  },
  {
    id: 6,
    title: "武汉保卫战",
    date: "1938年6月",
  },
  {
    id: 7,
    title: "长沙会战",
    date: "1939年9月",
  },
  {
    id: 8,
    title: "桂南会战",
    date: "1939年11月",
  },
  {
    id: 9,
    title: "滇缅之战",
    date: "1942年3月",
  },
  {
    id: 10,
    title: "湘西会战",
    date: "1945年4月",
  },
]);

const current = ref(0);
const oBox = ref();
const oPage = ref();
onMounted(() => {
  // console.log(turn);
  oBox.value = document.getElementById("box");
  oPage.value = document.querySelectorAll(".page");
});
const togoleRegister = (val) => {
  // console.log(oPage.value);
  let currentPage = oPage.value[current.value];
  if (val === true) {
    // Array.from(oPage.value).forEach((item: any, index) => {
    //   item.value.style.transform = "perspective(1600px) rotateY(-180deg)";
    //   current.value += 1;
    // });
    console.log(currentPage);
    currentPage.style.transform = "perspective(1600px) rotateY(-180deg)";
    currentPage.style.right = "perspective(1600px) rotateY(-180deg)";
    current.value += 1;
    if (current.value === oPage.value.length) {
      current.value = 0;
    }
  } else {
    currentPage.style.transform = "perspective(1600px) rotateY(0deg)";
    current.value -= 1;
    if (current.value === -1) {
      current.value = oPage.value.length - 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.home-second {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #eee;
}
.second-left {
  width: 20%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;

  // 滚动条样式设置
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  // 时间轴标题
  .timeline-title {
    width: 100%;
    text-align: center;
    padding: 20px 0px 10px 0px;
    font-size: 32px;
    color: #851d20;
    border-radius: 30px;
    margin-bottom: 40px;
  }
  // 时间轴样式
  .timeline {
    width: 100%;
    height: auto;
    padding-top: 20px;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    color: #851d20;

    .timeline-date {
      // float: left;
      width: 120px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
    }
    .dot {
      position: relative;
      // float: left;
      height: 50px;
      width: 1px;
      background-color: black;
      margin: 0px 10px;
      &::before {
        content: "";
        position: absolute;
        top: 20px;
        left: -4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: black;
      }
    }
    .timeline-content {
      // float: left;
      width: 140px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 28px;
      border-radius: 10px;
      border: 3px #ccc;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.second-right {
  width: 80%;
  height: 100%;
  float: left;
  position: relative;
}
#box {
  width: 80%;
  height: 90%;
  margin: 3% 10%;
  position: relative;

  .page {
    /* 因为其在展示区右侧，所以宽度为整个box的一般，并定在右侧 */
    width: 50%;
    height: 100%;
    top: 0;
    right: 0%;
    position: absolute;
    /* 将开启3d空间，方便翻页后front和back的3d变换 */
    transform-style: preserve-3d;
    /* 奇点设为左边 */
    transform-origin: left center;
    /* 设置翻书（旋转）的运动时间，运动形式 */
    transition: 1s all ease;
    /* 提升层级否则会被盖住 */
    z-index: 2;
    /* 设置景深来更好的展示3D效果，并给旋转角度一个初始值，防止抖动发生 */
    transform: perspective(800px) rotateY(0deg);
    display: flex;

    // 旋转前页
    .front {
      /* 宽高与父级page一样 */
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      /* backface-visibility属性和3D transform效果相关，它决定当一个元素的背面面是否可见 */
      backface-visibility: hidden;
      /* 提升层级否则会被盖住 */
      z-index: 10;
      background-color: forestgreen;
    }

    // 旋转后页
    .back {
      /* 宽高与父级page一样 */
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      /* 这里设置将back进行水平方向上的镜像变化，因为当page旋转180°后， back显示的效果不对*/
      transform: scale(-1, 1);
      /* 改变层级避免盖住其他页面 */
      z-index: 5;
      background-color: lightblue;
    }
  }
}
</style>

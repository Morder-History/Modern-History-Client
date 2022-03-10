<template>
  <!-- 书 -->
  <div id="book-wrapper">
    <div id="book-zoom" class="animate">
      <div id="flipbook" class="sj-book animated">
        <div id="home" class="hard" :style="url"></div>
        <div class="hard"></div>
        <div class="one" v-for="item in picList.picNum" :key="item">
          <div v-if="picList.blank"></div>
          <img :src="imgUrl(item)" alt="" v-else />
        </div>
        <div id="last" class="hard"></div>
        <div id="last_next" class="hard"></div>
      </div>
    </div>
  </div>

  <!-- 返回按钮 -->
  <div id="wrap">
    <span class="btn-slide2" @click="handleBackBookshelf">
      <span class="circle2"><i class="fa fa-download"></i></span>
      <span class="title2">书架</span>
      <span class="title-hover2">点击返回</span>
    </span>
  </div>
</template>

<script lang="js">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
// 中国抗日战争全记录书籍路径
let fullRecord = [
  "https://s1.ax1x.com/2022/03/09/bRl02V.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlw80.jpg",
  "https://s1.ax1x.com/2022/03/09/bRldCq.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlNUs.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlU5n.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlBvT.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlsrF.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlyb4.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlcVJ.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlga9.jpg",
  "https://s1.ax1x.com/2022/03/09/bRl25R.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlWP1.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlf8x.jpg",
  "https://s1.ax1x.com/2022/03/09/bRl4xK.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlh26.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlorD.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlTqe.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlHVH.jpg",
  "https://s1.ax1x.com/2022/03/09/bRlbad.jpg",
];
// 日军镜头中的抗日战争
let reporterMeans = [
  "https://s1.ax1x.com/2022/03/09/bR1kin.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1pqg.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1CZQ.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1Paj.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1iIs.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1eMT.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1AGq.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1VzV.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1ER0.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1msU.jpg",
  "https://s1.ax1x.com/2022/03/09/bR1nLF.jpg",
  "https://s1.ax1x.com/2022/03/10/bhTJQe.jpg",
  "https://s1.ax1x.com/2022/03/10/bhTdot.jpg",
  "https://s1.ax1x.com/2022/03/10/bhTtLd.jpg",
  "https://s1.ax1x.com/2022/03/10/bhT8zD.jpg",
  "https://s1.ax1x.com/2022/03/10/bhTYsH.jpg",
  "https://s1.ax1x.com/2022/03/10/bhTUeA.jpg",
  "https://s1.ax1x.com/2022/03/10/bhTadI.jpg",
];
// 书籍数据
let bookList = [
  {
    id: 1,
    bookName: "中国抗日战争全记录",
    cover: "https://s1.ax1x.com/2022/03/09/bRl02V.jpg",
    hover: false,
    picNum: 18,
  },
  {
    id: 2,
    bookName: "日军镜头中的抗日战争",
    cover: "https://s1.ax1x.com/2022/03/09/bR1kin.jpg\n",
    hover: false,
    picNum: 18,
  },
];

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    let url = ref("");

    let picList = ref({
      title: "",
      picNum: "",
      blank: false,
    });
    bookList.forEach((item) => {
      if (route.query.bookName === item.bookName) {
        url.value = `background-image: url(${item.cover}) !important;`
        picList.value.title = item.bookName
        picList.value.picNum = item.picNum
        picList.value.blank = item.hover
      }
    });


    // 处理图片路径
    const imgUrl = (item) => {
      let num = item + 1;

      if (picList.value.title === "中国抗日战争全记录") {
        picList.value.blank = false;
        return fullRecord[num - 1];
      } else if (picList.value.title === "日军镜头中的抗日战争") {
        picList.value.blank = false;
        return reporterMeans[num - 1];
      } else {
        picList.value.blank = true;
      }
    };

    // 返回书架
    const handleBackBookshelf = () => {
      router.push({
        name: "Home",
        params: {
          current: 1,
        },
      });
    };

    return {
      url,
      picList,
      imgUrl,
      handleBackBookshelf,
    };
  },
  mounted() {
    this.$nextTick(() => {
      $("#flipbook").turn({
        autoCenter: true,
        height: 600,
        width: 942,
      });
    });
  },
};
</script>

<style lang="scss">
html {
  background: #494a5f;
  background-size: cover;
  height: 100%;
  font-size: 62.5%;
}

body,
#app {
  font-weight: 300;
  line-height: 1.4;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

/* 书 */
#book-wrapper {
  width: 942px;
  height: 600px;
  margin-left: 20px;
  margin-right: 20px;

  #book-zoom {
    /* 书本打开关闭位移动画 */
    .animated {
      transition: margin-left 0.2s ease-in-out;
    }

    #flipbook {
      /* 书籍封面和背面，仿硬纸板样式 */
      .hard {
        background-image: url("~@/assets/images/book-covers.jpg") !important;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        box-shadow: inset 0 0 10px #666;
      }

      #home {
        background-size: 100% 100%;
      }

      .one {
        img {
          width: 100%;
          height: 100%;
        }
      }

      .p2 {
        background: url("~@/assets/images/covers.jpg") !important;
        background-position: -471px 0 !important;
      }

      #last {
        background: url("~@/assets/images/covers.jpg") !important;
        background-position: -942px 0 !important;
      }

      .page {
        width: 200px;
        height: 200px;
        background-color: white;
        font-size: 20px;
      }

      .odd {
        box-shadow: inset 0 0 5px #666 !important;
      }

      .even {
        box-shadow: inset 0 0 5px #666 !important;
      }

      .page-wrapper {
        -webkit-perspective: 2000px;
        -moz-perspective: 2000px;
        -ms-perspective: 2000px;
        -o-perspective: 2000px;
        perspective: 2000px;
      }

      .shadow {
        box-shadow: 0 0 10px rgb(48, 46, 46);
      }
    }
  }

  .animate {
    transition: transform 1s;
  }
}

/* 返回书架按钮 */
#wrap {
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px auto;
  text-align: center;

  .btn-slide2 {
    position: relative;
    display: inline-block;
    height: 50px;
    width: 200px;
    line-height: 50px;
    padding: 0;
    border-radius: 50px;
    background: #fdfdfd;
    border: 2px solid #efa666;
    margin: 10px;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
      background-color: #efa666;

      span.circle2 {
        right: 100%;
        margin-right: -45px;
        background-color: #fdfdfd;
        color: #efa666;
      }

      span.title2 {
        right: 40px;
        opacity: 0;
      }

      span.title-hover2 {
        opacity: 1;
        right: 40px;
      }
    }

    span.circle2 {
      display: block;
      background-color: #efa666;
      color: #fff;
      position: absolute;
      float: right;
      margin: 5px;
      line-height: 42px;
      height: 40px;
      width: 40px;
      top: 0;
      right: 0;
      transition: 0.5s;
      border-radius: 50%;
    }

    span.title2,
    span.title-hover2 {
      position: absolute;
      right: 80px;
      text-align: center;
      margin: 0 auto;
      font-size: 16px;
      font-weight: bold;
      color: #efa666;
      transition: 0.5s;
    }

    span.title-hover2 {
      right: 80px;
      opacity: 0;
      color: #fff;
    }
  }
}
</style>
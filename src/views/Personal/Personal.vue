<template>
  <div class="wrapper">
    <!-- 人物图片轮播 -->
    <div class="wrapper-visual" id="swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in people.photos" :key="item">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
    <!-- 人物信息 -->
    <div class="wrapper-main">
      <!-- 人物简介 -->
      <div class="people-introduction">
        <div class="introduction">
          <ul>
            <li>
              <label>国籍</label>
              <h4>{{ people.nation }}</h4>
            </li>
            <li>
              <label>简介</label>
              <h4>
                {{ people.jianjie }}
              </h4>
            </li>
            <li>
              <label>逝世原因</label>
              <h4>{{ people.birth }}</h4>
            </li>
          </ul>
        </div>
      </div>
      <!-- 人物生卒 -->
      <div class="people-dead">
        <div class="dead">
          <span class="birth">出生</span>
          <span>逝世</span>
        </div>
        <div class="date">{{ people.dead }}</div>
      </div>
      <!-- 人物姓名 -->
      <div class="people-name">
        <h1>{{ people.name }}</h1>
      </div>
      <!-- 人物生平 -->
      <div class="people-life">
        <div class="life">
          <p>
            {{ people.shengping }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperCore, { EffectFade, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper-bundle.min.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

SwiperCore.use([Autoplay]);

export default {
  setup() {
    const route = useRoute();
    let people = ref(null);

    // 本地存储
    if (route.params.name) {
      people.value = route.params;
      window.localStorage.setItem("peopleData", JSON.stringify(route.params));
    } else {
      people.value = JSON.parse(window.localStorage.getItem("peopleData"));
    }

    onMounted(() => {
      new SwiperCore("#swiper1", {
        modules: [EffectFade],
        effect: "fade",
        loop: true,
        autoplay: {
          delay: 2000,
        },
      });
    });

    return {
      people,
    };
  },
};
</script>

<style lang="scss">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "futura-pt", sans-serif, sans-serif;

  .wrapper-visual {
    float: left;
    width: 50%;
    height: 100%;

    .swiper-wrapper {
      width: 100%;
      height: 100%;
      text-align: center;

      .swiper-slide {
        background-color: #000;
      }

      img {
        height: 100%;
      }
    }
  }

  .wrapper-main {
    float: right;
    width: 50%;
    height: 100%;
    padding: 100px 50px 50px 200px;
    box-sizing: border-box;

    /* 人物简介 */
    .people-introduction {
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -200px;
      transform: translateY(-50%);
      z-index: 10;

      .introduction {
        position: relative;
        background: #fff;
        border: 3px solid #000;
        padding: 20px 35px;
        width: 280px;
        display: block;
        text-align: left;

        li {
          margin-bottom: 20px;

          label {
            font-size: 12px;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
            color: #cbcbcb;
          }

          h4 {
            font-size: 14px;
            font-weight: bold;
            color: #000;
            font-family: "futura-pt", sans-serif;
            margin: 0;
          }
        }
      }
    }

    /* 人物生卒 */
    .people-dead {
      span {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
        font-size: 12px;
        color: #b2b2b2;
        display: inline-block;
      }

      .date {
        font-family: "Playfair Display", serif;
        font-size: 26px;
        font-style: italic;
        margin: 15px 0;
      }

      .birth::after {
        content: "\2192";
        display: inline-block;
        padding: 0 10px;
      }
    }

    /* 人物姓名 */
    .people-name {
      h1 {
        font-size: 64px;
        font-family: "Playfair Display", serif;
        font-weight: normal;
      }
    }

    /* 人物生平 */
    .people-life {
      .life {
        width: 510px;
        height: 348px;
        font-size: 18px;
        line-height: 1.3;
        font-family: "STLiti";
        overflow: auto;

        &::-webkit-scrollbar {
          width: 4px;
          /*height: 4px;*/
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: rgba(0, 0, 0, 0.2);
        }
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 0;
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>

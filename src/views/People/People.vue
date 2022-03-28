<template>
  <div class="wrapper">
    <div class="container">
      <!-- 标题 -->
      <div class="wrapper-title">
        <img src="@/assets/images/peoplebg.png" alt="" />
      </div>
      <!-- 查询个数 -->
      <div class="wrapper-header">
        <h2>
          已展示
          <span>{{ peopleList.length }}</span>
          张人物卡片
        </h2>
      </div>
      <!-- 查询列表 -->
      <div class="wrapper-select">
        <!-- 下拉列表 -->
        <div
          class="select-refine"
          @click="handleInputLight($event)"
          ref="targetRef"
        >
          <input type="text" :value="valueYear" placeholder="Year" />
          <!-- 下拉框 -->
          <ul class="select-ul" :class="showIs ? '' : 'active'">
            <li
              v-for="item in timeArr"
              :key="item.id"
              :class="item.select ? 'select_li' : ''"
              ref="liRef"
              @click="handleGetYear($event, item.time)"
            >
              <span>{{ item.time }}</span>
            </li>
          </ul>
        </div>
        <!-- 查询按钮 -->
        <div class="select-button" @click="handleSelectPeople">查询人物</div>
      </div>
      <!-- 查询出的数据 -->
      <div class="wrapper-container">
        <div
          class="calendar-result"
          v-for="item in peopleList"
          :key="item.name"
        >
          <!-- 人物图片 -->
          <div class="result-image">
            <img
              :src="item.photos[0]"
              title="前往人物详情"
              @click="handleDelivery(item)"
            />
          </div>
          <!-- 人物卡片 -->
          <div class="result-info">
            <!-- 生卒 -->
            <div class="info-data">{{ item.dead }}</div>
            <!-- 姓名 -->
            <div class="info-name">
              <h5>
                <a @click="handleDelivery(item)" title="前往人物详情">
                  {{ item.name }}
                </a>
              </h5>
            </div>
            <!-- 逝世原因 -->
            <div class="info-deathCause">{{ item.birth }}</div>
          </div>
          <!-- 国籍 -->
          <div class="belong">
            <img
              src="@/assets/images/China.jpg"
              v-if="item.nation === '中国'"
              alt=""
            />
            <img src="@/assets/images/Japan.webp" v-else alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 底部框 -->
    <div class="footer">铭记历史，勿忘国耻。珍爱和平，致敬父辈。</div>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getPeopleNews } from "@/api/people";

export default {
  setup() {
    const router = useRouter();
    // 时间轴死数据
    let timeArr = ref([
      {
        id: 1,
        time: 1931,
        select: true,
      },
      {
        id: 2,
        time: 1932,
        select: false,
      },
      {
        id: 3,
        time: 1937,
        select: false,
      },
      {
        id: 4,
        time: 1938,
        select: false,
      },
      {
        id: 5,
        time: 1939,
        select: false,
      },
      {
        id: 6,
        time: 1940,
        select: false,
      },
      {
        id: 7,
        time: 1941,
        select: false,
      },
      {
        id: 8,
        time: 1942,
        select: false,
      },
      {
        id: 9,
        time: 1943,
        select: false,
      },
      {
        id: 10,
        time: 1945,
        select: false,
      },
    ]);
    // 显示隐藏
    let showIs = ref(false);
    // 下拉框dom元素
    let targetRef = ref();
    // 输入框数值
    let valueYear = ref(1931);
    // 人物卡片数据
    let peopleList = ref([]);

    onMounted(() => {
      handleGetPeopleInformation(valueYear.value);
    });

    // 点击输入框
    const handleInputLight = (e) => {
      e.target.nextElementSibling.classList.remove("active");
      showIs.value = true;
    };

    // 点击年份后出现 √
    const handleGetYear = (event, year) => {
      timeArr.value.forEach((item) => {
        item.select = false;
        if (item.time === year) {
          item.select = true;
          valueYear.value = year;
        }
      });

      event.target.parentNode.classList.add("active");
    };

    // 传送数据
    const handleDelivery = (item) => {
      router.push({
        path: "/personal",
        name: "Personal",
        params: item,
      });
    };

    // 点击查询
    const handleSelectPeople = () => {
      handleGetPeopleInformation(valueYear.value);
    };

    // 点击下拉框外隐藏
    onClickOutside(targetRef, () => {
      showIs.value = false;
    });

    // 获取人物信息
    const handleGetPeopleInformation = (year) => {
      getPeopleNews(year).then((res) => {
        let data = [];

        res.data.forEach((item) => {
          data.push(...item.personageInfo);
        });

        let set = new Set();

        let peopleData = data.filter((item) => {
          if (!set.has(item.name)) {
            set.add(item.name);
            return item;
          }
        });

        peopleList.value = peopleData;
      });
    };

    return {
      timeArr,
      showIs,
      targetRef,
      valueYear,
      peopleList,
      handleInputLight,
      handleGetYear,
      handleDelivery,
      handleSelectPeople,
    };
  },
};
</script>

<style lang="scss">
body {
  background-color: #f7f7f7;
}

.wrapper {
  .container {
    width: 1000px;

    .wrapper-title {
      text-align: center;
    }

    .wrapper-header {
      text-align: center;
      margin-top: 60px;

      h2 {
        font-size: 40px;
        font-weight: normal;
        font-family: "Playfair Display", serif;
      }
    }

    .wrapper-select {
      width: 100%;
      height: 50px;
      text-align: center;
      margin-bottom: 80px;

      .select-refine {
        position: relative;
        float: left;
        width: 23%;
        height: 50px;
        font-family: "futura-pt", sans-serif;
        border: 1px solid #b2b2b2;
        margin-left: 20%;
        box-sizing: border-box;

        input {
          height: 100%;
          text-align: left;
          font-size: 18px;
          font-weight: initial;
          color: #000;
          background: transparent;
          border: none;
          border-radius: 0;
          outline: none;
        }

        .select-ul {
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          height: 200px;
          background: #fff;
          border: 1px solid #cbcbcb;
          overflow: auto;
          z-index: 10;
          transition: all 0.3s;

          li {
            height: 17%;
            color: rgb(128, 96, 96);
            text-align: left;
            line-height: 34px;
            font-size: 14px;
            font-family: "SimHei";
            font-weight: 700;
            padding: 0 30px;
            cursor: pointer;

            &:hover {
              background-color: #f5f3ec;
            }
          }

          .select_li {
            &::after {
              position: absolute;
              right: 54%;
              /* display: none; */
              content: "\2714";
              color: #e6d3d1;
              font-size: 12px;
              font-weight: 400;
            }
          }

          /* 滚动条 */
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(53, 152, 219, 0.4);
            background: rgba(53, 152, 219, 0.4);
          }
          &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(187, 199, 200, 0.2);
            border-radius: 0;
            background: rgba(187, 199, 200, 0.1);
          }
        }

        .active {
          opacity: 0;
          z-index: -1;
        }

        &::after {
          content: "\262F";
          display: inline-block;
          position: absolute;
          top: 10px;
          right: 16px;
          color: #cbcbcb;
          font-size: 24px;
        }
      }

      .select-button {
        float: right;
        width: 23%;
        height: 50px;
        background: #000;
        color: #fff;
        line-height: 50px;
        font-weight: bold;
        font-family: "futura-pt", sans-serif;
        cursor: pointer;
        margin-right: 20%;
      }
    }

    .wrapper-container {
      width: 100%;
      clear: both;
      overflow: hidden;
      margin-bottom: 80px;

      .calendar-result {
        position: relative;
        float: left;
        width: 45%;
        height: 450px;
        background-color: rgba(#000, 0.7);
        margin-right: 50px;
        margin-bottom: 80px;

        .result-image {
          width: 100%;
          height: 100%;
          text-align: center;
          cursor: pointer;
          transition: all 0.5s;

          img {
            height: 100%;
          }

          &:hover {
            opacity: 0.5;
          }
        }

        .result-info {
          position: absolute;
          bottom: -40px;
          right: 40px;
          left: 40px;
          top: auto;
          text-align: center;
          font-family: "futura-pt", sans-serif, sans-serif;
          background: #fff;
          padding: 30px 35px;

          .info-data {
            font-size: 12px;
            font-weight: bold;
            color: #b2b2b2;
          }

          .info-name {
            cursor: pointer;

            h5 {
              font-size: 20px;
            }
          }

          .info-deathCause {
            font-weight: bold;
          }
        }

        .belong {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 45px;
          height: 30px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .footer {
    background: #fff;
    font-weight: bold;
    font-family: "futura-pt", sans-serif, sans-serif;
    text-align: center;
    line-height: 70px;
    border-top: 1px solid #f7f7f7;

    img {
      width: 45px;
      height: 30px;
    }
  }
}

ul {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
  }
}

a {
  color: #000;
  text-decoration: none;
}
</style>

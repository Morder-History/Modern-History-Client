<template>
  <div class="card">
    <!-- 所属国家 -->
    <div class="belong">
      <img src="@/assets/images/China.jpg" alt="" />
    </div>
    <div class="content">
      <!-- 人物信息 -->
      <div class="text-img">
        <!-- 人物头像 -->
        <div class="img-box">
          <img :src="props.item.photos[0]" alt="" />
        </div>
        <!-- 人物出生姓名 -->
        <h3>
          {{ props.item.name }}<br />
          <span :class="props.toggle ? 'darkSpan' : ''">
            {{ props.item.dead }}
          </span>
        </h3>
      </div>
      <!-- 人物简介 -->
      <div :class="props.toggle ? 'darkSynopsis synopsis' : 'synopsis'">
        {{ props.item.introduction }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
interface PeopleCartData {
  id: number;
  name: string;
  nation: string;
  dead: string;
  deathCause: string;
  photos: string[];
  life: string;
  introduction: string;
}

export default {
  props: {
    toggle: {
      type: Boolean,
      default: true,
      required: true,
    },
    item: {
      type: Object as PropType<PeopleCartData>,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss">
.card {
  position: relative;
  width: 300px;
  height: 500px;
  background: #fff;
  box-shadow: 1 25px 25px rgba(0, 0, 0, 0.025);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.6s;
  margin: 0 40px;

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

  .content {
    padding: 0 40px;
  }

  .content,
  .text-img {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .text-img {
    .img-box {
      position: relative;
      width: 140px;
      height: 140px;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #2fa1ff;
      margin-bottom: 15px;

      img {
        /*让图片居中显示*/
        width: 100%;
        height: 100%;
      }
    }

    h3 {
      font-weight: 500;
      font-size: 1.4em;
      color: #2fa1ff;
      line-height: 1.2em;
      text-align: center;

      span {
        font-weight: 400;
        font-size: 12px;
        color: #b2b2b2;
        font-family: "futura-pt", sans-serif, sans-serif;
        font-weight: bold;
      }
    }
  }

  .synopsis {
    height: 130px;
    color: #000;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
  }
}

.darkSpan {
  color: #ccc !important;
}

.darkSynopsis {
  color: #cdcdcd !important;
}
</style>

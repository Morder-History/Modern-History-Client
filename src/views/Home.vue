<template>
  <div id="echarts" style="width: 100%; height: 100%"></div>
  <!-- 战争信息弹框 -->
  <div class="right-info" :class="{ active: jumpBox }">
    <div class="territory-info-container">
      <div class="territory-component">
        <div class="territory-box">
          <div class="close-icon" @click="handleClose"></div>
          <div class="territory-wrap">
            <div class="base-info">
              <div class="title">
                <b>九·一八事变</b>
              </div>
              <div class="desc-box">
                <div class="territoryDesc">
                  <p>
                    <b>九·一八事变</b>
                    ，又称奉天事变、柳条湖事件。是1931年9月18日日本驻中国东北地区的关东军突然袭击沈阳，以武力侵占东北的事件。九·一八事变是由日本蓄意制造并发动的侵华战争，是日本帝国主义企图以武力征服中国的开端，是中国抗日战争的起点，标志着中国局部抗战的开始，揭开了第二次世界大战东方战场的序幕。九一八事变后，中国人民的局部抗战也标志着世界反法西斯战争的起点。
                  </p>
                  <p>
                    1931年9月18日夜，盘踞在中国东北的日本关东军按照精心策划的阴谋，由铁道“守备队”炸毁沈阳柳条湖附近日本修筑的南满铁路路轨，并嫁祸于中国军队，日军以此为借口，炮轰中国东北军北大营，制造了震惊中外的“九一八事变”。次日，日军侵占沈阳，又陆续侵占了东北三省。1932年2月，东北全境沦陷。此后，日本在中国东北建立了伪满洲国傀儡政权，开始了对东北人民长达14年之久的奴役和殖民统治，使东北3000多万同胞饱受亡国奴的痛苦滋味。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import china from "../../public/china";

export default {
  name: "App",
  setup() {
    // 地图数据
    let geoList = ref({
      // 使用 registerMap 注册的地图名称。
      map: "china",
      // 能否通过鼠标移动地图
      roam: true,
      // 进入居中展示
      layoutCenter: ["50%", "50%"],
      // 无需手动添加style样式，官方自带百分比属性
      layoutSize: 100,
      zoom: 1,
      // 地图样式
      itemStyle: {
        // areaColor: "red",
        borderColor: "#eee",
      },
      // 鼠标缩放限制
      scaleLimit: {
        min: 14,
        max: 100,
      },
      // 视角中心
      center: [106.28, 38.47],
    });

    // 散点图
    let seriesList = ref([
      // 标点内部属性
      {
        name: "scatter_inside",
        type: "scatter",
        coordinateSystem: "geo",
        data: [
          {
            name: "九·一八事变",
            value: [123.43, 41.8, 45689],
          },
        ],
        symbolSize: 10,
        encode: {
          value: 2,
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: false,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
      // 带有涟漪特效动画的标点
      {
        name: "scatter_outside",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [
          {
            name: "九·一八事变",
            value: [123.43, 41.8, 11],
          },
        ],
        symbolSize: 30,
        encode: {
          value: 2,
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: true,
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "#333",
        },
        emphasis: {
          scale: true,
        },
        zlevel: 1,
      },
    ]);

    // 判断是否显示弹框
    let jumpBox = ref(false);

    onMounted(() => {
      echarts.registerMap("china", china);
      let myChart = echarts.init(document.getElementById("echarts"));

      let option = {
        geo: geoList.value,
        series: seriesList.value,
      };

      myChart.setOption(option);

      // 点击标签，将其定位为地图中心
      myChart.on("click", (params) => {
        // console.log(params.value);
        if (params.value) {
          // 该点坐标
          let thisscale = [params.value[0], params.value[1]];
          geoList.value = {
            ...geoList.value,
            center: thisscale,
            zoom: 2,
          };
          // console.log(geoList.value);
          myChart.setOption({
            geo: geoList.value,
          });

          jumpBox.value = true;
        }
      });

      // 滚轮事件
      myChart.on("scroll", function (params) {
        console.log(params);
      });
    });

    // 点击X
    const handleClose = () => {
      jumpBox.value = false;
    };

    return {
      jumpBox,
      handleClose,
    };
  },
};
</script>

<style>
.right-info {
  display: none;
  position: absolute;
  right: 8px;
  top: 66px;
  width: 320px;
  z-index: 11;
}

.right-info .territory-component {
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07);
  transition: height 0.3s ease;
}

.right-info .territory-component .territory-wrap {
  display: flex;
  flex-direction: column;
  padding: 8px 0 28px;
  height: 100%;
}

.territory-component .territory-wrap .title {
  padding: 12px 0;
  line-height: 20px;
  font-weight: 700;
  margin: 0 24px;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.22);
}

.desc-box {
  height: 352px;
  margin: 9px 16px 0 24px;
  flex: 1;
  overflow: auto;
}

.desc-box::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.desc-box::-webkit-scrollbar-thumb {
  background-color: #ccc;
}

.desc-box::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.territoryDesc {
  position: relative;
  padding-right: 8px;
  line-height: 18px;
  font-size: 12px;
  height: 100%;
  color: #666;
}

.close-icon {
  background-image: url(https://static.allhistory.com/online/view/Map/img/close-icon.f6a6.png);
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}

.active {
  display: block;
}
</style>

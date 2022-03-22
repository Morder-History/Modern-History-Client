<template>
  <section :class="toggle ? 'sec dark' : 'sec'">
    <template v-for="item in data" :key="item.id">
      <HomeCart :toggle="toggle" :item="item"></HomeCart>
    </template>
    <!-- 白天与黑夜切换 -->
    <div class="toggle">
      <i
        class="fa"
        :class="toggle ? 'fa-sun-o' : 'fa-moon-o'"
        aria-hidden="true"
        @click="handleToggle"
      ></i>
    </div>
    <!-- 链接跳转 -->
    <div class="homeToSelect">
      <router-link to="/people" target="_blank">
        跳转到人物查询 ——&gt;
      </router-link>
    </div>
  </section>
</template>

<script>
import HomeCart from "@/library/index/HomeCart";
import { ref } from "vue";

export default {
  setup() {
    // 白夜切换
    let toggle = ref(true);
    // 人物数据
    let data = [
      {
        id: 1,
        name: "萧山令",
        nation: "中国",
        // 生卒
        dead: "1892年6月11日—1937年12月13日",
        // 逝世原因
        deathCause: "南京陷落，力战殉国，为抗战而亡",
        // 图片
        photos: ["https://s1.ax1x.com/2022/03/22/qM40Hg.png"],
        // 生平
        life: "1937年12月12日拂晓，数路日军同时猛攻南京城。上午8时许，日军炮轰水西门、清凉山一带宪兵阵地，宪兵伤亡惨重，但仍然坚守不退。11时，萧山令命令宪兵增筑南京城内街垒工事，准备巷战，并激励宪兵与南京共存亡。午后4时，日本地面部队在空军配合下突破南京城南门，纷纷拥入城内。南京卫戍司令长官唐生智决定放弃南京，命令各路守军自行突围。萧山令当即派宪兵教导团占领龙蟠里、五台山一带阵地，掩护宪兵主力撤退。他命令宪兵主力循中山路出挹江门，移往下关，准备北渡长江。当时的南京城一片混乱，道途堵塞，行动十分滞缓。萧山令督队殿后，等他赶到江边时天已经黑了。江边船只极少，大量的撤退部队壅挤一地，争先抢渡，自相践踏和火拼。日军水路夹击而来。萧山令指挥未渡宪兵，辗转冲杀，终以弹尽援绝，力竭阵亡。同时牺牲的宪兵达数百人之多。1937年12月13日，带领将士在下关与日军展开肉搏血战，激战5小时，终因众寡悬殊，背水无援，数千将士壮烈牺牲。萧山令也大义凛然，举枪殉国，血染金陵，以自己的义举，实现了“誓与南京共存亡”的诺言，时年45岁。",
        // 简介
        introduction:
          "萧山令，字铁侬，湖南益阳人，保定陆军军官学校第三期步兵科毕业，国民革命军陆军南京卫戍军宪兵副司令，国民革命军陆军中将（追授）。",
      },
      {
        id: 2,
        name: "蒋介石",
        nation: "中国",
        dead: "1887年10月31日-1975年4月5日",
        deathCause: "在台北士林官邸逝世",
        photos: ["https://s4.ax1x.com/2022/01/06/TzinG8.jpg"],
        life: "1938年，蒋介石下令炸开黄河大堤以抵抗日军，淹死百姓89万人。1939年1月，蒋介石任国防最高委员会委员长。他对中国共产党和人民武装力量在抗战中迅速发展壮大忧心忡忡，乃实行溶共、防共、限共、反共的方针，不断制造反共摩擦。1941年12月太平洋战争爆发后，蒋介石积极开展外交活动，与美、英同盟，任中国战区最高统帅，得到了美国的物资和财政援助。他派中国远征军去缅甸，与英美联军联合作战，打通了中印公路。美、英为了联合中国共同抗击日本，许诺废除不平等条约所规定的在华特权，签订了中美、中英“新约”。1943年林森逝世后，继任国民政府主席。1943年11月，蒋介石出席开罗会议，与美国总统罗斯福、英国首相丘吉尔会谈对日联合作战方略及战后和平条件。1945年6月派宋子文等去苏联会谈，8月两国外长签署了《中苏友好同盟条约》及有关协定。",
        introduction:
          "蒋介石，原名瑞元，学名志清、中正，字介石。 浙江奉化人，是近代中国著名政治及军事人物，历任黄埔军校校长、国民革命军总司令、国民政府主席、行政院院长、国民政府军事委员会委员长、中华民国特级上将、中国国民党总裁、三民主义青年团团长、第二次世界大战同盟国中国战区最高统帅、中华民国总统等职。",
      },
      {
        id: 3,
        name: "李宗仁",
        nation: "中国",
        dead: "1891年8月13日-1969年1月30日",
        deathCause: "在北京逝世",
        photos: ["https://s4.ax1x.com/2022/01/06/TzkPHA.jpg"],
        life: "李宗仁，字德邻，广西桂林市临桂人。国民革命军陆军一级上将，中国国民党“桂系”首领，中华民国首任副总统、代总统。他是北伐战争中有着重要影响的一位人物，北伐前致力两广统一，奠定北伐的基础，促成北伐。",
        introduction:
          "1938年1月，任军事委员会委员。1938年2月至5月，指挥徐州会战。其中3月至4月的台儿庄战役，取得歼灭日军二万余人的重大胜利。1938年2月，兼任安徽省政府主席（1938年2月-1938年9月）、保安司令。1938年5月，徐州失守后，率部入鄂，在桐柏山、大洪山创立游击基地，坚持抗战。1938年6月10日，率部参加武汉会战。1939年4月至5月参加随枣会战。1941年1月至2月参加豫南会战。1943年9月调离第五战区，升任国民政府军事委员会委员长（蒋介石）汉中行营主任，负责指挥第一、第五、第十等三个战区。1945年5月在国民党第六次全国代表大会上，继续当选为中央监察委员会委员。",
      },
      {
        id: 4,
        name: "吴奇伟",
        nation: "中国",
        dead: "1891年—1953年7月10日",
        deathCause: "在北京病逝",
        photos: ["https://s4.ax1x.com/2022/01/06/Tz1WSH.jpg"],
        life: "吴奇伟，字晴云，号梧生。广东大埔人。国民革命军陆军中将，北伐名将、抗日名将。武昌陆军第二预备学校、保定陆军军官学校第六期步科、陆军大学将官班第一期毕业。",
        introduction:
          "1943年春夏之际，日军集结重兵沿长江西进，鄂西会战爆发。鄂西会战中，长江咽喉——石牌成为双方对垒的关键点，担任防守石牌重任的，正是吴奇伟的江防军。石牌保卫战打了近一周，江防军将士冒着日军重炮，在参天古树和悬崖峭壁间与日军激战，誓与要塞共存亡，最终打退日军无数次冲锋，让石牌成为无法逾越的鸿沟。石牌保卫战，是抗战中中国军队为数不多的以少胜多的战例之一，它的胜利，可以说是扭转鄂西会战战局的钥匙，不仅极大提升了军民的士气，而且成功粉碎了日军侵占重庆的企图。吴奇伟指挥鄂西会战克复了宜昌，取得了鄂西大捷。",
      },
    ];

    // 点击白天黑夜切换
    const handleToggle = () => {
      toggle.value = !toggle.value;
    };

    return {
      data,
      toggle,
      handleToggle,
    };
  },
  components: {
    HomeCart,
  },
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  background-color: #f0f8ff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.6s;

  .toggle {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 20px;
    right: 20px;
    background: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.5s;
    font-size: 20px;

    &:hover {
      transform: scale(1.1);
    }
  }

  .homeToSelect {
    position: absolute;
    bottom: 20px;
    right: 20px;

    a {
      font-size: 18px;
      font-weight: 100;
      text-decoration: none;
      color: #666;
    }
  }
}

/*黑夜*/
section.dark {
  background-color: #24292d;
}

section.dark {
  .card {
    background-color: #323840;
  }

  .toggle {
    background-color: #404852;
    color: #2fa1ff;
  }

  .homeToSelect {
    a {
      color: #ccc;
    }
  }
}
</style>

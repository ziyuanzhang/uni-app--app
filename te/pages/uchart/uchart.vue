<template>
  <view class="uchart">
    <canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
    <view class="list">
      <view
        class="item"
        v-for="(item,index) in PieObj.seriesArr"
        :key="index"
      >{{item.name}}{{item.data}}</view>
    </view>
    <button class="qiun-button" @tap="changeData()">更新图表</button>
  </view>
</template>

<script>
import uCharts from "@/plugins/u-charts/u-charts.js";

var canvaPie = null;
export default {
  data() {
    return {
      pixelRatio: 1,
      textarea: "",
      PieObj: {
        seriesArr: [
          {
            name: "一班",
            data: 50
          },
          {
            name: "二班",
            data: 30
          },
          {
            name: "三班",
            data: 20
          },
          {
            name: "四班",
            data: 18
          },
          {
            name: "五班",
            data: 8
          }
        ]
      }
    };
  },
  onLoad() {},
  mounted() {
    //uni.createSelectorQuery() 不能用在created周期
    let view = uni
      .createSelectorQuery()
      .in(this)
      .select(".charts");
    view
      .boundingClientRect(data => {
        //console.log('echart-view:', JSON.stringify(data));
        let chartData = {
          seriesArr: this.PieObj.seriesArr,
          width: data.width,
          height: data.height
        };
        this.showPie("canvasPie", chartData);
      })
      .exec();
  },
  methods: {
    showPie(canvasId, chartData) {
      canvaPie = new uCharts({
        $this: this,
        canvasId: canvasId,
        type: "pie",
        fontSize: 11,
        legend: {
          show: false
        },
        background: "#FFFFFF",
        pixelRatio: this.pixelRatio,
        series: chartData.series,
        animation: true,
        width: chartData.width * this.pixelRatio,
        height: chartData.height * this.pixelRatio,
        dataLabel: true,
        extra: {
          pie: {
            border: true,
            borderColor: "#FFFFFF",
            borderWidth: 3
          }
        }
      });
    },
    touchPie(e) {
      canvaPie.showToolTip(e, {
        format: function(item) {
          return item.name + ":" + item.data;
        }
      });
      canvaPie.touchLegend(e, { animation: true });
    },
    changeData() {
      canvaPie.updateData({
        series: this.PieObj.seriesArr
      });
    }
  }
};
</script>

<style lang="less">
.uchart {
  .charts {
    width: 750upx;
    height: 500upx;
    background-color: #ffffff;
  }
}
</style>

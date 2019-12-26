<template>
	<view class="uchart">
		<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
	    <button class="qiun-button" @tap="changeData()">更新图表</button>	
	</view>

</template>

<script>
import uCharts from '@/plugins/u-charts/u-charts.js';
var _self;

var canvaPie = null;
export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: ''
		};
	},
	onLoad() {
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		//_self.pixelRatio =1;
		this.getServerData()
	},

	methods: {
		getServerData() {
			//https://www.ucharts.cn/data.json
			let Pie = {
				series: [
					{
						name: '一班',
						data: 50
					},
					{
						name: '二班',
						data: 30
					},
					{
						name: '三班',
						data: 20
					},
					{
						name: '四班',
						data: 18
					},
					{
						name: '五班',
						data: 8
					}
				]
			};
			_self.textarea = JSON.stringify(Pie);
			_self.showPie('canvasPie', Pie);
		},
		showPie(canvasId, chartData) {
			canvaPie = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'pie',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						border: true,
						borderColor: '#FFFFFF',
						borderWidth: 3
					}
				}
			});
		},
		touchPie(e) {
			canvaPie.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
			canvaPie.touchLegend(e, { animation: true });
		},
		changeData() {
				let newdata = JSON.parse(_self.textarea);
				canvaPie.updateData({
					series: newdata.series,
					categories: newdata.categories
				});
		
		}
	}
};
</script>

<style lang="less">
.uchart {
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}
}
</style>

<template>
	<view class="sqLite-page"><view class="btn" @click="openDBFun()">openDB</view></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		openDBFun() {
			plus.sqlite.openDatabase({
				name: 'first',
				path: '_doc/test.db',
				success: function(e) {
					uni.showModal({
						title: '提示',
						content: 'openDatabase success!'
					});
				},
				fail: function(e) {
					uni.showModal({
						title: '提示',
						content: 'openDatabase failed: ' + JSON.stringify(e, null, 4)
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.sqLite-page {
	.btn {
		display: block;
		width: auto;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
}
</style>

<template>
	<view class="index-page" :class="themeName">
		<image class="logo" mode="widthFix" src="/static/img/logo.png"></image>

		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>

		<view class="list">
			<navigator class="item" url="/pages/sqLite/sqLite">sqLite</navigator>
			<navigator class="item" url="/pages/set/set">set</navigator>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			title: 'Hello---原始包'
			//title: 'Hello---热更新',
			//title: 'Hello---apk/api',
		};
	},
	computed: {
		...mapState(['themeName'])
	},
	onLoad() {},
	methods: {
		gotoFun(val) {}
	}
};
</script>

<style lang="less">
.index-page {
	.logo {
		display: block;
		text-align: center;
		width: 25%;
		margin: 20px auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
		.title {
			font-size: 36rpx;
		}
	}

	.list {
		padding: 10px 20px;
		.item{
			margin-bottom: 5px;
			text-decoration: underline;
		}
	}
}
</style>

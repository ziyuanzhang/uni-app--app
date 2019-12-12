<template>
	<view class="set-page" :class="themeName">
		<view class="color-set">
			<view class="btn btn-default" @click="setThemeFun('default')">default</view>
			<view class="btn btn-green" @click="setThemeFun('green')">green</view>
			<view class="btn btn-red" @click="setThemeFun('red')">red</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['themeName'])
	},

	mounted() {},
	methods: {
		setThemeFun(val) {
			this.$store.commit("submitTheme",`theme-${val}`); 
		}
	}
};
</script>

<style lang="less" scoped>
.set-page {
	.color-set {
		.btn {
			display: block;
			margin-bottom: 5px;
			text-decoration: underline;
		}
	}
}
</style>

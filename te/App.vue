<script>
import api from './common/api.js';
import nativeComponent from './common/nativeComponent.js';

export default {
	onLaunch: function() {
		console.log('App Launch');
		// api.checkUpdate(true);
		let systemInfo = uni.getSystemInfoSync();

		let logoObj = { logoSrc: '/static/img/logo.png', logoW: '72', logoH: '72' };
		let TXTObj = { txt: '开始下载:0%' };
		nativeComponent.drawProgress('progress', systemInfo, logoObj, TXTObj);

		let timer = setTimeout(() => {
			let num = 1;
			let setTime = setInterval(() => {
				if (num < 100) {
					num++;
					nativeComponent.changeProgress('progress', systemInfo, num);
				} else {
					nativeComponent.closeProgress('progress')
					clearInterval(setTime);
				}
			}, 50);
			clearTimeout(timer);
		}, 0);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>
<style lang="less">
@import url('./static/css/theme.less');
.theme-default {
	.themeSet(#8f8f94);
}
.theme-red {
	.themeSet(red);
}
.theme-green {
	.themeSet(green);
}
</style>

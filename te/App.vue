<script>
import api from './common/api.js';

export default {
	onLaunch: function() {		
		console.log('App Launch');
		// api.checkUpdate(true);
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
@import url('./assets/theme.less');
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

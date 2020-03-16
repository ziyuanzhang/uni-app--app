<script>
 import api from './common/api.js';


export default {
	onLaunch: function() {		
		plus.screen.lockOrientation('landscape-secondary');
		let systemInfo = uni.getSystemInfoSync();
		//console.log("systemInfo:",systemInfo)
		
		if(systemInfo.platform=="android"){
			nativeSet.windowFull(1);
		}	
		
		
		
		console.log('App Launch');
		// api.checkUpdate(true);
		// api.sendPushClientInfo();
        // api.pushMessage();
		
		
		// {"title":"ceshibiaoti","content":"ceshineirong","payload":"test"}
		// intent:#Intent;action=android.intent.action.oppopush;launchFlags=0x14000000;component=uni.UNI8B016FC/io.dcloud.PandoraEntry;S.UP-OL-SU=true;S.title=测试标题;S.content=测试内容;S.payload=test;end
        // intent:#Intent;component=uni.UNI8B016FC;S.parm1=value1;S.parm2=value2;end
        // intent:#Intent;component=你的包名/你要打开的 activity 全路径;S.parm1=value1;S.parm2=value2;end

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

let nativeComponent = {
	drawProgress: (viewId, systemInfo, logoObj, TXTObj) => {
		let {
			windowWidth,
			windowHeight
		} = systemInfo;
		// console.log("info--windowWidth:",JSON.stringify(windowWidth),null,4);	
		// console.log("info--windowHeight:",JSON.stringify(windowHeight),null,4);	

		let containerW = windowWidth - 60;
		let containerH = 200;

		let {
			logoSrc,
			logoW,
			logoH
		} = logoObj;
		let {
			txt
		} = TXTObj;

		let imgTop = (windowHeight - containerH - logoH) / 2;
		let progressBGW = containerW - 40;
		let progressBGTop = windowHeight / 2 + 40;
		let progressLeft = (windowWidth - containerW) / 2 + 20;

		let view = new plus.nativeObj.View(viewId, {
			top: '0px',
			left: '0px',
			height: '100%',
			width: '100%'
		});
		view.drawRect({
			color: 'rgba(0,0,0,0.5)'
		}, {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		}, 'bg');


		view.drawRect({
			color: 'rgba(ff,ff,ff)',
			borderWidth: '2px',
			radius: '5px'
		}, {
			top: 'auto',
			left: 'auto',
			width: containerW + 'px',
			height: containerH + 'px'
		}, 'container');


		view.drawBitmap(logoSrc, {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		}, {
			top: imgTop + 'px',
			left: 'auto',
			width: logoW + 'px',
			height: logoH + 'px'
		}, 'img');


		view.drawText(txt, {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		}, {
			size: '22px',
			color: '#FF0000'
		}, 'txt');


		view.drawRect({
			color: '#cccccc',
			radius: '100px'
		}, {
			top: progressBGTop + 'px',
			left: progressLeft + 'px',
			width: progressBGW + 'px',
			height: '20px'
		}, 'progressBG');

		view.show();
	},
	changeProgress: (viewId, systeminfo, num) => {
		let {
			windowWidth,
			windowHeight
		} = systeminfo

		let containerW = windowWidth - 60;
		let containerH = 200;

		let progressBGW = containerW - 40;
		let progressBGTop = windowHeight / 2 + 40;
		let progressLeft = (windowWidth - containerW) / 2 + 20;

		let nativeV = plus.nativeObj.View.getViewById(viewId);
		nativeV.drawText('下载进度：' + num + '%', {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		}, {
			size: '22px',
			color: '#FF0000'
		}, 'txt');

		nativeV.drawRect({
			color: '#1AA034',
			radius: '100px'
		}, {
			top: progressBGTop + 'px',
			left: progressLeft + 'px',
			width: progressBGW * (num / 100) + 'px',
			height: '20px'
		}, 'progress');
	},
	closeProgress: (viewId) => {
		let nativeV = plus.nativeObj.View.getViewById(viewId);
		nativeV.close();
	}
}

export default nativeComponent

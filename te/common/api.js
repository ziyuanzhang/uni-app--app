import Request from '@/plugins/request/index';
let $http = Request();
let api = {
	checkUpdate: function(manualCheck) {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			$http
				.post('/checkUpdate', {
					data: {
						appid: plus.runtime.appid,
						version: widgetInfo.version,
						name: widgetInfo.name,
						imei: plus.device.imei,
						phoneType: plus.os.name
					}
				})
				.then(res => {
					// uni.showModal({
					// 	title: '返回结果',
					// 	content: JSON.stringify(res,null,4)
					// })
					if (res.statusCode == 200 && res.data.isUpdate) {
						uni.showModal({
							title: '更新提示',
							content: res.data.msg ? res.data.msg : '是否选择更新',
							success: showResult => {
								if (showResult.confirm) {
									if (res.data.selfUrl) {
										let showLoading = plus.nativeUI.showWaiting('开始下载');
										$http
											.download(res.data.selfUrl, {
												onProgressUpdate(res) {
													showLoading.setTitle('  正在下载' + res.progress + '%  ');
												}
											})
											.then(res => {
												showLoading.setTitle('请稍等，正在安装');
												plus.runtime.install(
													res.tempFilePath, {
														force: false
													},
													function() {
														showLoading.setTitle(' -- 安装成功');
														setTimeout(function() {
															plus.nativeUI.closeWaiting();
															plus.runtime.restart();
														}, 2000);
													},
													function(e) {
														plus.nativeUI.closeWaiting();
														uni.showModal({
															title: '安装失败',
															content: JSON.stringify(e, null, 4)
														})
													}
												);
											});
									} else {
										plus.runtime.openURL(res.data.openUrl);
									}
								}
							}
						});
					} else {
						if (manualCheck) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							});
						}

					}
				});
		});
	}
}
export default api

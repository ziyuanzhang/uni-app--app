let dbName = "padOrderdb";
let language = uni.getStorageSync("language") ? uni.getStorageSync("language") : "zh";
let createDatabaseFailTXT = language == 'zh' ? '创建数据库失败' : 'Failed to create database';
let createTableFailTXT = language == 'zh' ? '创建表失败' : 'Failed to create Table creation';
let changeTableFailTXT = language == 'zh' ? '改变表中数据失败' : 'Failed to change data in table';
let lookupTableFailTXT = language == 'zh' ? '查询表失败' : 'Failed to Lookup table';
let deleteTableFailTXT = language == 'zh' ? '删除表失败' : 'Failed to delete table';

let util = {
	toast: (data, callback) => {
		uni.showToast({
			title: data ? data : '',
			icon: 'none',
			success: function (res) {
				if (fun) {
					let timeoutName = setTimeout(function () {
						clearTimeout(timeoutName);
						callback();
					}, 1500)
				}
			}
		});
	},
	toastSuccess: (data, callback) => {
		uni.showToast({
			title: data ? data : '',
			image: "/static/img/icon-success.png",
			success: function (res) {
				if (fun) {
					let timeoutName = setTimeout(function () {
						clearTimeout(timeoutName);
						callback();
					}, 1500)
				}
			}
		});
	},
	toastFail: (data, callback) => {
		uni.showToast({
			title: data ? data : '',
			image: "/static/img/icon-fail.png",
			success: function (res) {
				if (fun) {
					let timeoutName = setTimeout(function () {
						clearTimeout(timeoutName);
						callback();
					}, 1500)
				}
			}
		});
	},
	guid: () => {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	},
	openDBFun: () => {
		let th = this;
		let pd = plus.sqlite.isOpenDatabase({
			name: dbName,
			path: `_doc/sqLite/${dbName}.db`
		});
		return new Promise(function (resolve, reject) {
			if (!pd) {
				plus.sqlite.openDatabase({
					name: dbName,
					path: `_doc/sqLite/${dbName}.db`,
					success: function (e) {
						resolve("success");
					},
					fail: function (e) {
						console.log(`${createDatabaseFailTXT}: JSON.stringify(e)`);
						th.toast(`${createDatabaseFailTXT}:JSON.stringify(e)`)
						//th.openDBFun();
					}
				});
			} else {
				resolve("success");
			}
		})
	},
	createTableFun: (createTableSQL, insertIntoSQL) => {
		let th = this;
		let pd = plus.sqlite.isOpenDatabase({
			name: dbName,
			path: `_doc/sqLite/${dbName}.db`
		});
		return new Promise(function (resolve, reject) {
			if (pd) {
				plus.sqlite.executeSql({
					name: dbName,
					sql: createTableSQL, //'create table if not exists database("where" CHAR(110),"location" CHAR(100),"age" INT(11))',
					success: function (e) {
						//console.log('executeSql success!--创建');
						plus.sqlite.executeSql({
							name: dbName,
							sql: insertIntoSQL, //"insert into database values('北京','安乐林','11')",
							success: function (e) {
								//console.log('executeSql success!--插入值');
								resolve("success");
							},
							fail: function (e) {
								console.log('executeSql failed: ' + JSON.stringify(e));
								th.toast(`${changeTableFailTXT}:${JSON.stringify(e)}`)
							}
						});
					},
					fail: function (e) {
						// console.log('executeSql failed: ' + JSON.stringify(e));
						th.toast(`${createTableFailTXT}:${JSON.stringify(e)}`)
					}
				});
			}
		})
	},
	selectSqlFun: (inquireSQL) => {
		let th = this;
		let pd = plus.sqlite.isOpenDatabase({
			name: dbName,
			path: `_doc/sqLite/${dbName}.db`
		});
		return new Promise(function (resolve, reject) {
			if (pd) {
				plus.sqlite.selectSql({
					name: dbName,
					sql: inquireSQL, //'select * from database',
					success: function (data) {
						//console.log('selectSql success!--获取成功:' + JSON.stringify(data, null, 4));
						resolve(data);
					},
					fail: function (e) {
						//console.log('selectSql failed: --获取失败:' + JSON.stringify(e));
						th.toast(`${lookupTableFailTXT}:${JSON.stringify(e)}`)
					}
				});
			}
		})
	},
	dropTableFun: (dropTableSQL) => {
		let th = this;
		let pd = plus.sqlite.isOpenDatabase({
			name: dbName,
			path: `_doc/sqLite/${dbName}.db`
		});
		return new Promise(function (resolve, reject) {
			if (pd) {
				plus.sqlite.executeSql({
					name: dbName,
					sql: dropTableSQL, //"drop table if exists database",
					success: function (e) {
						//console.log('executeSql success!--删除表成功');
						resolve("success");
					},
					fail: function (e) {
						//console.log('executeSql failed--删除表失败: ' + JSON.stringify(e));
						th.toast(`${deleteTableFailTXT}:${JSON.stringify(e)}`)
					}
				});
			}
		})
	},

}
export default util;

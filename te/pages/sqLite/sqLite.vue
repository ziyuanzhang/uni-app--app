<template>
	<view class="sqLite-page" :class="themeName">
		<view class="btn" @click="openDBFun()">openDB</view>
		<view class="btn" @click="colseDBFun()">colseDB</view>
		<view class="btn" @click="createTableFun()">createTable</view>
		<view class="btn" @click="selectSqlFun()">selectSql</view>
		<view class="btn" @click="dropTableFun()">dropTable</view>
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
	methods: {
		openDBFun() {
			let pd = plus.sqlite.isOpenDatabase({ name: 'first', path: '_doc/sqLite/test.db' });
			if (!pd) {
				plus.sqlite.openDatabase({
					name: 'first',
					path: '_doc/sqLite/test.db',
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
			} else {
				uni.showModal({
					title: '提示',
					content: '数据库已经打开:' + JSON.stringify(pd, null, 4)
				});
			}
		},
		colseDBFun() {
			let pd = plus.sqlite.isOpenDatabase({ name: 'first', path: '_doc/sqLite/test.db' });
			if (pd) {
				plus.sqlite.closeDatabase({
					name: 'first',
					success: function(e) {
						uni.showModal({
							title: '提示',
							content: '数据库--关闭成功'
						});
					},
					fail: function(e) {
						uni.showModal({
							title: '提示',
							content: '数据库--关闭失败:' + JSON.stringify(e, null, 4)
						});
					}
				});
			}
		},
		createTableFun() {
			let pd = plus.sqlite.isOpenDatabase({ name: 'first', path: '_doc/sqLite/test.db' });
			if (pd) {
				plus.sqlite.executeSql({
					name: 'first',
					sql: 'create table if not exists database("where" CHAR(110),"location" CHAR(100),"age" INT(11))',
					success: function(e) {
						console.log('executeSql success!--创建');
						plus.sqlite.executeSql({
							name: 'first',
							sql: "insert into database values('北京','安乐林','11')",
							success: function(e) {
								console.log('executeSql success!--插入值');
							},
							fail: function(e) {
								console.log('executeSql failed: ' + JSON.stringify(e));
							}
						});
					},
					fail: function(e) {
						console.log('executeSql failed: ' + JSON.stringify(e));
					}
				});
			}
		},
		selectSqlFun() {
			let pd = plus.sqlite.isOpenDatabase({ name: 'first', path: '_doc/sqLite/test.db' });
			if (pd) {
				plus.sqlite.selectSql({
					name: 'first',
					sql: 'select * from database',
					success: function(data) {
						console.log('selectSql success!--获取:' + JSON.stringify(data, null, 4));
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			}
		},
		dropTableFun(){
			let pd = plus.sqlite.isOpenDatabase({ name: 'first', path: '_doc/sqLite/test.db' });
			if (pd) {
				plus.sqlite.executeSql({
					name: 'first',
					sql: "drop table if exists database",
					success: function(e) {
						console.log('executeSql success!--删除表');
					},
					fail: function(e) {
						console.log('executeSql failed: ' + JSON.stringify(e));
					}
				});
			}
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
		margin-bottom: 10px;
	}
}
</style>

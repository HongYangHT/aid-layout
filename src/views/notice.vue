<template>
<div class="crm-wrapper">
	<!--面包屑star-->
	<div class="bread-crumbs">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
				<t-breadcrumb separator=">">
					<t-breadcrumb-item href="/">{{$t('frame.home')}}</t-breadcrumb-item>
					<t-breadcrumb-item>{{$t('frame.listDetail')}}</t-breadcrumb-item>
				</t-breadcrumb>
			</div>
		</div>
	</div>
    <!--面包屑 end-->
	<div class="enquiries mt-10">
		<p class="text-center">{{bullet.bulletinTitle}}</p>
		<div class="text-left text-in" v-html="bullet.bulletinContent"></div>
		<p class="text-right">{{bullet.bulletinPublisher}}</p>
		<p class="text-right">{{bullet.createTimeString}}</p>
  </div>
	<div class="enquiries mt-10" v-if="bullet.files">
		<!-- 标题 star-->
		<div class="enquiries-title">
			<span></span>{{$t('frame.relatedFiles')}}
		</div>
		<div class="enquiries-form">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
					<div class="row">
	  					<div class="col-12 user-lst">
	  						<ul class="menu">
	  							<li class="lt">{{$t('frame.relatedFiles')}}:</li>
	  							<li class="rt"><a :href="bullet.files" target="_self"><t-icon type="aid-menu aid-file-document"></t-icon>{{$t('frame.doc')}}</a></li>
	  						</ul>
	  					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import { getQuery } from '../utils/utils.js'
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				// bulletinContent:'',
				bullet: {}
			}
		},
		filters: {
			format: function (param) {
				if (!param || param < 0) return ''
				let crt = new Date(param)
				function Format (format) {
					let fmt = format
					if (!fmt) fmt = 'yyyy/MM/dd HH:mm:ss'
					let o = {
		        "M+": crt.getMonth() + 1, //月份
		        "d+": crt.getDate(), //日
		        "h+": crt.getHours(), //小时
		        "m+": crt.getMinutes(), //分
		        "s+": crt.getSeconds(), //秒
		        "q+": Math.floor((crt.getMonth() + 3) / 3), //季度
		        "S": crt.getMilliseconds() //毫秒
			    };
			    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (crt.getFullYear() + "").substr(4 - RegExp.$1.length))
			    for (let k in o)
			    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
			    return fmt
				}

				return Format('yyyy/MM/dd hh:mm:ss')
			}
		},
		computed: {
      ...mapState({
        instance: state => state.storeModule.instance,
        authorization: state => state.storeModule.authorization
      })
    },
    watch: {
    	'$route' (to, from) {
	      // 对路由变化作出响应...
	      this.getBulletinById()
	    }
    },
		methods: {
			getBulletinById () {
				let bulletinId = this.$route.params.bulletinId || getQuery('bulletinId')
				this.instance.get(this.authorization.bulletinByIdUri, {
					params: {
						bulletinId: bulletinId
					}
				}).then(res => {
					this.bullet = res.data
					this.bullet.bulletinContent = res.data.bulletinContent.replace(/(\\n)/g, '')
				}).catch(res => {
					this.$Message.warning(this.$t('frame.warning'))
				})
			}
		},
		mounted () {
			/**
			 * 做延时处理
			 */
			setTimeout(() => {
				this.getBulletinById()
			}, 300)
		}
	}
</script>
<style lang="scss" scoped>
	@import './notice.scss'
</style>
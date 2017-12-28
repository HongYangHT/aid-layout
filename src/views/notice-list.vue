<template>
<div class="crm-wrapper">
	<!--面包屑star-->
	<div class="bread-crumbs">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
				<t-breadcrumb separator=">">
					<t-breadcrumb-item href="/">{{$t('frame.home')}}</t-breadcrumb-item>
					<t-breadcrumb-item>{{$t('frame.list')}}</t-breadcrumb-item>
				</t-breadcrumb>
			</div>
		</div>
	</div>
    <!--面包屑 end-->
    <div class="enquiries mt-10" style="padding:0px 0px 20px 0px;">
        <div class="enquiries-title">
            <span></span>{{$t('frame.title')}}
        </div>
        <div class="notice-list-wrap" v-for="item in items" @click="navToDetail(item)">
            <div class="n-l-title">
                <span>{{item.bulletinTitle}}</span>
                <i class="tips-top" v-if="parseInt(item.topFlag) === 1">{{$t('frame.top')}}</i>
            </div>
            <div class="n-l-content">
                <p class="text-right n-l-time">{{item.bulletinPublisher}} <em>{{item.createTimeString}}</em></p>
            </div>
        </div>
    </div>
    <div class="notice-pager">
        <t-pager :total="total" :page-size="pageSize" :sizer-range="sizerRange" @on-change="handleOnPagerChange" @on-size-change="handleOnPagerSizeChange" show-elevator show-sizer></t-pager>
    </div>
</div>
</template>
<script>
    import { getQuery } from '../utils/utils.js'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                total: 0,
                pageSize: 10,
                sizerRange: [10, 15, 20, 50],
                pageNo: 1,
                items: []
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
        methods: {
            navToDetail (item) {
                const bulletinId = item.bulletinId
                this.$router.push({ name: 'notice', params: { bulletinId }})
                // this.$router.push({ path: `notice/${item.bulletinId}` })
                // this.$router.push({ path: '/notice', query: { bulletinId: item.bulletinId } })
            },
            handleOnPagerChange (item) {
                this.pageNo = item
                this.getBulletinList()
            },
            handleOnPagerSizeChange (item) {
                this.pageSize = item
                this.pageNo = 1
                this.getBulletinList()
            },
            getBulletinList (params) {
                this.$nextTick(() => {
                    this.instance.get(this.authorization.bulletinListUri, {
                        params: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        }
                    }).then(res => {
                        let data = res.data
                        this.total = data.count
                        this.pageSize = data.pageSize
                        this.pageNo = data.pageNo
                        if (data.result && data.result.length) {
                            this.items = data.result.sort((a,b) => {
                                return parseInt(a.topFlag) - parseInt(b.topFlag)
                            })
                        }
                    }).catch(res => {
                        this.$Message.warning(this.$t('frame.warning'))
                    })
                })
            }
        },
        mounted () {
            /**
             * 等待首次加载生效
             */
            setTimeout(() => {
                this.getBulletinList()
            }, 300)
        }
    }
</script>
<style lang="scss" scoped>
	@import './notice.scss'
</style>
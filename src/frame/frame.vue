<template>
	<div class="layout layout--one-screen bg-gray-lightest-5">
		<div :class="['menu-backdrop d-xl-none',{'show': isOpenOnMinWin === false}]" @click="closeMenuOnMinWin"></div>
		<div :class="['layout-sidebar',{'layout-sidebar--folded': isOpen === false},{'show': isOpenOnMinWin === false}]">
			<div class="layout-logo-left">
				<slot name="frame-header">
					<span v-if="logoRouter">
						<router-link :to="logoRouter">
			        <img :src="img" alt="" class="layout-logo-img"/>
			        <img :src="imgMin" alt="" class="layout-logo-min-img"/>
		        </router-link>
					</span>
					<span v-else>
	        	<img :src="img" alt="" class="layout-logo-img"/>
						<img :src="imgMin" alt="" class="layout-logo-min-img"/>
					</span>
				</slot>
				<a href="javascript:;" class="d-none d-xl-block thumb-icon" v-if="showMenu">
					<t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose"></t-icon>
				</a>
			</div>
			<div :class="['layout-menu', {'menu--folded': isOpen === false}, {'menu--fold--show': clientWidth > 1200}, {'menu--fold--min': clientWidth <= 1199}]">
				<slot name="frame-menu">
					<t-menu
						type="light"
						:active-name="queryActiveMenu"
						:open-names="queryOpenName"
            :open-position="openPosition"
            :accordion="accordion"
            :class="[{'menu--folded': isOpen === false && clientWidth > 1200}]"
            @on-select="hdMenuClick"
            ref="sidebarMenu">
							<template v-for="(item1, x) in treeData">
								<t-submenu :name="item1.menuName" v-if="item1.children && item1.children.length">
									<template slot="title">
										<t-icon :type="item1.menuIcon" v-if="item1.menuIcon"></t-icon>
										<t-avatar size="sm" bg-state="success" :text="item1.rightTag" :dot="false" v-else></t-avatar>
						        <router-link :to="{ path: item1.menuUrl }" v-if="(item1.rightTag === tag && item1.menuUrl) || (!item1.rightTag && item1.menuUrl)">
				            	<span class="sub-text" :title="item1.menuName">{{item1.menuName}}</span>
						        </router-link>
						        <a href="javascript:;" @click="handleOtherRegin(item1.systemUrl + item1.menuUrl)" target="_self" v-else-if="item1.systemUrl && item1.menuUrl && item1.rightTag !== tag">
						        	<span class="sub-text" :title="item1.menuName">{{item1.menuName}}</span>
						        </a>
						        <span class="sub-text" :title="item1.menuName" v-else>{{item1.menuName}}</span>
				          </template>
									<template v-for="(item2, y) in item1.children">
										<t-submenu v-if="item2.children && item2.children.length" :name="item2.menuName" class="second-submenu">
											<template slot="title">
					            	<router-link :to="{ path: item2.menuUrl}" v-if="(item2.rightTag === tag && item2.menuUrl) || (!item2.rightTag && item2.menuUrl)">
						            	<span class="sub-text" :title="item2.menuName">{{item2.menuName}}</span>
								        </router-link>
								        <a href="javascript:;" @click="handleOtherRegin(item2.systemUrl + item2.menuUrl)" target="_self" v-else-if="item2.systemUrl && item2.menuUrl && item2.rightTag !== tag">
								        	<span class="sub-text" :title="item2.menuName">{{item2.menuName}}</span>
								        </a>
								        <span class="sub-text" :title="item2.menuName" v-else>{{item2.menuName}}</span>
					            </template>
					            <template v-for="(item3, z) in item2.children">
					            	<t-submenu v-if="item3.children && item3.children.length" :name="item3.menuName" :id="x + '' +y" class="second-submenu">
					            		<t-menu-item v-for="(item4, w) in item3.children" :name="item4.menuName" :key="w" @click.native="getMenu(item4)" class="sec-item">
							            	<router-link :to="{ path: item4.menuUrl }" v-if="(item4.rightTag === tag && item4.menuUrl) || (!item4.rightTag && item4.menuUrl)">
								            	<span class="sub-text" :title="item4.menuName">{{item4.menuName}}</span>
										        </router-link>
										        <a href="javascript:;" @click="handleOtherRegin(item4.systemUrl + item4.menuUrl)" target="_self" v-else-if="item4.systemUrl && item4.menuUrl && item4.rightTag !== tag">
										        	<span class="sub-text" :title="item4.menuName">{{item4.menuName}}</span>
										        </a>
										        <span class="sub-text" :title="item4.menuName" v-else>{{item4.menuName}}</span>
							            </t-menu-item>
					            	</t-submenu>
						            <t-menu-item :name="item3.menuName" :key="z" @click.native="getMenu(item3)" class="sec-item" v-else>
						            	<router-link :to="{ path: item3.menuUrl }" v-if="(item3.rightTag === tag && item3.menuUrl) || (!item3.rightTag && item3.menuUrl)">
							            	<span class="sub-text" :title="item3.menuName">{{item3.menuName}}</span>
									        </router-link>
									        <a href="javascript:;" @click="handleOtherRegin(item3.systemUrl + item3.menuUrl)" target="_self" v-else-if="item3.systemUrl && item3.menuUrl && item3.rightTag !== tag">
									        	<span class="sub-text" :title="item3.menuName">{{item3.menuName}}</span>
									        </a>
									        <span class="sub-text" :title="item3.menuName" v-else>{{item3.menuName}}</span>
						            </t-menu-item>
					            </template>
										</t-submenu>
										<t-menu-item :name="item2.menuName" v-else>
											<router-link :to="{ path: item2.menuUrl }" v-if="(item2.rightTag === tag && item2.menuUrl) || (!item2.rightTag && item2.menuUrl)">
					            	<span class="sub-text" :title="item2.menuName">{{item2.menuName}}</span>
							        </router-link>
							        <a href="javascript:;" @click="handleOtherRegin(item2.systemUrl + item2.menuUrl)" target="_self" v-else-if="item2.systemUrl && item2.menuUrl && item2.rightTag !== tag">
							        	<span class="sub-text" :title="item2.menuName">{{item2.menuName}}</span>
							        </a>
							        <span class="sub-text" :title="item2.menuName" v-else>{{item2.menuName}}</span>
										</t-menu-item>
									</template>
								</t-submenu>
								<t-menu-item :name="item1.menuName" v-else>
									<t-icon :type="item1.menuIcon" v-if="item1.menuIcon"></t-icon>
									<t-avatar size="sm" bg-state="success" :text="item1.rightTag" :dot="false" v-else></t-avatar>
					        <router-link :to="{ path: item1.menuUrl }" v-if="(item1.rightTag === tag && item1.menuUrl) || (!item1.rightTag && item1.menuUrl)">
			            	<span class="sub-text" :title="item1.menuName">{{item1.menuName}}</span>
					        </router-link>
					        <a href="javascript:;" @click="handleOtherRegin(item1.systemUrl + item1.menuUrl)" target="_self" v-else-if="item1.systemUrl && item1.menuUrl && item1.rightTag !== tag">
					        	<span class="sub-text" :title="item1.menuName">{{item1.menuName}}</span>
					        </a>
					        <span class="sub-text" :title="item1.menuName" v-else>{{item1.menuName}}</span>
								</t-menu-item>
							</template>
			    </t-menu>
				</slot>
			</div>
    </div>
    <div class="layout-content">
    	<div class="layout-nav navbar navbar-expand-lg bg-white align-items-center layout-nav--top">
				<div class="row nav-row">
					<div class="col col-6 nav-col">
						<a href="javascript:;" class="d-xm-block thumb-icon" v-show="!showMenu">
		      		<t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose"></t-icon>
		      	</a>
				  	<slot name="frame-nav-left"></slot>
					</div>
					<div class="col col-6 nav-col nav-col--right">
		    		<slot name="frame-nav">
		    			<t-menu
								mode="horizontal"
								type="light"
								@on-select="handleNavSelect"
								class="menu-span"
		    			>
		    				<template v-for="(item, x) in navs">
		    					<t-submenu v-if="item.children" :name="x">
		    						<template slot="title">
											<t-icon :type="item.icon" v-if="item.icon"></t-icon>
											<span class="sub-text" v-if="item.name">{{item.name}}</span>
					          </template>
										<t-menu-item v-for="(item1, index) in item.children" :key="index + 'item'" :name="x + '' + index">
			    						<t-icon :type="item1.icon" v-if="item1.icon"></t-icon>
						        	<span class="sub-text" v-if="item1.name">{{item1.name}}</span>
			    					</t-menu-item>
		    					</t-submenu>
		    					<t-menu-item :name="x" v-else>
		    						<t-badge dot state="danger" v-if="item.icon === 'bell' && count">
		    							<span @click="showSlipbox">
				    						<t-icon :type="item.icon" v-if="item.icon"></t-icon>
							        	<span class="sub-text" v-if="item.name">{{item.name}}</span>
						        	</span>
					        	</t-badge>
					        	<template v-else-if="item.icon === 'bell'">
					        		<span @click="showSlipbox">
						        		<t-icon :type="item.icon" v-if="item.icon"></t-icon>
							        	<span class="sub-text" v-if="item.name">{{item.name}}</span>
							        </span>
					        	</template>
					        	<template v-else>
					        		<a href="javascript:;" target="_self" v-if="item.handleType && item.handleType === 'logout'" @click="handleLogout(item)">
						        		<t-icon :type="item.icon" v-if="item.icon"></t-icon>
								        <span class="sub-text" v-if="item.name">{{item.name}}</span>
								      </a>
								      <span v-else>
								      	<t-icon :type="item.icon" v-if="item.icon"></t-icon>
								        <span class="sub-text" v-if="item.name">{{item.name}}</span>
								      </span>
					        	</template>
		    					</t-menu-item>
		    				</template>
		    			</t-menu>
		    		</slot>
		    		<t-button type="outline-secondary" size="sm" class="btn-lang" @click="handleChangeLang">{{lang}}</t-button>
					</div>
				</div>
    	</div>
    	<div class="slipbox__container" v-clickout-side="handleClickoutSide">
	    	<div class="slipbox__content" :class="[{'close': hideSlip}]">
	    		<div class="slipbox__close" @click="hideSlipbox">
	    			<a href="javascript:;" target="_self"><t-icon type="close"></t-icon></a>
	    		</div>
	    		<div class="slipbox__body">
	    			<slot name="slipbox-body">
			    		<t-tabs>
					      <t-tab-panel :label="$t('frame.sysInform')" name="tab-1">
					      	<div class="notice-wrap" v-for="(item, index) in notices" :class="{'notice-active': isActive === index}" @click="handleNoticeClick(index, item)">
					      		<span class="nw-l"><t-tag state="info">info</t-tag></span>
									  <span class="nw-r">
										  <p class="nw-r-title">{{item.bulletinTitle}}</p>
										  <p class="nw-r-time">{{$t('frame.expiryDate')}}：{{item.activeTime | format}} {{$t('frame.to')}} {{item.inactiveTime | format}}</p>
									  </span>
					      	</div>
								  <p class="notice__loading"><a href="javascript:;" target="_self"  @click="loadingMore">{{$t('frame.loadingMore')}}</a></p>
							  </t-tab-panel>
					    </t-tabs>
					  </slot>
	    		</div>
	    	</div>
    	</div>
    	<div class="layout-main">
    		<div class="layout-main--content">
        	<router-view></router-view>
	        <div class="pager-footer">
	        	<p>©️ 2017 China Mobile International Limited. All rights reserved.</p>
	        </div>
        </div>
      </div>
    </div>
		<div class="slide-wrap-content" :class="[{'slideWrapClose': hideSlideWrapSlip}]">
			<t-icon type="close" size="36" class="icon-close mr-5 mt-3" @click.native="handleClickClose"></t-icon>
		</div>
	</div>
</template>
<script>
	import ClickoutSide from './clickoutside.js'
	import LocalStorage from '../utils/localStorage.js'
	import { transData, getQueryData, getQuery, uuid } from '../utils/utils.js'
	import * as Constant from '../store/constant.js'
	import { mapMutations } from 'vuex'
	import { Base64 } from 'js-base64'
	import QueryString from 'query-string'
	let localStorage = new LocalStorage()

	let timeout = null

	let throttle = function (func, wait, options) {
	  let context
	  let args
	  let result
	  // 上次执行时间点
	  let previous = 0
	  if (!options) options = {}
	  // 延迟执行函数
	  let later = function () {
	    // 若设定了开始边界不执行选项，上次执行时间始终为0
	    previous = options.leading === false ? 0 : new Date().getTime()
	    timeout = null
	    result = func.apply(context, args)
	    if (!timeout) context = args = null
	  }
	  return function () {
	    let now = new Date().getTime()
	    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
	    if (!previous && options.leading === false) previous = now
	    // 延迟执行时间间隔
	    let remaining = wait - (now - previous)
	    context = this
	    args = arguments
	    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
	    // remaining大于时间窗口wait，表示客户端系统时间被调整过
	    if (remaining <= 0 || remaining > wait) {
	      clearTimeout(timeout)
	      timeout = null
	      previous = now
	      result = func.apply(context, args)
	      if (!timeout) context = args = null
	    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining)
	    }
	    return result
	  }
	}

	export default {
		name: 'TFrame',
		props: {
			img: {
				type: String
			},
			imgMin: {
				type: String
			},
			// logo 路由
			logoRouter: {
				type: Object,
				default: () => {
					return {
						path: '/'
					}
				}
			},
			// 当前展开的menu
			activeMenu: {
				type: [ String, Number ]
			},
			openNames: {
				type: [ Array ]
			},
			/**
			 * 渲染menu菜单
			 * {
			 * 	menuIcon, 一级菜单的右侧icon的type，对应的是aidesign的图标库
			 *  menuId, menu 的id,
			 *  menuPid, menu 的父节点的id
			 *  menuName, menu 的name,
			 *  menuUrl, menu 的节点,
			 *  rightTag, 用于规定当前域的标签,
			 *  systemUrl, 如果是多域情况下的host
			 * }
			 */
			menuList: {
				type: Array,
				default: () => {
					return []
				}
			},
			/**
			 * 渲染头部menu
			 * {
			 * 	type, 'icon'| 'dropdown' | 'avatar'
			 * 	icon, 图标icon的type，对应的是aidesign的图标库
			 * 	children, 如果是dropdown时需要提供dropdownitem
			 * }
			 */
			navs: {
				type: Array,
				default: []
			},
			/**
			 * 服务调用实例
			 */
			instance: {
				type: Function
			},
			/**
			 * 登录相关的设置
			 */
			authorization: {
				type: Object
			},
			/**
			 * 当前服务的
			 */
			tag: {
				type: String,
				default: 'AID'
			},
			/**
			 * 退出登录的会调函数
			 */
			logoutCb: {
				type: Function
			},
			/**
			 * token 失效的回调函数
			 */
			tokenTimeout: {
				type: Function
			},
			/**
			 * 需要过滤前缀的问题
			 */
			prefixRoute: {
				type: Array,
				default: () => {
					return ['/']
				}
			}
		},
		data () {
			return {
				isOpen: true,
				isOpenOnMinWin: true,
				openPosition: 'down',
				clientWidth: 1200,
				showMenu: true,
				needBackDrop: false,
				hideSlip: true,
				hideSlideWrapSlip:true,
				accordion: true,
				isActive: 0,
        menu: [],
        count: 10,
        notices: [],
        queryActiveMenu: '',
        queryOpenName: [],
        lang: 'EN'
			}
		},
		computed: {
			treeData () {
				if (this.menuList && this.menuList.length) {
					return transData(this.menuList, 'menuId', 'menuPid', 'children')
				} else if (this.menu && this.menu.length) {
					return this.menu
				}
				return []
			},
			ins () {
				this.setInstance(this.instance)
				return this.instance
			},
			auth () {
				this.setAuthorization(this.authorization)
				return this.authorization
			}
		},
		directives: {
			ClickoutSide
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

				return Format('yyyy/MM/dd')
			}
		},
		methods: {
			/* 消息点击触发 */
			handleNoticeClick (index, item) {
				this.isActive = index
				this.hideSlip = true
				const bulletinId = item.bulletinId
        this.$router.push({ name: 'notice', params: { bulletinId }})
			},
			/* 页面存在点击操作、keyUp操作, 将sessionTime更新 */
			// handleRefreshSessionTime (that) {
			// 	/**
			// 	 *  在存数据之前需要判断一下当前 sessionTime 是否生效
			// 	 *  如果已经失效，则不需要存数据
			// 	 *  如果没失效，这里需要判断accsstoken 是否存在，不存在的话，需要重新请求token
			// 	 */
			// 	let accessToken = localStorage.get('access_token')
			// 	let refreshToken = localStorage.get('refresh_token')
			// 	let sessionTime = localStorage.get('session-time')
			// 	let currentTime = new Date().getTime()
			// 	/**
			// 	 * sessionTime 存在,需要重新设置sessiontime的过期时间
			// 	 */
			// 	if (sessionTime) {
			// 		let time = new Date().getTime() + 30 * 60 * 1000
			// 		throttle(() => {
			// 			localStorage.set('session-time', time, 30 * 60 * 1000)
			// 		}, 5 * 1000, {leading: false, trailing: true})()
			// 		*
			// 		 * accessToken 不存在，需要根据refreshToken，获取并设置accessToken、refreshToken
			// 		if (!accessToken) {
			// 			that.instance.post(that.authorization.tokenUri +
		 //          '?grant_type=refresh_token' + '&refresh_token=' + encodeURIComponent(refreshToken) + '&scope=read')
		 //        .then(res => {
		 //          localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
		 //          localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
		 //        })
			// 		}
			// 	} else {
			// 		let alink = document.createElement('a')
			// 		alink.href = window.location.href
			// 		let path = alink.pathname.replace(/^([^\/])/,'/$1')
			// 		localStorage.set('aid-path', decodeURIComponent(path))
			// 		that.logoutAndRemoveSession()
			// 	}
			// },
			/* 加载更多 */
			loadingMore () {
				this.hideSlip = true
				this.$router.push({ name: 'notice-list' })
			},
			handleClickClose(){
				this.hideSlideWrapSlip = true
			},
			/* 点击图标触发 */
			handleLogout (item) {
				if (item && item.handleType && item.handleType === 'logout') {
					/* 登出 */
					this.logoutAndRemoveSession()
				}
			},
			logoutAndRemoveSession () {
				/**
				 * oauth2 的处理方式
				 */
				/*
					localStorage.remove('access_token')
					localStorage.remove('refresh_token')
					localStorage.remove('session-time')
					window.location.href = this.authorization.logout_uri
				*/
				this.logoutCb && this.logoutCb()
			},
			closeMenuOnMinWin () {
				this.isOpenOnMinWin = true
			},
			openOrClose () {
				this.isOpen = !this.isOpen
				this.isOpenOnMinWin = false
				if (this.clientWidth >= 1200) {
					this.openPosition = this.openPosition === 'down' ? 'right' : 'down'
				} else {
					this.openPosition = 'down'
				}
				if (this.clientWidth >= 1200 && !this.isOpen) {
					this.showMenu = false
				} else {
					this.showMenu = true
				}
			},
			hdMenuClick (name) {
				this.$emit('menu-click', name)
			},
			handleNavSelect (name) {
				this.$emit('nav-menu-click', name)
			},
			getMenu (item) {
				this.$emit('on-click', item)
			},
			showSlipbox () {
				this.hideSlip = false
			},
			hideSlipbox () {
				this.hideSlip = true
			},
			_ischild (child) {
	      while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
	        if (child === this.$el) {
	          return true
	        }
	        child = child.parentNode
	      }
	      return false
	    },
	    _isChildNode (child, parent) {
	      while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
	        if (child === this.$el.getElementsByClassName(parent)[0]) {
	          return true
	        }
	        child = child.parentNode
	      }
	      return false
	    },
			handleClickoutSide (e) {
				if (this._ischild(e.target) && (!e.target.classList.contains('slipbox__content') || !this._isChildNode(e.target, 'slipbox__content')) && !this._isChildNode(e.target, 'slide-wrap-content')) {
					this.hideSlipbox()
					return true
				}
				return false
			},
			/* 切换语言 */
			handleChangeLang () {
				if (this.lang === 'EN') {
					this.lang = '中'
					localStorage.set('aid-language', 'en-US')
					this.$i18n.locale = 'en-US'
				} else if (this.lang === '中') {
					this.lang = 'EN'
					localStorage.set('aid-language', 'zh-CN')
					this.$i18n.locale = 'zh-CN'
				}
				this.instance.post(this.authorization.changeLangUri, {
					language: this.lang === '中' ? 'en' : 'zh'
				}).then(res => {
					window.location.reload()
				}).catch(res => {
					/**
					 * 处理相关错误的问题
					 */
					if (res) {
				    switch (res.status) {
				      /**
				     	 * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
				       */
				      case 401:
					      let that = this
					      let title = this.$t('frame.systemInfo')
					      let content = this.$t('frame.systemInfoContent')
					      this.$Modal.warning({
	                title: title,
	                content: content,
	                onOk: () => {
						      	that.tokenTimeout()
	                }
	              })
				        break
				    }
				  }
				})
			},
			/* 跳出当前域，并将其 path 保存下来 */
			/**
			 * 存在不同域的情况下
			 *
			 * @param      {string}  url     The url
			 */
			handleOtherRegin (url) {
				let alink = document.createElement('a')
				alink.href = url
				let path = alink.pathname.replace(/^([^\/])/,'/$1')
				window.location.href = url + '?path=' + path
			},
			...mapMutations([
				'setInstance',
				'setAuthorization'
			])
		},
		async created () {
			/* 用于监测传过来的path */
			let path = getQuery('path') || this.$route.path
			let routeArr = this.prefixRoute || ['/']
			if (path && !routeArr.includes(decodeURIComponent(path))) {
				localStorage.set('aid-path', decodeURIComponent(path))
			}

			/**
			 * 获取所有URL query 并存储
			 */
			const parsed = QueryString.parse(window.location.search)
			localStorage.set('query-key', JSON.stringify(parsed))
			/**
			 * 如果需要将sessionTime 存在前端
			 * 用于监测用户点击和输入行为
			 */
			/* let that = this
			document.body.onclick = function () {
				that.handleRefreshSessionTime(that)
			}
			document.body.onkeyup = function () {
				that.handleRefreshSessionTime(that)
			} */
  		if (this.menuList && this.menuList.length) return

  		// 获取login处设置的语言
  		let fetchLang = await this.instance.get(this.authorization.langUri)
  		if (fetchLang.data === 'zh-CN') {
				this.lang = 'EN'
				localStorage.set('aid-language', 'zh-CN')
				this.$i18n.locale = 'zh-CN'
			} else if (fetchLang.data === 'en-US') {
				this.lang = '中'
				localStorage.set('aid-language', 'en-US')
				this.$i18n.locale = 'en-US'
			}

			// 获取menu数据
			this.instance.get(this.authorization.menuUri,
				{
					params: {
						language: fetchLang.data
					}
				}).then(res => {
				this.menu = transData(res.data, 'menuId', 'menuPid', 'children')
				/**
				 * 设置自动展开
				 */
				this.$nextTick(() => {
					let route = localStorage.get('aid-path') || this.$route.path || getQuery('path') || '/'
					let queryName = getQueryData(res.data, 'menuId', 'menuPid', decodeURIComponent(route), 'menuName')
					this.queryActiveMenu = queryName.name
					this.queryOpenName = queryName.names
					let routeArr2 = this.prefixRoute || ['/']
					let querys = localStorage.get('query-key')
					if (route && !routeArr2.includes(decodeURIComponent(path))) {
						let query = JSON.parse(querys)
						this.$router.push({ path: decodeURIComponent(route), query: query })
						localStorage.remove('aid-path')
						localStorage.remove('query-key')
					}
				})
				/**
				 * 先找出这一条数据，并将其 menuName 组成一个数组
				 */
			}).catch(res => {
				/**
				 * 处理相关错误的问题
				 */
				if (res) {
			    switch (res.status) {
			      /**
			      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
			      */
			      case 401:
			      	/**
			      	 * 增加错误判断，避免无限刷新
			      	 */
			      	let that = this
				      let title = this.$t('frame.systemInfo')
				      let content = this.$t('frame.systemInfoContent')
				      this.$Modal.warning({
                title: title,
                content: content,
                onOk: () => {
					      	that.tokenTimeout()
                }
              })
			        break
			    }
			  }
			})

			/* 获取10个最新的消息列表 */
			this.instance.get(this.authorization.bulletinListUri,
				{
					params: {
						pageNo: 1,
						pageSize: 10
					}
				}).then(res => {
				this.notices = res.data.result
			}).catch(res => {
				/**
				 * 处理相关错误的问题
				 */
				if (res) {
			    switch (res.status) {
			      /**
			      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
			      */
			      case 401:
			      	let that = this
				      let title = this.$t('frame.systemInfo')
				      let content = this.$t('frame.systemInfoContent')
				      this.$Modal.warning({
                title: title,
                content: content,
                onOk: () => {
					      	that.tokenTimeout()
                }
              })
			        break
			    }
			  }
			})
		},
		mounted () {
			/* 设置 */
			this.$nextTick(() => {
				this.setInstance(this.instance)
				this.setAuthorization(this.authorization)
			})
			let that = this
			let clientWidth = document.body.clientWidth || document.body.offsetWidth
			that.clientWidth = clientWidth
			if (this.clientWidth < 1200) {
				this.openPosition = 'down'
			}
			if (that.clientWidth >= 1200 && !that.isOpen) {
				that.showMenu = false
			} else {
				that.showMenu = true
			}
			window.addEventListener('resize', () => {
				let clientWidth = document.body.clientWidth || document.body.offsetWidth
				that.clientWidth = clientWidth
				if (that.clientWidth < 1200) {
					that.openPosition = 'down'
				}
				if (that.clientWidth >= 1200 && !that.isOpen) {
					that.showMenu = false
				} else {
					that.showMenu = true
				}
			})
		}
	}
</script>
<style lang="scss">
	@import './frame.scss'
</style>
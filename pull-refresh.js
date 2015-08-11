;
(function () {
	/**
	 * @file   下拉刷新+加载更多
	 *
	 * @author xiaohua
	 * @email coolr@foxmail.com
	 *
	 * @LICENSE
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	window.pullbox = {
		'option': {
			'reFreshMaxDistance': 60,
			'loadMoreMaxDistance': 100
		},
		'onPull': null,
		'onReFresh': null,//添加下拉刷新功能 仅需定义该函数
		'onLoadMore': null//添加加载更多功能 仅需定义该函数
	}
	document.addEventListener("DOMContentLoaded", init, false);

	function init() {

		if (!pullbox.onReFresh) {
			return
		}

		var elembody = document.documentElement || document.body;
		var hasTouch = "ontouchstart" in window ? 1 : 0;
		var box = document.querySelector(".pull-box");//必须有
		var distance = 0, reFreshMaxDistance = pullbox.option.reFreshMaxDistance;
		var state = 'ready';// null(pc端)| ready | refresh
		if (!hasTouch) {
			state = 'null'//pc比触屏移动端多一个状态,需点击屏幕后才能转成ready成为可拖拽状态
		}
		var eventMap = [
			{'START': 'mousedown', 'MOVE': 'mousemove', 'END': 'mouseup'},
			{'START': 'touchstart', 'MOVE': 'touchmove', 'END': 'touchend'}
		];
		var EVENT = eventMap[hasTouch];
		var posStart = { 'y': 0, 't': 0}, posMove = { 'y': 0, 't': 0}, posEnd = {'y': 0, 't': 0};
		var loadMoreLock = false;

		function getScrollTop() {
			return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || window.scrollY || 0;
		}

		function bindEvent(type, bindData, callback) {
			box.addEventListener(type, function (e) {
				if (hasTouch) {
					bindData.y = e.changedTouches[0].clientY;
				} else {
					bindData.y = e.clientY;
				}
				bindData.t = new Date().getTime();
				callback();
				if (type == EVENT.MOVE && getScrollTop() == 0 && distance > 0) {
					e.preventDefault();//阻止微信浏览器下拽的网页的提示
				}
			});
		}

		function onStart() {
			if (!hasTouch && state == 'null') {
				state = 'ready'
			}
		}

		function onMove() {
			distance = posMove.y - posStart.y;
			if (state == 'ready' && getScrollTop() == 0) {
				window.pullbox.onPull && window.pullbox.onPull(distance, reFreshMaxDistance);
				if (distance < reFreshMaxDistance) {
					setDistance(distance);
				} else {
					setDistance(reFreshMaxDistance);//达到 refresh 触发条件
				}
			}
		}

		function onEnd() {
			if (state == 'ready') {
				if (distance >= reFreshMaxDistance && getScrollTop() == 0) {
					state = 'refresh';
					window.pullbox.onReFresh({
						'finish': onReFreshFinish
					});
				} else {
					onReFreshFinish();
				}
			}
		}

		function onReFreshFinish() {
			state = 'ready';
			if (!hasTouch) {
				state = 'null';
			}
			setDistance(0);
		}

		function setDistance(y) {
			box.style['-webkit-transition-timing-function'] = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
			box.style['transition-timing-function'] = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
			box.style['-webkit-transition-duration'] = '0ms';
			box.style['transition-duration'] = '0ms';
			box.style['-webkit-transform'] = 'translate(0px, ' + y + 'px) translateZ(0px)';
			box.style['transform'] = 'translate(0px, ' + y + 'px) translateZ(0px)';
		}

		bindEvent(EVENT.START, posStart, onStart);
		bindEvent(EVENT.MOVE, posMove, onMove);
		bindEvent(EVENT.END, posEnd, onEnd);

		function loadMore() {
			if (pullbox.onLoadMore && loadMoreLock == false && (getScrollTop() + elembody.clientHeight > elembody.offsetHeight - pullbox.option.loadMoreMaxDistance)) {
				loadMoreLock = true;
				pullbox.onLoadMore({
					'finish': function () {
						loadMoreLock = false;
						setTimeout(loadMore, 100);//内容过少自动加载更多
					}
				});
			}
		}

		document.addEventListener("scroll", loadMore, false);
		loadMore();
	}

})();
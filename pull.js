;
(function () {
	window.pullbox = {
		'onReFresh': function () {
		},
		'onPull': function () {
		}
	}
	document.addEventListener("DOMContentLoaded", init, false);

	function elem(selector) {
		return document.querySelector(selector);
	}

	function css(obj, attr, value) {
		switch (arguments.length) {
			case 2:
				if (typeof arguments[1] == "object") {
					for (var i in attr) obj.style[i] = attr[i]
				} else {
					return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
				}
				break;

			case 3:
				obj.style[attr] = value;
				break;

			default:
				return "";
		}
	}

	function init() {

		var hasTouch = "ontouchstart" in window ? 1 : 0;
		var pullBox = elem(".pull-box");
		var distance = 0, maxDistance = 60;
		var state = 'ready';// null(pc端)| ready | refresh
		if (!hasTouch) {
			state = 'null'//pc比触屏移动端多一个状态,需点击屏幕后才能转成ready成为可拖拽状态
		}
		var eventMap = [
			{'START': 'mousedown', 'MOVE': 'mousemove', 'END': 'mouseup'},
			{'START': 'touchstart', 'MOVE': 'touchmove', 'END': 'touchend'}
		];
		var EVENT = eventMap[hasTouch];
		var posStart = {'x': 0, 'y': 0, 't': 0}, posMove = {'x': 0, 'y': 0, 't': 0}, posEnd = {'x': 0, 'y': 0, 't': 0};

		function bindEvent(type, bindData, callback) {
			pullBox.addEventListener(type, function (e) {

				if (hasTouch) {
					bindData.x = e.changedTouches[0].clientX;
					bindData.y = e.changedTouches[0].clientY;
				} else {
					bindData.x = e.clientX;
					bindData.y = e.clientY;
				}
				bindData.t = new Date().getTime();
				callback();

				if (type == EVENT.MOVE && window.pageYOffset == 0 && distance > 0) {
					e.preventDefault();//还是利用用原生的浏览器滚动条。
				}

			});
		}

		function onStart() {
			if (!hasTouch && state == 'null') {
				state = 'ready'
			}
		}

		function onMove() {
			distance = posMove.y - posStart.y;//只用到y
			if (state == 'ready' && window.pageYOffset == 0) {
				window.pullbox.onPull(distance, maxDistance);
				if (distance < maxDistance) {
					setDistance(distance);
				} else {
					//达到 refresh 触发条件
					setDistance(maxDistance);
				}
			}
		}

		function onEnd() {

			if (state == 'ready') {
				if (distance >= maxDistance) {
					state = 'refresh';
					window.pullbox.onReFresh({
						'finish': finish
					});
				} else {
					finish();
				}
			}

		}

		function finish() {
			state = 'ready';
			if (!hasTouch) {
				state = 'null';
			}
			setDistance(0);
		}

		function setDistance(y) {
			css(pullBox, 'transition-timing-function', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
			css(pullBox, '-webkit-transition-timing-function', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
			css(pullBox, 'transition-duration', '0ms');
			css(pullBox, '-webkit-transition-duration', '0ms');
			css(pullBox, 'transform', 'translate(0px, ' + y + 'px) translateZ(0px)');
			css(pullBox, '-webkit-transform', 'translate(0px, ' + y + 'px) translateZ(0px)');
		}

		bindEvent(EVENT.START, posStart, onStart);
		bindEvent(EVENT.MOVE, posMove, onMove);
		bindEvent(EVENT.END, posEnd, onEnd);
	}

})();
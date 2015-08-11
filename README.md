# pull-refresh
webapp 下拉刷新

HTML
```
<div class="pull-box"> <!-- .pull-box 类名容器必要-->

    <!--以下内容均为非必要,可自定义-->
    <div class="pull-refresh"></div>
    <div class="pull-content">
        <ul id="content">
            <li>内容文本</li>
            <li>内容文本</li>
            <li>内容文本</li>
            <li>内容文本</li>
            <li>内容文本</li>
        </ul>
    </div>
    <div class="pull-loadmore"></div>

</div>

```
JavaScript

```

 var content = document.getElementById("content");

    //添加下拉刷新功能 仅需定义该函数
    pullbox.onReFresh = function (handle) {

        console.log("refresh")
        setTimeout(function () {//ajax

            for (var i = 0; i < 5; i++) {
                var li = document.createElement('li');
                li.innerHTML = '最新内容';
                content.insertBefore(li, content.firstChild);
            }
            handle.finish();

        }, 500);

    }

    //添加加载更多功能 仅需定义该函数
    pullbox.onLoadMore = function (handle) {

        console.log("loadmore")
        setTimeout(function () {//ajax

            for (var i = 0; i < 5; i++) {
                var li = document.createElement('li');
                li.innerHTML = '加载内容';
                content.appendChild(li, content.firstChild);
            }
            handle.finish();//如果没有更多内容了可以不执行改方法,这样下次pullbox.onLoadMore将不会在被调用

        }, 500);

    }

```

pullbox.option

```
window.pullbox = {
		'option': {
			'reFreshDistance': 60,
			'loadMoreDistance': 100
		},
		'onPull': null,
		'onReFresh': null,//添加下拉刷新功能 仅需定义该函数
		'onLoadMore': null//添加加载更多功能 仅需定义该函数
	}

```

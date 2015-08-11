# pull-refresh
webapp 下拉刷新


<img width="200" src="https://raw.githubusercontent.com/huaable/pull-refresh/master/Screenshot_2015-08-11-22-43-03.png"/>
<img width="200" src="https://raw.githubusercontent.com/huaable/pull-refresh/master/Screenshot_2015-08-11-22-43-13.png"/>
<img width="200" src="https://raw.githubusercontent.com/huaable/pull-refresh/master/Screenshot_2015-08-11-22-43-22.png"/>


CSS

```

.pull-refresh,
.pull-loadmore {
	/* pullbox.option.reFreshDistance＝60; */
	height: 60px;
	background-image: url("loading.gif");
	background-position: center;
	background-repeat: no-repeat;
}

```

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
    
        setTimeout(function () {//ajax
            handle.finish();
        }, 500);

    }

    //添加加载更多功能 仅需定义该函数
    pullbox.onLoadMore = function (handle) {
    
        setTimeout(function () {//ajax
            handle.finish();
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

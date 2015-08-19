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

<div id="demo">
    <!--以下内容均为非必要,可自定义-->
    <div class="pull-refresh"></div>
    <ul id="content">
        ...
    </ul>
    <div class="pull-loadmore"></div>
</div>


```
JavaScript

```

 var content = document.getElementById("content");

  pullbox.option.boxSelector = "#demo"//default = 'body'

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
			'boxSelector': '.pull-box',
			'reFreshDistance': 60,
			'loadMoreDistance': 100
		},
		'onPull': null,
		'onReFresh': null,//添加下拉刷新功能 仅需定义该函数
		'onLoadMore': null//添加加载更多功能 仅需定义该函数
	}

```

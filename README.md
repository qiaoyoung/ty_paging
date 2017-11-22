# ty_paging
前段时间在写页面的时候涉及到了分页功能，因为从网上引用别人的框架可定制性不强。想着逻辑不难，索性自己写了一个，在此记录一下。
直接上效果：![](http://upload-images.jianshu.io/upload_images/3265534-5f3790df25077d97.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###使用方法：
#####第一步：在需要使用分页功能的html文件中引入css，js
```
<link rel="stylesheet" href="../../ty_paging/ty_paging.css">
<script src="../../ty_paging/ty_paging.js"></script>
```
#####第二步：在html文件中，在需要添加分页功能的表格后面添加ul
```
<!-- 分页 -->
<ul id="ty_paging"></ul>
```
#####第三步：在js中实现下面函数
```
//总页数：传服务端分页接口中的总页数
ty_dealPaging(总页数, function (currentPage) {

/* 分页点击时会响应此回调函数，
currentPage :当前点击的页码 */

});
```
到此，分页的功能就实现了。

###浅析下实现逻辑：
我把实现分页功能的js，css从项目中分离了出来，半路出家的我在此不敢称对此功能块进行了封装，就是抽离了出来，降低代码耦合性。
我把文件命名为`ty_`开头，原因很简单。ty是我公司的缩写，这样定义文件名、func名、参数名等，是为了防止与其他文件、函数、全局变量等重名，带来不必要的麻烦。
![](http://upload-images.jianshu.io/upload_images/3265534-3fea4e0a3d6a8265.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在ty_paging.js文件中，我定义了一个全局变量
`ty_currentPage`，只需要给`ty_currentPage`赋值，就可让其选中对应的分页码，方便还原初始状态。
如：
```
ty_currentPage = 1;
```
![在需要还原初始状态的地方给该变量赋值为1](http://upload-images.jianshu.io/upload_images/3265534-1b7f2b256a96f8dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在ty_paging.js文件中定义了一个`onePageMaxCount`变量，只需改变其值即可决定一页最多显示的分页码，我的网页中为5页。![](http://upload-images.jianshu.io/upload_images/3265534-cbae0681d83d1286.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3265534-240f9254cac8829d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
整个分页的核心逻辑也就下面这段代码，不管总页数有多少页，我们只需要处理好展示在网页上的这5个页码的规律，也就能解决所有的问题了。
```
//定义2个参数记录网页上展示的起点和终点页数
var startIndex = 1,             //起始分页数
endIndex = maxPage;         //结束分页数

//此处要分几种情况处理：
1. 总页数 <= 一页能展示的分页数
2. 总页数  > 一页能展示的分页数
2.1 当前选中页 <= 一页能展示的分页数的一半（大方向取整）
2.2 当前选中页  > 一页能展示的分页数的一半（大方向取整）
2.2.1 如果选中最后几页，起始位置和终点是固定不变的

if (maxPage <= onePageMaxCount) {//一页能显示下分页数量
startIndex = 1;
endIndex = maxPage;
} else {
if (ty_currentPage <= Math.ceil(onePageMaxCount/2)) {
startIndex = 1;
endIndex = onePageMaxCount;
} else {
//起始、终点位置逻辑推导
startIndex = ty_currentPage - (Math.ceil(onePageMaxCount/2)-1);
endIndex = ty_currentPage + (Math.ceil(onePageMaxCount/2)-1);
if (endIndex > maxPage) {
endIndex = maxPage;
startIndex = maxPage - (onePageMaxCount-1);
}
}
}
```

其他代码是对样式、事件等的处理，文件中备注的也算清楚，一目了然。有需要查看完整分页代码的可以在gitHub上[download](https://github.com/qiaoyoung/ty_paging.git)下来。


千里之行，始于足下~


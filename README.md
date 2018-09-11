## wepy-charts 图表集合示例

结合了echarts和antvis-f2进行图表展示示例集合

## 简介

wepy工程框架结合echarts使用，展示基本图表示例，目前柱状图，折线图实现了tooltip功能，饼图暂时未能实现tooltip，后期加上（主要是目前echart在微信小程序中暂时不支持tooltip功能），以下示例均来自echart官网示例

### 柱状图 - echarts

* 基础使用
* 阶梯瀑布图
* 堆叠图
* 极坐标系图

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/bar.gif?raw=true" style="max-width:100%;">


### 折线图 - echarts

* 基础使用
* 堆叠区域图
* 气温变化

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/line.gif?raw=true" style="max-width:100%;">


### 饼图 - echarts

* 基础使用
* 南丁格尔玫瑰图

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/pie.gif?raw=true" style="max-width:100%;">

### 雷达图 - echarts


<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/radar.gif?raw=true" style="max-width:100%;">


### 漏斗图 - echarts


<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/funnel.gif?raw=true" style="max-width:100%;">

### 仪表盘 - echarts

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/gauge.gif?raw=true" style="max-width:100%;">


### 散点图 - echarts

不能使用`new echarts.graphic.RadialGradient`，否则会出现栈溢出问题

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/scatter.gif?raw=true" style="max-width:100%;">


### 柱状图 - f2

* 基础图
* 叠加
* 组
* 渐变

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/fbar.gif?raw=true" style="max-width:100%;">

### 折线图 - f2

* 基础图
* 面积
* 多线

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/fline.gif?raw=true" style="max-width:100%;">

### 饼图 - f2

* 基础图
* 玫瑰图

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/fpie.gif?raw=true" style="max-width:100%;">

## 具体使用

### echarts使用

在项目中引入`mixins/echarts.js`，`plugins/ec-canvas`文件夹下的所有内容，如果需要开启`tooltip`请将`components\tooltip.wpy`复制到自己的项目中，这里的使用`cover-view`变相实现了`tooltip`的功能，经过测试有点卡顿，期待官网的支持。具体使用规范查看`pages/e`文件夹下具体示例即可。

### f2使用

在项目中引入`mixins/f2.js`，`plugins/f2-canvas`文件夹下的所有内容，具体使用规范查看`pages/f`文件夹下具体示例即可。


## 小程序预览

<img src="https://github.com/wqzwh/wepy-echarts/blob/master/static/tpj.jpg?raw=true" style="max-width:100%;">
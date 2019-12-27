# vue-calendar

# TODO
+ [x] 多语言，中文/英文，不做其他的语言
+ [x] 每周的第一天是周日还是周一
+ [x] 日历中每天的业务数据列表
+ [x] 切换年月更新视图的数据
+ [ ] 开启全局拖拽功能
+ [ ] 针对某一个业务数据拖拽

# props

|属性|说明|类型|默认值|
|---|----|----|-----|
|`locale`|语言，`CN` 或 `EN`| `String`| `CN`|
|`weekFirstDay`|每周第一天是周日还是周一，周日是 `0`，周一是 `1`| `Number`| `1`|
|`everyDayMaxCounty`|每天最大显示的数据量，如果数据多，会自动撑开单元格的高度| `Number`| `3`|

# 事件
|事件名|说明|参数值|返回值|
|-----|----|-----|-----|
|`on-click-day`|点击某一天|`function(day: moment)`|无|
|`on-click-event`|点击某一条业务数据|`function(event: Event, day: moment)`|无|

# Event
|key|是否必选|说明|类型|默认|
|---|----|----|----|----|
|`name`|是|业务数据标题|`String`|无|
|`date`|是|日期|`yyyy-MM-DD`，例如 `2020-01-01`|无|
|`status`|否|业务数据状态，可选 `success`，`warning` 和 `error` 三种颜色|`String`|无|
|`draggable`|否|该业务数据是否可以拖动|`Boolean`|无|
|`style`|否|单独添加样式|`Object`|无|

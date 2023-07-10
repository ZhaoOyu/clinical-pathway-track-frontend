## Header.vue
### 1. 样式选择修改
> position : src\components\Header.vue:341
```css
::v-deep .iconfont {
  color:#E64C65;
  font-size: 24px !important;
}
```
### 2.路由监听与跳转路由的待优化
> position : src\components\Header.vue:129
```javascript
    //TODO:跳转路由扩展优化
if (e.target.dataset.item === '-1') {
this.$router.push('/center')
}
else if (e.target.dataset.item === '0') {
this.$router.push('/enterHospital')
} else if (e.target.dataset.item === '1') {
this.$router.push('/CpPatient')
}
// else if (e.target.dataset.item === '2') {
//   this.$router.push('/cpManagement')
// }
...*10
```
> position : src\components\Header.vue:129
```javascript
//TODO:跳由监听待优化
$route: {
    handler: function (newV) {
        console.log('newV', newV);
        if (newV.name === 'enterHospital') {
            this.navIndex = 0
        } else if (newV.name === 'cpPatient') {
            this.navIndex = 1
        } else if (newV.name === 'cpManagement') {
            this.navIndex = 2
        } else if (newV.name === 'orderTemplate') {
            this.navIndex = 2
        }
        //...*n
    }
}

```

## Center.vue
### 1.user-center整体样式调整
```css
.user-center {
    width: 100%;
    // margin-left: 2%;
    // margin-top: 20px;
    height: 100%;
    margin-left: 0.5%;
    margin-top: 1%;
    ...
}
```
### 2.医生信息卡Card添加滚动条与更多选项
```css
.el-card {
    width: 100%;
    height: 100%;
    overflow: auto;
}
/* 更多的样式 */
.more {
    font-weight: bold;
    margin-right: 20px;
}
```




/**
* 创建自定义滚动条构造函数
*/
const CustomRoll = function (box, content, rollBox, scrollBar) {
    this.str = window.navigator.userAgent.toLowerCase();
    this.clickLocation = 0
    this.box = box;
    this.content = content;
    this.rollBox = rollBox;
    this.scrollBar = scrollBar;
    // 算出滚动条高度
    scrollBar.style.height = (box.offsetHeight / content.scrollHeight) * rollBox.offsetHeight + 'px';
}
/**
* 添加原型方法
* 点击滚动条
*/
CustomRoll.prototype.clickScrollBar = function (ev) {
    const that = this;
    let event = ev || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    // 鼠标点击位置距离拖动组件顶部的距离
    that.clickLocation = event.clientY - that.scrollBar.offsetTop;
}
/**
* 添加原型方法
* 拖拽滚动条
*/
CustomRoll.prototype.dragScrollBar = function (ev) {
    const that = this;
    let event = ev || window.event;
    let top = event.clientY - that.clickLocation;
    if (top <= 0) {
        top = 0;
    }
    if (top >= that.box.clientHeight - that.scrollBar.clientHeight) {
        top = that.box.clientHeight - that.scrollBar.clientHeight;
    }
    //计算滚动比例
    let scale = top / (that.box.clientHeight - that.scrollBar.clientHeight);
    //滚动区域的滚动距离
    let cony = scale * (that.content.clientHeight - that.box.clientHeight);
    that.scrollBar.style.top = top + 'px';
    that.content.style.top = -cony + 'px';
}
/**
* 添加原型方法
* 滚动内容
*/
CustomRoll.prototype.rollContent = function (ev) {
    const that = this;
    let e = ev || window.event;
    if (that.str.indexOf('firefox') != -1) { //火狐浏览器
        e.preventDefault(); //阻止窗口默认的滚动事件
        if (e.detail < 0) { //下滚
            let t = that.content.offsetTop + 20;
            if (t >= 0) {
                t = 0;
            }
            if (t <= -(that.content.clientHeight - that.box.clientHeight)) {
                t = -(that.content.clientHeight - that.box.clientHeight);
            }
            //计算滚动条和滚动区域的滚动比例
            let scale = t / (that.content.clientHeight - that.box.clientHeight);
            //滚动区域的滚动距离
            let top = scale * (that.rollBox.clientHeight - that.scrollBar.clientHeight);
            that.content.style.top = t + 'px';
            that.scrollBar.style.top = -top + 'px';
        }
        if (e.detail > 0) { //上滚
            let t = that.content.offsetTop - 20;
            if (t >= 0) {
                t = 0;
            }
            if (t <= -(that.content.clientHeight - that.box.clientHeight)) {
                t = -(that.content.clientHeight - that.box.clientHeight);
            }
            let scale = t / (that.content.clientHeight - that.box.clientHeight);
            let top = scale * (that.rollBox.clientHeight - that.scrollBar.clientHeight);
            that.content.style.top = t + 'px';
            that.scrollBar.style.top = -top + 'px';
        }
    } else { //非火狐浏览器
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        if (e.wheelDelta > 0) { //下滚
            let t = that.content.offsetTop + 20;
            if (t >= 0) {
                t = 0;
            }
            if (t <= -(that.content.clientHeight - that.box.clientHeight)) {
                t = -(that.content.clientHeight - that.box.clientHeight);
            }
            let scale = t / (that.content.clientHeight - that.box.clientHeight);
            let top = scale * (that.rollBox.clientHeight - that.scrollBar.clientHeight);
            that.content.style.top = t + 'px';
            that.scrollBar.style.top = -top + 'px';
        }
        if (e.wheelDelta < 0) { //上滚
            let t = that.content.offsetTop - 20;
            if (t >= 0) {
                t = 0;
            }
            if (t <= -(that.content.clientHeight - that.box.clientHeight)) {
                t = -(that.content.clientHeight - that.box.clientHeight);
            }
            //设置滚动比例
            let scale = t / (that.content.clientHeight - that.box.clientHeight);
            //设置滚动区域的滚动距离
            let top = scale * (that.rollBox.clientHeight - that.scrollBar.clientHeight);
            that.content.style.top = t + 'px';
            that.scrollBar.style.top = -top + 'px';
        }
    }
}

export default CustomRoll
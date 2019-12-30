new Vue({
    el: '#app',
    // Vue实例中的template选项中引用了组件后，会将这个组件的渲染结果替换掉 #app 标签的元素
    // template: '<app> </app>',
    template: '<app/>',
    components: {
      App // 等价于 App: App
    }

})
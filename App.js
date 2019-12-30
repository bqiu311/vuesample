;(function () {
    // 组件模板中，必须包含有且只有一个根元素
    const template = `<div id="#app">
           <title-select/>
           <order-list/>
    </div>
    `

    window.App = {
        template,
        data () {
            return {
                title: '仪表盘'
            }
        },
        components: {
            TitleSelect,
            OrderList // 等价于 AppNavbar: AppNavbar
            // AppLeaf, // AppLeaf: AppLeaf
            // AppHome
        } 
    }
})()
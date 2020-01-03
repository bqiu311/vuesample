;(function () {
    const template = `<div id="#app">
                                <a-layout id="components-layout-demo-custom-trigger">
                                <a-layout-sider :trigger="null" collapsible v-model="collapsed">
                                <div class="logo">名称变量</div>
                                <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                                    <a-menu-item key="1">
                                    <a-icon type="user" />
                                    <span>药品</span>
                                    </a-menu-item>
                                    <a-menu-item key="2">
                                    <a-icon type="video-camera" />
                                    <span>医生</span>
                                    </a-menu-item>
                                    <a-menu-item key="3">
                                    <a-icon type="upload" />
                                    <span>护士</span>
                                    </a-menu-item>
                                </a-menu>
                                </a-layout-sider>
                                <a-layout>
                                <a-layout-header style="height: 40px; background: #fff; padding: 0">
                                    <a-icon
                                    class="trigger"
                                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                                    @click="()=> collapsed = !collapsed"
                                />
                                </a-layout-header>
                                <a-layout-content
                                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
                                >
                                    <order-list/>
                                </a-layout-content>
                                </a-layout>
                            </a-layout>
                        </div>`

    window.App = {
         data() {
            return {
                collapsed: false,
            };
        },
        template,
        methods: {
        },
        components: {
            OrderList
        } 
    }
})()
;(function () {
    const template = `<div>
            <a-dropdown-button @click="handleButtonClick">
                Dropdown
                <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"><a-icon type="user" />1st menu item</a-menu-item>
                <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item>
                <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item>
                </a-menu>
            </a-dropdown-button>
            <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"><a-icon type="user" />1st menu item</a-menu-item>
                <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item>
                <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px"> Button <a-icon type="down" /> </a-button>
          </a-dropdown>
      </div>`

    window.TitleSelect = {
        template, // template: template,

        data () { // alt+shift 
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },

        methods: {
            // 删除某个员工
            // 因为删除 emp 会对 empList 做更新操作
            // 而这个 empList 初始化在当前组件中，所以删除 的函数需要定义在这个组件里面
            deleteEmp (index) {
                this.empList.splice(index, 1)
            },
            deleteHobby (index) {
                this.hobbies.splice(index, 1)
                //删除之后，发布消息，导航组件（左侧）来统计已删除的总数量
                PubSub.publish('changeNum', 1)// 上面删除的是1条
            },
            handleButtonClick(e) {
                console.log('click left button', e);
            },
            handleMenuClick(e) {
                console.log('click', e);
            },
        },

        // components: { //Dashboard 作为AppHome 的子组件
        //     Dashboard, // Dashboard: Dashboard
        //     HomeList // HomeList:HomeList
        // }
    }
})()
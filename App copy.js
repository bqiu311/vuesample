;(function () {
    const template = `<div id="#app">
                            <title-select/>
                            <order-list :columns="columns" :drugListcolumns="drugListcolumns"/>
                        </div>`

    window.App = {
        template,
        data () {
            return {
                columns: [
                    {
                      title: '单据号',
                      dataIndex: 'no',
                      width: '15%',
                      scopedSlots: { customRender: 'no' },
                    },
                    {
                      title: '入库类型',
                      dataIndex: 'type',
                      width: '5%',
                      scopedSlots: { customRender: 'type' },
                    },
                    {
                      title: '填单时间',
                      dataIndex: 'time',
                      width: '10%',
                      scopedSlots: { customRender: 'time' },
                    },
                    {
                      title: '填单人',
                      dataIndex: 'creator',
                      width: '5%',
                      scopedSlots: { customRender: 'creator' },
                    },
                    {
                      title: '审核时间',
                      dataIndex: 'validateTime',
                      width: '10%',
                      scopedSlots: { customRender: 'validateTime' },
                    },
                    {
                      title: '审核人',
                      dataIndex: 'validator',
                      width: '5%',
                      scopedSlots: { customRender: 'validator' },
                    },
                    {
                      title: '摘要',
                      dataIndex: 'remark',
                      width: '15%',
                      scopedSlots: { customRender: 'remark' },
                    },
                    {
                      title: '状态',
                      dataIndex: 'status',
                      width: '5%',
                      scopedSlots: { customRender: 'status' },
                    },
                    {
                      title: 'operation',
                      dataIndex: 'operation',
                      scopedSlots: { customRender: 'operation' },
                    },
                  ],
                  drugListcolumns: [
                    {
                      title: '序号',
                      dataIndex: 'key',
                      width: '5%',
                      scopedSlots: { customRender: 'key' },
                    },
                    {
                      title: '药品',
                      dataIndex: 'drugName',
                      width: '10%',
                      scopedSlots: { customRender: 'drugName' },
                    },
                    {
                      title: '生产批号',
                      dataIndex: 'code',
                      width: '15%',
                      scopedSlots: { customRender: 'code' },
                    },
                    {
                      title: '失效日期',
                      dataIndex: 'expireDate',
                      width: '10%',
                      scopedSlots: { customRender: 'expireDate' },
                    },
                    {
                      title: '数量',
                      dataIndex: 'num',
                      width: '5%',
                      scopedSlots: { customRender: 'num' },
                    },
                    {
                      title: '单位',
                      dataIndex: 'unit',
                      width: '5%',
                      scopedSlots: { customRender: 'unit' },
                    },
                    {
                      title: '单价',
                      dataIndex: 'price',
                      width: '5%',
                      scopedSlots: { customRender: 'price' },
                    },
                    {
                      title: '金额',
                      dataIndex: 'fee',
                      width: '5%',
                      scopedSlots: { customRender: 'fee' },
                    },
                    {
                        title: '货位号',
                        dataIndex: 'position',
                        width: '5%',
                        scopedSlots: { customRender: 'position' },
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        width: '10%',
                        scopedSlots: { customRender: 'remark' },
                    },
                    {
                        title: 'operation',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                      },
                  ]
            }
        },
        methods: {
            
            confirm() {
                this.$confirm({
                  title: 'Confirm',
                  content: 'Bla bla ...',
                  okText: '确认',
                  cancelText: '取消',
                });
              },
        },
        // created() {
        //     PubSub.subscribe('NewDrugEditor',  (event, num) => {
        //         this.visible = true
        //     })

        //     PubSub.subscribe('EditDrugDetails',  (event, key) => {
        //         this.visible = true
        //     })
        // },
        components: {
            TitleSelect,
            OrderList
        } 
    }
})()
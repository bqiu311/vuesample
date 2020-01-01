;(function () {
    const template = `<div id="#app">
                            <title-select @select_state="selectState" @select_stock="selectStock" :stockListProp="stockList"/>
                            <order-list :currentStateProp="currentState" :stockListProp="stockList" :currentStockProp="currentStock" :columns="columns" :drugListcolumns="drugListcolumns"/>
                        </div>`

    window.App = {
        template,
        created() {
          sendRequest(
              api.stock.stockList,
              null,
              response => {
                  this.stockList = response.data.Data
                  if(this.stockList && this.stockList.length>0){
                    this.currentStock = this.stockList[0]
                  }
              },
              exception =>{
              }
          )
      },
        data () {
            return {
              currentStock: null,
              currentState: "1",
              stockList: [],
              columns: [
                    {
                      title: '单据号',
                      dataIndex: 'No',
                      width: '10%',
                      scopedSlots: { customRender: 'No' },
                    },
                    {
                      title: '入库类型',
                      dataIndex: 'TypeName',
                      width: '10%',
                      scopedSlots: { customRender: 'TypeName' },
                    },
                    {
                      title: '填单时间',
                      dataIndex: 'CreateTime',
                      width: '15%',
                      scopedSlots: { customRender: 'CreateTime' },
                    },
                    {
                      title: '填单人',
                      dataIndex: 'Creator',
                      width: '5%',
                      scopedSlots: { customRender: 'Creator' },
                    },
                    {
                      title: '审核时间',
                      dataIndex: 'AuditTime',
                      width: '15%',
                      scopedSlots: { customRender: 'AuditTime' },
                    },
                    {
                      title: '审核人',
                      dataIndex: 'Auditor',
                      width: '5%',
                      scopedSlots: { customRender: 'Auditor' },
                    },
                    {
                      title: '摘要',
                      dataIndex: 'Description',
                      width: '15%',
                      scopedSlots: { customRender: 'Description' },
                    },
                    {
                      title: '状态',
                      dataIndex: 'StatusDisplay',
                      width: '10%',
                      scopedSlots: { customRender: 'StatusDisplay' },
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
                      dataIndex: 'SNo',
                      width: '5%',
                      scopedSlots: { customRender: 'SNo' },
                    },
                    {
                      title: '药品',
                      dataIndex: 'DrugName',
                      width: '10%',
                      scopedSlots: { customRender: 'DrugName' },
                    },
                    {
                      title: '生产批号',
                      dataIndex: 'LotNo',
                      width: '10%',
                      scopedSlots: { customRender: 'LotNo' },
                    },
                    {
                      title: '失效日期',
                      dataIndex: 'ExpDate',
                      width: '10%',
                      scopedSlots: { customRender: 'ExpDate' },
                    },
                    {
                      title: '数量',
                      dataIndex: 'Quantity',
                      width: '10%',
                      scopedSlots: { customRender: 'Quantity' },
                    },
                    {
                      title: '单位',
                      dataIndex: 'Unit',
                      width: '5%',
                      scopedSlots: { customRender: 'Unit' },
                    },
                    {
                      title: '成本价',
                      dataIndex: 'CostPrice',
                      width: '5%',
                      scopedSlots: { customRender: 'CostPrice' },
                    },
                    {
                      title: '成本金额',
                      dataIndex: 'Cost',
                      width: '5%',
                      scopedSlots: { customRender: 'Cost' },
                    },
                    {
                        title: '货位号',
                        dataIndex: 'AllocationNo',
                        width: '5%',
                        scopedSlots: { customRender: 'AllocationNo' },
                    },
                    {
                        title: '备注',
                        dataIndex: 'Description',
                        width: '10%',
                        scopedSlots: { customRender: 'Description' },
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
            selectStock (id) {
              this.currentStock = this.stockList.find(item => item.ID === id)
              PubSub.publish('conditionChange', id)
            },
            selectState(state) {
              this.currentState = state
              PubSub.publish('conditionChange', state)
            }
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
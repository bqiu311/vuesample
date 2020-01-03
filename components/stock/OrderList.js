; (function () {
  const template = `<div>
                          药房
                          <a-select style="margin-bottom: 10px;"  defaultValue="中药库" @change="handleStockChange">
                              <a-select-option v-for="d in stockList" :key="d.ID" :value="d.ID">{{d.Name}}</a-select-option>
                          </a-select>
                        时间范围:
                        审核状态:
                        <a-select defaultValue="1" style="width: 120px" @change="handleStateChange">
                          <a-select-option value="2">已审核</a-select-option>
                          <a-select-option value="1">未审核</a-select-option>
                        </a-select>
                        <a-button type="primary" @click="newDrug">新增</a-button>
                        <a-table
                            :pagination="pagination"
                            :columns="orderListSchema.columns" 
                            :dataSource="data" 
                            :customRow="rowClick"
                            bordered
                            >
                            <template slot="title" slot-scope="currentPageData">
                              单据列表
                            </template>
                            <template slot="operation" slot-scope="text, record, index">
                              <div class="editable-row-operations">
                                  <span>
                                  <a @click.stop="() => edit(record.ID)">编辑</a>
                                  </span>
                              </div>
                            </template>
                          </a-table>
                          <a-table size="small" :columns="drugDetailListSchema.columns" :dataSource="drugDetailsData" bordered >
                          <template slot="title" slot-scope="currentPageData">
                            单据明细
                          </template>
                          </a-table>
                            <drug-details 
                              :stockListProp="stockList" :currentStockProp="currentStock" :drugListcolumnsProp="drugDetailListSchema.columns" :drugDetailsDataProp="drugDetailsData"/>
                    </div>`
  window.OrderList = {
    components: {
      DrugDetails
    },
    template,
    data() {
      return {
        pagination: {
          defaultPageSize: 2,
          showTotal: total => `共 ${total} 条数据`,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20'],
          onShowSizeChange: (current, pageSize) => this.pageSize = pageSize
        },
        stockListSchema: {
        actions: {
          stockList: {
            url: `${baseUrl}/api/DrugStorehouse/GetDrugStorehouseByCond?user=ps&servicetype=1&status=1`,
              method: 'Get'
          }
        }
      },
      drugDetailListSchema: {
        actions: {
          getDrugOtherInStorageDetailById: {
            url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageDetailByID`,
              method: 'Get'
          }
        },
        columns: [
          {
            title: '序号',
            dataIndex: 'SNo',
            width: '5%',
            scopedSlots: { customRender: 'SNo' },
          },
          {
            title: '药品',
            dataIndex: 'DrugName',
            width: '20%',
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
            scopedSlots: { customRender: 'MinUnit' },
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
          }
        ]
      },
      orderListSchema: {
        actions: {
          getDrugOtherInStorageHeadByCondition: {
            url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageHeadByCondition`,
              method: 'Post'
          }
        },
        columns:
        [
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
        ]
      },
      data: [],
        drugDetailsData: [],
          currentStock: null,
            storehouseID: -1,
              status: 2,
                stockList: [],
                  rowClick: record => ({
                    on: {
                      click: () => {
                        this.fetchOrderDrugDeOrdertails(record.ID)
                      }
                    }
                  }),
                    url: {

      }
    };
  },
    created() {
    sendRequest(
      this.stockListSchema.actions.stockList,
      null,
      response => {
        this.stockList = response.data.Data
        if (this.stockList && this.stockList.length > 0) {
          this.currentStock = this.stockList[0]
        }
      },
      exception => {
      }
    )
  },
  methods: {
    fetchOrderList() {
      sendRequest(
        this.orderListSchema.actions.getDrugOtherInStorageHeadByCondition,
        {
          StorehouseID: this.storehouseID,
          Status: this.status
        },
        response => {
          console.log("获取库房单据头列表", response.data.Data)
          this.drugDetailsData = []
          this.data = response.data.Data
        },
        exception => {
        }
      )
    },
    handleStockChange(id) {
      this.currentStock = this.stockList.find(item => item.ID === id)
      this.storehouseID = this.currentStock.ID,
        this.fetchOrderList()
    },
    handleStateChange(value) {
      this.status = value
      this.fetchOrderList()
    },
    newDrug() {
      PubSub.publish('NewDrugEditor', 1)
    },
    fetchOrderDrugDeOrdertails(orderId, callback) {
      this.drugDetailsData = []

      sendRequest(
        this.drugDetailListSchema.actions.getDrugOtherInStorageDetailById,
        [{ key: 'id', value: orderId }],
        response => {
          console.log("单据明细列表", response.data.Data)
          this.drugDetailsData = response.data.Data
          if (callback) {
            callback(response.data.Data)
          }
        },
        exception => {
        }
      )
    },
    edit(key) {
      this.fetchOrderDrugDeOrdertails(key, response => {
        PubSub.publish('DrugEdit', [])
      })
    }
  }
}
}) ()
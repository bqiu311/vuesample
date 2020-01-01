; (function () {
  const template = `<div>
                          <a-table :columns="columns" :dataSource="data" :customRow="rowClick" bordered>
                            <template slot="operation" slot-scope="text, record, index">
                              <div class="editable-row-operations">
                                  <span>
                                  <a @click.stop="() => edit(record.ID)">编辑</a>
                                  </span>
                              </div>
                            </template>
                          </a-table>
                          <a-table :columns="drugListcolumns" :dataSource="drugDetailsData" bordered />
                            <drug-details :stockListProp="stockListProp" :currentStockProp="currentStockProp" :drugListcolumnsProp="drugListcolumns" :drugDetailsDataProp="drugDetailsData"/>
                            
                    </div>`
  window.OrderList = {
    props: {
      columns: Array,
      drugListcolumns: Array,
      currentStockProp: Object,
      currentStateProp: String,
      stockListProp: Array
    },
    components: {
      DrugDetails
    },
    template,
    data() {
      return {
        data: [],
        drugDetailsData: [],
        rowClick: record => ({
          on: {
            click: () => {
              this.fetchOrderDrugDeOrdertails(record.ID)
            }
          }
        })
      };
    },
    created() {
      PubSub.subscribe('conditionChange', (event, stockId) => {
        sendRequest(
          api.stock.GetDrugOtherInStorageHeadByCondition,
          {
            StorehouseID: this.currentStockProp.ID,
            Status: this.currentStateProp
          },
          response => {
            console.log("获取库房单据头列表", response.data.Data)
            this.drugDetailsData = []
            this.data = response.data.Data
          },
          exception => {
          }
        )
      })
    },
    methods: {
      fetchOrderDrugDeOrdertails(orderId,callback) {
        this.drugDetailsData = []

        sendRequest(
          api.stock.GetDrugOtherInStorageDetailById,
          [{ key: 'id', value: orderId }],
          response => {
            console.log("单据明细列表", response.data.Data)
            this.drugDetailsData = response.data.Data
            if(callback){
              callback(response.data.Data)
            }
          },
          exception => {
          }
        )
      },
      edit(key) {
        this.fetchOrderDrugDeOrdertails(key,response => {
          PubSub.publish('DrugEdit', [])
        })
      }
    }
  }
})()
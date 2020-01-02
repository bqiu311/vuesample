; (function () {
  const template = `<div>
                          药房
                          <a-select defaultValue="中药库" @change="handleStockChange">
                              <a-select-option v-for="d in stockListProp" :key="d.ID" :value="d.ID">{{d.Name}}</a-select-option>
                          </a-select>
                        时间范围:
                        审核状态:
                        <a-select defaultValue="1" style="width: 120px" @change="handleStateChange">
                          <a-select-option value="2">已审核</a-select-option>
                          <a-select-option value="1">未审核</a-select-option>
                        </a-select>
                        <a-button type="primary" @click="newDrug">新增</a-button>
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
      stockListProp: Array,
      stockListProp: Array,
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
      handleStockChange(id) {
        // const target = this.stockListProp.find(item => item.ID === id);
        //PubSub.publish('stockChange', target)
        this.$emit('select_stock', id)
      },
      handleStateChange(value) {
        this.$emit('select_state', value)
      },
      newDrug() {
        PubSub.publish('NewDrugEditor', 1)
      },
      fetchOrderDrugDeOrdertails(orderId, callback) {
        this.drugDetailsData = []

        sendRequest(
          api.stock.GetDrugOtherInStorageDetailById,
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
})()
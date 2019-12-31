;(function () {
  const template = `<div>
                          <a-table :columns="columns" :dataSource="data" :customRow="rowClick" bordered>
                            <template slot="operation" slot-scope="text, record, index">
                              <div class="editable-row-operations">
                                  <span>
                                  <a @click="() => edit(record.key)">编辑</a>
                                  </span>
                              </div>
                            </template>
                          </a-table>
                          <a-table :columns="drugListcolumns" :dataSource="drugDetailsData" bordered />
                          <a-modal :maskClosable="maskClosable" width="100%" title="编辑药品" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
                                    <drug-details :stockListProp="stockListProp" :currentStockProp="currentStockProp" :drugListcolumnsProp="drugListcolumns" :drugDetailsDataProp="drugDetailsData"/>
                            </a-modal>
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
            visible: false,
            maskClosable: false,
            data: [],
            drugDetailsData: [],
            // currentStock: null,
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
          PubSub.subscribe('conditionChange',  (event,stockId) => {
            sendRequest(
              api.stock.GetDrugOtherInStorageHeadByCondition,
              {
                StorehouseID: this.currentStockProp.ID,
                Status: this.currentStateProp
              },
              response => {
                  console.log("获取库房单据头列表",response.data.Data)
                  this.drugDetailsData = []
                  this.data = response.data.Data
              },
              exception =>{
              }
            )
          })

          PubSub.subscribe('NewDrugEditor',  (event, num) => {
            this.visible = true
        })

      },
      methods: {
        hideModal() {
          this.visible = false;
        },
          fetchOrderDrugDeOrdertails(orderId) {
            this.drugDetailsData = []

            sendRequest(
              api.stock.GetDrugOtherInStorageDetailById,
              [{key: 'id',value: orderId}],
              response => {
                this.drugDetailsData = response.data.Data
                PubSub.publish('DrugEdit', this.drugDetailsData)
              },
              exception =>{
              }
            )
          },
          edit(key) {
            this.visible = true;
          }
      }
  }
})()
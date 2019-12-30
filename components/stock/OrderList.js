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
                                    <drug-details :drugListcolumnsProps="drugListcolumns" :drugDetailsDataProps="drugDetailsData"/>
                            </a-modal>
                    </div>`
  window.OrderList = {
      props: {
        columns: Array,
        drugListcolumns: Array
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
            rowClick: record => ({
              on: {
                click: () => {
                  this.fetchOrderDrugDeOrdertails(record.key)
                }
              }
            })
          };
        },
      created() {
          PubSub.subscribe('stockChange',  (event, stockId) => {
            axios.get(`http://127.0.0.1:5500/data/stock${stockId}data.json`)
            .then(response => {
                this.drugDetailsData = []
                this.data = response.data
            })
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
            axios.get(`http://127.0.0.1:5500/data/order${orderId}Details.json`)
            .then(response => {
                this.drugDetailsData = response.data
            })
          },
          handleChange(value, key, column) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            if (target) {
              target[column] = value;
              this.data = newData;
            }
          },
          edit(key) {
            this.visible = true;
          }
      }
  }
})()
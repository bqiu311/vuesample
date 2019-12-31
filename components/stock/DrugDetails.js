;(function () {
    const template = `<div>
                        <a-select v-model="currentStockProp.ID" @change="handleCurrentStockChange">
                            <a-select-option v-for="d in stockListProp" :key="d.ID" :value="d.ID">{{d.Name}}</a-select-option>
                        </a-select>
                        <a-button class="editable-add-btn" @click="handleAdd">添加一行</a-button>
                        <a-table rowKey="ID" bordered :dataSource="drugDetailsData" :columns="drugListcolumnsProp">
                            <template slot="drugName" slot-scope="text, record">
                                <div class="editable-cell">
                                    <a-select v-if="record.editable" style="width: 120px" @change="handleChange">
                                      <a-select-option v-for="d in stockDrugList" :key="d.key" :value="d.key">{{d.drugName}}</a-select-option>
                                    </a-select>
                                    <template v-else
                                      >{{record.drugName}}</template>
                                </div>
                            </template>
                            <template slot="operation" slot-scope="text, record">
                                <a-popconfirm
                                    v-if="drugDetailsData.length"
                                    title="删除?"
                                    @confirm="() => onDelete(record)">
                                        <a href="javascript:;">删除</a>
                                </a-popconfirm>
                            </template>
                        </a-table>
                    </div>`
  
    window.DrugDetails = {
        props: {
          drugListcolumnsProp: Array,
          drugDetailsDataProp: Array,
          currentStockProp: Object,
          stockListProp: Array,
        },
        template,
        data() {
            return {
                drugDetailsData: [],
                stockDrugList: [],
                currentStock: null,
                // stockList: []
            }
          },
        created() {
        //   sendRequest(
        //     api.stock.stockList,
        //     null,
        //     response => {
        //         this.stockList = response.data.Data
        //         console.log('test',this.stockList)
        //     },
        //     exception =>{
        //     }
        // )

          PubSub.subscribe('DrugEdit',  (event, drugDetailsData) => {
            this.drugDetailsData = drugDetailsData
            axios.get(`http://127.0.0.1:5500/data/stock${this.currentStockProp.ID}Druglist.json`)
            .then(response => {
                this.stockDrugList = response.data
            })
          })
           // this.drugListcolumns = this.drugListcolumnsProp
            // this.currentStock = this.currentStockProp
        },
        methods: {
            // onCellChange(key, dataIndex, value) {
            //     const dataSource = [...this.drugDetailsData];
            //     const target = dataSource.find(item => item.key === key);
            //     if (target) {
            //       target[dataIndex] = value;
            //       this.drugDetailsData = dataSource;
            //     }
            //   },
            handleCurrentStockChange(id) {
              this.currentStock = this.stockListProp.find(item => item.ID === id)
            },
              onDelete(record) {
                const dataSource = [...this.drugDetailsData];
                this.drugDetailsData = dataSource.filter(item => item.ID !== record.ID);
              },
            handleAdd(){
                let indexKey = this.drugDetailsData.length + 1
                this.drugDetailsData.push({
                    ID: 999,
                    drugName: '',
                    code: '',
                    expireDate: "",
                    num: 0,
                    unit: '',
                    price: 0.0,
                    fee: 0.0,
                    position: '',
                    remark: '',
                    editable: true
                })
            },
            handleChange(drugId) {
              const newData = [...this.drugDetailsData];
              const drug = this.stockDrugList.find(item=> drugId === item.key)
              const target = newData.find(item => 999 === item.key)
              if (target) {
                
                target.drugName = drug.drugName
                target.unit = drug.unit

                this.drugDetailsData = newData
              }
            },
            edit(key) {
              const newData = [...this.drugDetailsData];
              const target = newData.filter(item => key === item.key)[0];
              if (target) {
                this.drugDetailsData = newData;
              }
            },
            save(key) {
              const newData = [...this.drugDetailsData];
              const target = newData.filter(item => key === item.key)[0];
              if (target) {
                this.drugDetailsData = newData;
                // this.cacheData = newData.map(item => ({ ...item }));
              }
            },
            cancel(key) {
              const newData = [...this.drugDetailsData];
              const target = newData.filter(item => key === item.key)[0];
              if (target) {
                // Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                this.drugDetailsData = newData;
              }
            }
        }
    }
  })()
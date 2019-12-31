;(function () {
    const template = `<div>
                        当前库房:{{currentStockProp.name}},{{currentStockProp.id}}
                        <a-button class="editable-add-btn" @click="handleAdd">添加一行</a-button>
                        <a-table bordered :dataSource="drugDetailsData" :columns="drugListcolumnsProp">
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
                                    @confirm="() => onDelete(record.key)">
                                        <a href="javascript:;">删除</a>
                                </a-popconfirm>
                            </template>
                        </a-table>
                    </div>`
  
    window.DrugDetails = {
        props: {
          drugListcolumnsProp: Array,
          drugDetailsDataProp: Array,
          currentStockProp: Object
        },
        template,
        data() {
            return {
                drugDetailsData: [],
                // drugListcolumns: [],
                stockDrugList: [],
                currentStock: null
            }
          },
        created() {
          PubSub.subscribe('DrugEdit',  (event, drugDetailsData) => {
            console.log("传递的单据",drugDetailsData)
            this.drugDetailsData = drugDetailsData
            axios.get(`http://192.168.31.167:5500/data/stock${this.currentStockProp.id}Druglist.json`)
            .then(response => {
                this.stockDrugList = response.data
            })
          })
           // this.drugListcolumns = this.drugListcolumnsProp
            // this.currentStock = this.currentStockProp
           

        },
        updated() {
            // this.drugDetailsData = this.drugDetailsDataProp
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
              onDelete(key) {
                const dataSource = [...this.drugDetailsData];
                this.drugDetailsData = dataSource.filter(item => item.key !== key);
              },
            handleAdd(){
                let indexKey = this.drugDetailsData.length + 1
                this.drugDetailsData.push({
                    key: 999,
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
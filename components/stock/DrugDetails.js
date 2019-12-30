;(function () {
    const template = `<div>
                        <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
                        <a-table bordered :dataSource="drugDetailsData" :columns="drugListcolumns">
                            <template slot="drugName" slot-scope="text, record">
                                <div class="editable-cell">
                                    <a-input 
                                    style="margin: -5px 0"
                                    :value="text" 
                                    @change="e => handleChange(e.target.value, record.key, 'drugName')" />
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
          empList: Array,
          deleteEmp: Function,
          drugListcolumnsProps: Array,
          drugDetailsDataProps: Array
        },
        template,
        data() {
            return {
                drugDetailsData: [],
                drugListcolumns: []
            }
          },
        created() {
            // this.cacheData = this.dataSource.map(item => ({ ...item }));
        },
        mounted() {
            console.log("11",this.drugDetailsDataProps)
            this.drugDetailsData = this.drugDetailsDataProps
            this.drugListcolumns = this.drugListcolumnsProps
        },
        methods: {
            onCellChange(key, dataIndex, value) {
                const dataSource = [...this.drugDetailsData];
                const target = dataSource.find(item => item.key === key);
                if (target) {
                  target[dataIndex] = value;
                  this.drugDetailsData = dataSource;
                }
              },
              onDelete(key) {
                console.log(key,this.drugDetailsData)
                const dataSource = [...this.drugDetailsData];
                this.drugDetailsData = dataSource.filter(item => item.key !== key);
              },
            handleAdd(){
                console.log(this.drugDetailsData)
                let indexKey = this.drugDetailsData.length+1
                this.drugDetailsData.push({
                    key: indexKey,
                    no: '',
                    drugName: '',
                    code: '',
                    expireDate: "",
                    num: 0,
                    unit: '支',
                    price: 0.0,
                    fee: 0.0,
                    position: '',
                    remark: ''
                })
            },
            handleChange(value, key, column) {
              const newData = [...this.drugDetailsData];
              const target = newData.filter(item => key === item.key)[0];
              if (target) {
                target[column] = value;
                this.drugDetailsData = newData;
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
                this.cacheData = newData.map(item => ({ ...item }));
              }
            },
            cancel(key) {
              const newData = [...this.drugDetailsData];
              const target = newData.filter(item => key === item.key)[0];
              if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                this.drugDetailsData = newData;
              }
            }
        }
    }
  })()
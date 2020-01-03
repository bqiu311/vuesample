(function () {
  const template = `<div>
                      <a-modal 
                      :maskClosable="maskClosable" 
                      width="100%" 
                      title="编辑药品" 
                      :confirmLoading="confirmLoading"
                      v-model="visible" 
                      @ok="handleOk"
                      @cancel="handleCancel"
                      okText="保存" 
                      cancelText="取消">  
                        <a-select v-model="currentStockId" @change="handleCurrentStockChange">
                            <a-select-option v-for="d in stockListProp" :key="d.ID" :value="d.ID">{{d.Name}}</a-select-option>
                        </a-select>
                        <a-button class="editable-add-btn" @click="handleAdd">添加一行</a-button>
                        <a-table :customRow="rowClick" rowKey="ID" bordered :dataSource="drugDetailsData" :columns="drugListcolumnsProp">
                            <template slot="DrugName" slot-scope="text, record">
                                <div class="editable-cell">
                                    <a-select :defaultValue="record.DrugName" v-if="record.editable" style="width: 100%" @change="value => handleChange(value, record.ID)">
                                      <a-select-option v-for="d in stockDrugList" :key="d.ID" :value="d.ID">{{d.DrugName}}</a-select-option>
                                    </a-select>
                                    <template v-else>
                                      {{record.DrugName}}
                                    </template>
                                </div>
                            </template>
                            <template slot="Quantity" slot-scope="text, record">
                                <div class="editable-cell">
                                    <a-input
                                    v-if="record.editable"
                                    style="margin: -5px 0"
                                    :value="text"
                                    @change="e => handleQuantityChange(e.target.value, record.ID, 'Quantity')"/>
                                    <template v-else
                                      >{{record.Quantity}}</template>
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
                      </a-modal>
                    </div>`;

  window.DrugDetails = {
    props: {
      drugListcolumnsProp: Array,
      drugDetailsDataProp: Array,
      currentStockProp: Object,
      stockListProp: Array
    },
    template,
    data() {
      return {
        visible: false,
        maskClosable: false,
        confirmLoading: false,
        drugDetailsData: [],
        stockDrugList: [],
        currentStock: null,
        currentStockId: 0,
        rowClick: record => ({
          on: {
            dblclick: () => {
              this.edit(record.ID);
            }
          }
        }),
        DrugDetailSchema: {
          actions:{
            getDrugOtherInStorageDetailID: {
              url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageDetailID`,
              method: 'Get'
            },
            getDrugOtherInStorageID: {
              url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageID`,
              method: 'Get'
            },
            saveDrugs: {
              url: `${baseUrl}/api/DrugOtherInStorage/SaveDrugOtherInStorage`,
              method: 'Post'
            },
            getDrugList: {
              url: `${baseUrl}/api/DrugStore/GetDrugsByStorehouseID`,
              method: 'Get'
            }
          }
        }
      };
    },
    updated() {
      if (this.currentStockId === 0) {
        this.currentStockId = this.currentStockProp.ID;
      }
    },
    created() {
      PubSub.subscribe('DrugEdit', (event, drugDetailsData) => {
        this.visible = true;
        this.currentStockId = this.currentStockProp.ID;
        this.currentStock = this.currentStockProp;
        if (!drugDetailsData || drugDetailsData.length === 0) {
          this.drugDetailsData = this.drugDetailsDataProp;
        } else {
          this.drugDetailsData = drugDetailsData;
        }
        this.getDrugList();
      });

      PubSub.subscribe('NewDrugEditor', (event, num) => {
        this.visible = true;
        this.currentStockId = this.currentStockProp.ID;
        this.currentStock = this.currentStockProp;
        this.drugDetailsData = [];
        this.getDrugList();
      });
    },
    methods: {
      save(data) {
        sendRequest(
          this.DrugDetailSchema.actions.saveDrugs.url,
          data,
          response => {
            this.$message.info(`保存成功`);
            this.visible = false;
              this.confirmLoading = false;
          },
          exception => { }
        )
      },
      handleOk() {
        this.confirmLoading = true;

        sendRequest(
          this.url.getDrugOtherInStorageID,
          null,
          response => {
            //组装单据
            console.log('获取单据ID', response.data.Data);

            let data = {
              Status: '1',
              ID: response.data.Data,
              No: response.data.Data,
              StorehouseID: this.currentStock.ID,
              Storehouse: this.currentStock.Name,
              TypeCode: 'csrk',
              TypeName: '初始入库',
              Description: '',
              CreatorID: 'ADMIN',
              Creator: 'ADMIN',
              AuditorID: 'ADMIN',
              Auditor: '审核者',
              CreateTime: '2020-01-01',
              AuditTime: '2020-01-01',
              SaveSign: '1',
              DrugOtherInStorageDetail: [...this.drugDetailsData]
            }

            this.save(data)
            // setTimeout(() => {
            //   this.$message.info(`保存成功`);
            //   this.visible = false;
            //   this.confirmLoading = false;
            // }, 2000);
          },
          exception => {
            this.visible = false;
            this.confirmLoading = false;
          }
        );
      },
      handleCancel(e) {
        this.visible = false;
      },
      handleQuantityChange(value, id, column) {
        const newData = [...this.drugDetailsData];
        const target = newData.find(item => id === item.ID);
        if (target) {
          target[column] = value;
          target['Cost'] = parseFloat(value) * parseFloat(target.CostPrice);
          this.drugDetailsData = newData;
        }
      },
      getDrugList() {
        sendRequest(
          this.url.getDrugList,
          [{ "key": "storehouseID","value": this.currentStockId }],
          response => {
            console.log('药房在用药品', response.data);

            const result = response.data.Data.filter(item => {
              if (!(this.drugDetailsData.find(x => x.DrugID === item.ID))) {
                return true;
              }
            });

            this.stockDrugList = result;
          },
          exception => { }
        )
      },
      handleCurrentStockChange(id) {
        this.currentStockId = id;
        this.currentStock = this.stockListProp.find(item => item.ID === id);
        this.getDrugList();
      },
      onDelete(record) {
        const dataSource = [...this.drugDetailsData];
        this.drugDetailsData = dataSource.filter(item => item.ID !== record.ID);
      },
      handleAdd() {
        sendRequest(
          this.url.getDrugOtherInStorageDetailID,
          null,
          response => {
            this.drugDetailsData.push({
              ID: response.data.Data,
              DrugName: '',
              LotNo: '',
              ExpDate: '',
              Quantity: 0,
              Unit: '',
              CostPrice: 0.0,
              Cost: 0.0,
              AllocationNo: '',
              Description: '',
              editable: true
            });
          },
          exception => { }
        );
      },
      handleChange(value, id) {
        const newData = [...this.drugDetailsData];
        const newDrug = this.stockDrugList.find(item => value === item.ID);
        const target = newData.find(item => id === item.ID);
        if (target) {
          const num = target.Quantity
          Object.assign(target,newDrug);
          target.Quantity = num
          target.DrugID = newDrug.ID
          target['Cost'] =
            parseFloat(target.Quantity) * parseFloat(target.CostPrice);
            // StorehouseUnit
          target.Unit = newDrug.StorehouseUnit
          // target = newDrug
          target.ID = id
          this.drugDetailsData = newData;
        }
      },
      edit(id) {
        const newData = [...this.drugDetailsData];
        const target = newData.filter(item => id === item.ID)[0];
        if (target) {
          target.editable = true;
          this.drugDetailsData = newData;
        }
      }
    }
  };
})();

(function() {
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
                                    <a-select :defaultValue="record.DrugName" v-if="record.editable" style="width: 120px" @change="value => handleChange(value, record.ID)">
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
        })
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
        if (!drugDetailsData || drugDetailsData.length === 0) {
          this.drugDetailsData = this.drugDetailsDataProp;
        } else {
          this.drugDetailsData = drugDetailsData;
        }
      });

      PubSub.subscribe('NewDrugEditor', (event, num) => {
        this.visible = true;
        this.drugDetailsData = [];
      });
      this.getDrugList();
    },
    methods: {
      handleOk() {
        this.confirmLoading = true;

        sendRequest(
          api.stock.GetDrugOtherInStorageID,
          null,
          response => {
            //组装单据
            console.log('获取单据ID', response.data.Data);

            setTimeout(() => {
              this.$message.info(`保存成功`);
              this.visible = false;
              this.confirmLoading = false;
            }, 2000);
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
          api.stock.GetDrugList,
          null,
          response => {
            console.log('药房在用药品', response.data);
            this.stockDrugList = response.data.Data;
          },
          exception => {}
        );
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
          api.stock.GetDrugOtherInStorageDetailID,
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
          exception => {}
        );
      },
      handleChange(value, id) {
        const newData = [...this.drugDetailsData];
        const newDrug = this.stockDrugList.find(item => value === item.DID);
        const target = newData.find(item => id === item.ID);
        if (target) {
          Object.assign(target, newDrug);
          target['Cost'] =
            parseFloat(target.Quantity) * parseFloat(target.CostPrice);
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

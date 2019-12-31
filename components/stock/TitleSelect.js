;(function () {
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
      </div>`

    window.TitleSelect = {
        template,
        props: {
            stockListProp: Array,
          },
        data () { 
            return {
            }
        },
        methods: {
            newDrug() {
                PubSub.publish('NewDrugEditor', 1)
            },
            handleStockChange(id) {
                // const target = this.stockListProp.find(item => item.ID === id);
                //PubSub.publish('stockChange', target)
                this.$emit('select_stock', id)
            },
            handleStateChange(value){
                this.$emit('select_state', value)
            }
        },
    }
})()
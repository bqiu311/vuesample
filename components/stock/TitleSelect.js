;(function () {
    const template = `<div>
            药房
            <a-select defaultValue="中药房" @change="handleStockChange">
                <a-select-option v-for="d in stockList" :key="d.id" :value="d.id">{{d.name}}</a-select-option>
            </a-select>
          时间范围:
          审核状态:
          <a-select defaultValue="0" style="width: 120px" @change="handleStateChange">
            <a-select-option value="2">已审核</a-select-option>
            <a-select-option value="1">未审核</a-select-option>
            <a-select-option value="0">所有</a-select-option>
          </a-select>
          <a-button type="primary" @click="newDrug">新增</a-button>
      </div>`

    window.TitleSelect = {
        template, // template: template,

        data () { // alt+shift 
            return {
                stockList: [],
                currentStockId: -1,
                validateState: 0
            }
        },
        created() {
            axios.get('http://127.0.0.1:5500/data/stock.json')
            .then(response => {
                this.stockList = response.data
            })
        },

        methods: {
            newDrug() {
                PubSub.publish('NewDrugEditor', 1)
            },
            handleStockChange(id) {
                this.currentStockId = id
                PubSub.publish('stockChange', id)
            },
            handleStateChange(value){
                this.validateState = value
            }
        },
    }
})()
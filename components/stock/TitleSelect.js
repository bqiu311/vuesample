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
        template,

        data () { 
            return {
                stockList: [],
                validateState: 0
            }
        },
        created() {
            axios.get('http://192.168.31.167:5500/data/stock.json')
            .then(response => {
                this.stockList = response.data
            })
        },

        methods: {
            newDrug() {
                PubSub.publish('NewDrugEditor', 1)
            },
            handleStockChange(id) {
                const target = this.stockList.find(item => item.id === id);
                PubSub.publish('stockChange', target)
            },
            handleStateChange(value){
                this.validateState = value
            }
        },
    }
})()
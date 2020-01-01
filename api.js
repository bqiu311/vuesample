// let baseUrl = 'http://192.168.32.218:83'
let baseUrl = 'https://ih.zlsoft.com'
let api = {
    stock: {
        stockList: {

            //https://ih.zlsoft.com/drug/house/GetDrugStorehouseByCond?user=ps&servicetype=1&status=1
            //url: `${baseUrl}/api/DrugStorehouse/GetDrugStorehouseByCond?user=ps&servicetype=1&status=1`,
            url: `${baseUrl}/drug/house/GetDrugStorehouseByCond?user=ps&servicetype=1&status=1`,
            method: 'Get'
        },
        // GetDrugList:{
        //     url: `${baseUrl}/drug/drug/GetDrugsByStorehouseID`,
        //     method: 'Get'
        // },
        //https://ih.zlsoft.com/drug/storage/GetDrugOtherInStorageHeadByID?id=949
        GetDrugOtherInStorageHeadByCondition: {
            //url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageHeadByCondition`,
            url: `${baseUrl}/drug/storage/GetDrugOtherInStorageHeadByCondition`,
            method: 'Post'
        },
        GetDrugOtherInStorageDetailById: {
            url: `${baseUrl}/drug/storage/GetDrugOtherInStorageDetailByID`,
            method: 'Get'
        },
        GetDrugOtherInStorageHeadByID: {
            url: `${baseUrl}/drug/storage/GetDrugOtherInStorageHeadByID`,
            method: 'Get'
        },
        GetDrugOtherInStorageDetailID: {
            url: `${baseUrl}/drug/storage/GetDrugOtherInStorageDetailID`,
            method: 'Get'
        },
        GetDrugOtherInStorageID: {
            url: `${baseUrl}/drug/storage/GetDrugOtherInStorageID`,
            method: 'Get'
        },
        SaveDrugs: {
            url: `${baseUrl}/drug/storage/SaveDrugOtherInStorage`,
            method: 'Post'
        },
        GetDrugList: {
            url: `http://127.0.0.1:5500/data/stock85Druglist.json`,
            method: 'Get'
        }
    }
}
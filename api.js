let baseUrl = 'http://192.168.32.218:83'
let api = {
    stock: {
        stockList: {

            //https://ih.zlsoft.com/drug/house/GetDrugStorehouseByCond?user=ps&servicetype=1&status=1
            url: `${baseUrl}/api/DrugStorehouse/GetDrugStorehouseByCond?user=ps&servicetype=1&status=1`,
            method: 'Get'
        },
        //https://ih.zlsoft.com/drug/storage/GetDrugOtherInStorageHeadByID?id=949
        GetDrugOtherInStorageHeadByCondition: {
            url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageHeadByCondition`,
            method: 'Post'
        },
        GetDrugOtherInStorageDetailById: {
            url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageDetailByID`,
            method: 'Get'
        },
        GetDrugOtherInStorageHeadByID: {
            url: `${baseUrl}/api/DrugOtherInStorage/GetDrugOtherInStorageHeadByID`,
            method: 'Get'
        },
        GetDrugList: {
            url: `http://127.0.0.1:5500/api/DrugOtherInStorage/GetDrugOtherInStorageHeadByID`,
            method: 'Get'
        }
    }
}
const TIME_OUT_MS = 60 * 1000 // 默认请求超时时间

/*
 * @param response 返回数据列表
 */
function handleResults (response) {
    let remoteResponse = response.data
    var result = {
        success: false,
        message: '',
        status: [],
        errorCode: '',
        data: {
            total: 0,
            results: []
        }
    }
    if (remoteResponse.Success) {
        result.data.results = remoteResponse.Data
        // result.data.total = remoteResponse.total
        result.success = true
    }
    if (!remoteResponse.Success) {
        let code = remoteResponse.errorCode
        if (code === 400) {
            console.log('传参错误')
        }
        result.errorCode = remoteResponse.errorCode
        result.message = remoteResponse.message
    }
    return result
}

function handleUrl (url) {
    url = api.baseUrl + url
    return url
}

function sendRequest(reqeust,data,response,exception){
    if(reqeust.method == 'Post'){
        post(reqeust.url,data,response,exception)
    }else{
        get(reqeust.url,data,response,exception)
    }
}


function post (url, data, response, exception) {
    axios({
        method: 'post',
        url: url,
        data: data,
        timeout: TIME_OUT_MS,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(
        (result) => {
            response(result)
        }
    ).catch(
        (error) => {
            if (exception) {
                exception(error)
            } else {
                console.log(error)
            }
        }
    )
}

function handlerQueryParams(data){
    let query=''
    var res = data.map(function (item,index) {
        if(index == data.length - 1){
            query+=item.key+'='+item.value
        }else{
            query+=item.key+'='+item.value+'&'
        }
    })
    return query;
}

function get (url,data, response, exception) {
    axios({
        method: 'get',
        url: url+(data === null?'':('?'+handlerQueryParams(data))),
        timeout: TIME_OUT_MS,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(
        (result) => {
            response(result)
        }
    ).catch(
        (error) => {
            if (exception) {
                exception(error)
            } else {
                console.log(error)
            }
        }
    )
}
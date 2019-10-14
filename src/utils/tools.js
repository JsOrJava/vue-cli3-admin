/**
 * @Description: 工具函数
 * @author liuwenhua@tianli.com
 * @date 2019-09-11
*/

/**
 * 格式化日期
 * @param t 日期，可接受时间戳或毫秒数
 * @param formater {String} 转换格式
 * @return {String} 时间戳
 * @author 刘文华
 * dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
 * dateFormater('YYYYMMDDHHmm', t) ==> 201906261830
 */
export const dateFormater = (formater, t) => {
    if (typeof t === 'string') {
        t = Number.parseInt(t)
    }
    let date = t ? new Date(t) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g,Y)
        .replace(/YY|yy/g,Y.substr(2,2))
        .replace(/MM/g,(M<10?'0':'') + M)
        .replace(/DD/g,(D<10?'0':'') + D)
        .replace(/HH|hh/g,(H<10?'0':'') + H)
        .replace(/mm/g,(m<10?'0':'') + m)
        .replace(/ss/g,(s<10?'0':'') + s)
}

/**
 *将指定字符串由一种时间格式转化为另一种from的格式应对应str的位置
 * @param str
 * @param from
 * @param to
 * @returns {*}
 * dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 */
export const dateStrForma = (str, from, to) => {
    str += ''
    let Y = ''
    if(~(Y = from.indexOf('YYYY'))){
        Y = str.substr(Y, 4)
        to = to.replace(/YYYY|yyyy/g,Y)
    }else if(~(Y = from.indexOf('YY'))){
        Y = str.substr(Y, 2)
        to = to.replace(/YY|yy/g,Y)
    }

    let k,i
    ['M','D','H','h','m','s'].forEach(s =>{
        i = from.indexOf(s+s)
        k = ~i ? str.substr(i, 2) : ''
        to = to.replace(s+s, k)
    })
    return to
}

/**
 * base64数据导出文件，文件下载
 * @param filename
 * @param data
 */
export function downloadFile (filename, data) {
    let DownloadLink = document.createElement('a')

    if ( DownloadLink ){
        document.body.appendChild(DownloadLink)
        DownloadLink.style = 'display: none'
        DownloadLink.download = filename
        DownloadLink.href = data

        if ( document.createEvent ){
            let DownloadEvt = document.createEvent('MouseEvents')

            DownloadEvt.initEvent('click', true, false)
            DownloadLink.dispatchEvent(DownloadEvt)
        }
        else if ( document.createEventObject )
            DownloadLink.fireEvent('onclick')
        else if (typeof DownloadLink.onclick == 'function' )
            DownloadLink.onclick()

        document.body.removeChild(DownloadLink)
    }
}

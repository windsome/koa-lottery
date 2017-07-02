import _debug from 'debug'
const debug = _debug('app:server:lottery:base')

export default class Base {
    constructor () {
    }
    _request (url, opts = {}) {
        //debug ("_request", url, opts);
        return fetch(url, {...opts, credentials: 'include'})
            .then (data => data.json())
            .then (retobj => {
                if (!retobj){
                    throw new Error ("error! get null from "+url);
                }
                return retobj;
            });
    }
    
    get (url) {
        var opts = {
            //dataType: 'json',
            method: 'GET',
            headers: {
                'Host': 'kaijiang.zhcw.com',
                'Referer': 'http://www.zhcw.com/kj/xndg/cq/ssc/index.shtml',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        return this._request(url, opts);
    }

    post (url, data) {
        var opts = {
            //dataType: 'json',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        return this._request(url, opts);
    }

}

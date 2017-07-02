import _debug from 'debug';
const debug = _debug('app:server:lottery:cqssc');
import Base from './base';
import moment from 'moment';
import _ from 'lodash';

export default class Cqssc extends Base {
    constructor () {
        super();
        this.name = '重庆时时彩';
    }

    getNextTime () {
        // {"yMdHms":"2017-03-16 13:30:00","nextTime":"366708","dayOfWeek":"5"}
        return this.get("http://kaijiang.zhcw.com/czKJNextTime.jsp?czId=574")
            .then(retobj => {
                //debug ("getNextTime:", retobj);
                if (!(retobj.yMdHms && retobj.nextTime)) {
                    debug ("error! retobj:", retobj);
                    throw new Error ("error! no yMdHms or nextTime!");
                }
                //var date = moment(retobj.yMdHms,"YYYY-MM-DD HH:mm:ss").toDate();
                //return {...retobj, date};
                return retobj;
            });
    }

    getInfo (count = 1){
        // {"572":{"20170316038":{"JNum":"","QNum":"","TOne":"","bonusEight":0,"bonusFive":0,"bonusFour":0,"bonusOne":0,"bonusPool":0,"bonusSeven":0,"bonusSix":0,"bonusThree":0,"bonusTop":0,"bonusTwo":0,"czArea":"","czId":"572","czName":"重庆时时彩","czType":"","description":"","dqName":"","issue":"20170316038","kjDate":"2017-03-16 00:00:00","kjTNum":"","kjZNum":"4 5 9 7 5","nextTime":0,"noteEight":0,"noteFive":0,"noteFour":0,"noteOne":0,"noteSeven":0,"noteSix":0,"noteThree":0,"noteTop":0,"noteTwo":0,"sales":0,"sjNum":"","timeBegin":null,"timeEnd":null,"timeSpan":""}}}
        return this.get("http://kaijiang.zhcw.com/kJCZInfo.jsp?czId=572&issueNum="+count+"&formatType=jsonMap").then(retobj => {
            //debug ("getInfo:", retobj);
            var level1Keys = _.keys(retobj);
            for (var i = 0; i < level1Keys.length; i++) {
                var rtCzId = level1Keys[i];
                var l1Obj = retobj[rtCzId];
                var level2Keys = _.keys(l1Obj);
                for (var j = 0; j < level2Keys.length; j++) {
                    var issue = level2Keys[j];
                    var l2Obj = l1Obj[issue];
                    return {czId:l2Obj.czId, 
                            czName:l2Obj.czName,
                            issue: l2Obj.issue,
                            kjZNum: l2Obj.kjZNum,
                            date: new Date()};
                }
            }
            throw new Error ("error! kJCZInfo not get result!");
        });
    }
}


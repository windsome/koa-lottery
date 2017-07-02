import _debug from 'debug';
const debug = _debug('app:server:lottery:index');
import moment from 'moment';
import _ from 'lodash';
import autobind from 'autobind-decorator'

import Cqssc from './cqssc';

@autobind
export default class Lottery {
    constructor () {
    }

    init () {
        this.cqssc = new Cqssc();
        this.database = {
            cqssc: { init: true },
        };
        this.eventLoop();
    }

    eventLoop () {
        this.cqssc.getInfo ().then (ret => {
            debug ("["+(new Date()).toLocaleString()+"]", ret);
            if (this.database.cqssc.init) {
                //debug ("warning! ignore first result of cqssc!");
                //this.database.cqssc.init = false;
                debug ("["+(new Date()).toLocaleString()+"], not init! ignored! ");
            } else {
                this.database.cqssc['result'] = ret;
            }
            return new Promise ((resolve, reject) => {
                setTimeout ( () => {
                    this.cqssc.getNextTime ().then (ret => {
                        resolve (ret);
                    }).catch (error => {
                        reject (error);
                    });
                }, 60000);
            });
        }).then (ret => {
            debug ("["+(new Date()).toLocaleString()+"]", ret);
            if (this.database.cqssc.init) {
                debug ("warning! ignore first result of cqssc!");
                this.database.cqssc.init = false;
            } else {
                this.database.cqssc['result'] = ret;
            }
            var date = moment(ret.yMdHms,"YYYY-MM-DD HH:mm:ss").toDate();
            this.database.cqssc['next'] = date;
            return parseInt(ret.nextTime)+60000;
        }).catch (error => {
            debug ("error! getNextTimeLoop: ", error);
            return 60000;
        }).then (ret => {
            return setTimeout ( () => {
                this.eventLoop();
            }, ret );
        });
    }

    async getResultAfterTime (checkDate, name='cqssc') {
        if (!checkDate) {
            debug ("error! should supply checkDate!");
            //return {errcode: -1, message: 'should supply checkDate!'};
            return null;
        }
        checkDate = new Date(checkDate);
        var lotteryTpye='cqssc';
        var lottery = this.database[lotteryTpye];
        var result = lottery && lottery.result;
        if (!result) {
            debug ("error! none result!");
            //return {errcode: -2, message: 'none result!'};
            return null;
        }
        var lastDate = result.date;
        if (checkDate < lastDate) {
            debug ("get result:", result);
            return result.kjZNum;
        }
        return null;
    }

    async getResultCqssc (ctx, next) {
        var ret = {};
        var lottery = this.database['cqssc'];
        var result = lottery && lottery.result;
        if (!result) {
            ret = {lottery: result};
        }
        ctx.body = ret;
    }
}

import _debug from 'debug';
const debug = _debug('app:server:lottery:index');
import Lottery from '../'

const registLotteryApi = (app) => {
    var lottery = new Lottery ();
    lottery.init ();
    var router = require('koa-router')({ prefix: '/apis/v1/lottery' });
    router.get('/cqssc', lottery.getResultCqssc);
    app.use(router.routes()).use(router.allowedMethods());
}

const initLottery = () => {
    var lottery = new Lottery ();
    lottery.init ();
}

const getLotteryResult = () => {
    var lottery = new Lottery ();
    lottery.init ();
    var result = await lottery.getResultAfterTime (new Date(), 'cqssc');
    debug ('cqssc result:', result);
}


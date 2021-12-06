import Koa from 'koa';
import Router from '@koa/router';
import { IsDateString, IsString, validate, validateOrReject } from 'class-validator';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import { v4 as uuidv4 } from 'uuid';

import { IsE164, IsMMDDYYYY, IsOver18 } from './validators/validator';
import { simplePrimalityTest } from './algorithms/primality';
import { generatePrimeArray } from './algorithms/sieve-of-eratosthenes';

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(logger());

router.get('/', ctx => {
    ctx.status = 200;
    ctx.body = 'h e l l o';
});

//-----------------//
//--- Section 1 ---//
//-----------------//

// Problem 1
router.get('/section-1/is-prime/:num', ctx => {
    const param = ctx.params?.num;
    const n = Number(param)
    if (isNaN(n)) {
        ctx.status = 400;
        ctx.body = 'Not a number??'
        return;
    }

    ctx.status = 200;
    ctx.body = simplePrimalityTest(n);
    return;
});

// Problem 2
router.get('/section-1/prime-array/:num', ctx => {
    const param = ctx.params?.num;
    const n = Number(param)
    if (isNaN(n)) {
        ctx.status = 400;
        ctx.body = 'Not a number??'
        return;
    }

    ctx.status = 200;
    ctx.body = generatePrimeArray(n);
    return;
});

// Problem 3
const sortRec = (a: number, b: number): number => {
    if (a === b) {
        return 0;
    }
    if (Math.floor(a % 10) > Math.floor(b % 10)) {
        return 1;
    }
    else if (Math.floor(a % 10) < Math.floor(b % 10)) {
        return -1
    }

    return sortRec(a / 10, b / 10);
};

router.post('/section-1/sort-arrays-by-one', ctx => {
    const a: number[] = ctx.request?.body?.a;
    if (a === undefined) {
        ctx.status = 400;
        return;
    }
    const correctArray = a.reduce((p, c) => {
        if (p == false) {
            return false;
        }
        const n = Number(c)
        if (isNaN(n)) {
            return false;
        }
        return true;
    }, true)

    if (!correctArray) {
        ctx.status = 400;
        ctx.body = "array is not of number[]"
        return;
    }

    a.sort((a: number, b: number): number => {
        return sortRec(a, b);
    })

    ctx.status = 200;
    ctx.body = a;
    return;
});

//-----------------//
//--- Section 2 ---//
//-----------------//

// Problem 1
const testPromises = [
    (n: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(n + 1);
        });
    },
    (n: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(n + 10);
        });
    },
    (n: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(n + 100);
        });
    },
]

const testNumbers = [100, 1, 10];

const chainPromises = async (a: ((n: number) => Promise<number>)[], startValue: number): Promise<number> => {
    try {
        for (const f of a) {
            console.log('before: ', startValue);
            startValue = await f(startValue);
            console.log('after: ', startValue);
        }
    }
    catch (e) {
        console.log(e);
        return 0;
    }
    return startValue;
};

router.get('/section-2/chain-promises/:num', async ctx => {
    const param = ctx.params?.num;
    const n = Number(param)
    if (isNaN(n)) {
        ctx.status = 400;
        ctx.body = 'Not a number??'
        return;
    }

    ctx.status = 200;
    ctx.body = await chainPromises(testPromises, n);
    return;
});

// Problem 2
// not sure I completely understand, but returning the index values
// for each given promise's end result?
// const resolvePromises = async (a: ((n: number) => Promise<number>)[], startValue: number): Promise<number[]> => {
// }

//-----------------//
//--- Section 3 ---//
//-----------------//
class User {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsMMDDYYYY()
    @IsOver18()
    birthday: string;

    @IsE164()
    phoneNumber: string;

    @IsDateString()
    timestamp: string;
}

const postUserHandler = async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext & Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>, any>) => {
    const body = ctx.request.body;

    const user = new User();
    user.firstName = body?.first_name;
    user.lastName = body?.last_name;
    user.birthday = body?.birthday;
    user.phoneNumber = body?.phone_number;
    user.timestamp = body?.timestamp;

    try {
        await validateOrReject(user)
    }
    catch (e) {
        ctx.status = 400;
        ctx.body = e;
        return;
    }
    ctx.status = 200;
    ctx.body = uuidv4();
    return;
};

router.post('/section-3/signup', postUserHandler);

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);

console.log("Server started");
console.log("Listening on localhost:3000");

//-----------------//
//--- Section 4 ---//
//-----------------//

// System Design Question (see README.md)

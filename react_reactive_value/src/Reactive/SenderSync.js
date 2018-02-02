//@flow

import { logGroup, logError, logInfo } from '../Log';

let isLock = false;
const toRun: Array<[() => void, Error]> = [];
const limit = 20;

const showGroup = (name: string, stack: Array<Error>) => {
    logGroup(name, () => {
        for (const item of stack) {
            logInfo(item);
        }
    });
};

export default (funcToExec: () => void) => {
    toRun.push([funcToExec, new Error('stack')]);

    if (isLock === false) {
        isLock = true;

        let counter = 0;
        const stackList: Array<Error> = [];

        while (toRun.length > 0) {
            const [toRunItem, stackItem] = toRun.shift();

            toRunItem();
            stackList.push(stackItem);
            counter++;

            if (counter > limit) {
                showGroup(`Grouped next - error (${stackList.length})`, stackList);
                throw Error('Exceeding the limit on running subject.next');
            }
        }

        showGroup(`Grouped next (${stackList.length})`, stackList);

        isLock = false;
    }
};
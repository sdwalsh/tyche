import { registerDecorator, ValidationOptions, buildMessage, ValidateBy } from 'class-validator';
import moment from 'moment';

export function IsE164(validationOptions?: ValidationOptions) {
    return ValidateBy(
        {
            name: 'isE164',
            validator: {
                validate: (value, args): boolean => test_e164(value),
                defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be e164 encoded', validationOptions),
            },
        },
        validationOptions
    );
};

const test_e164 = (value: unknown): boolean => {
    const regEx = /^\+[1-9]\d{10,14}$/;
    return typeof value === 'string' && regEx.test(value);
};

export function IsMMDDYYYY(validationOptions?: ValidationOptions) {
    return ValidateBy(
        {
            name: 'isMMDDYYYY',
            validator: {
                validate: (value, args): boolean => test_MMDDYYYY(value),
                defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be MM-DD-YYYY encoded', validationOptions),
            },
        },
        validationOptions
    );
};

const test_MMDDYYYY = (value: unknown): boolean => {
    const regEx = /(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*\-\d{4}/;
    return typeof value === 'string' && regEx.test(value);
};

export function IsOver18(validationOptions?: ValidationOptions) {
    return ValidateBy(
        {
            name: 'isOver18',
            validator: {
                validate: (value, args): boolean => testAge(value),
                defaultMessage: buildMessage(() => 'must be 18 years old', validationOptions),
            },
        },
        validationOptions
    );
}

const testAge = (age: unknown): boolean => {
    if (typeof age === 'string' && test_MMDDYYYY(age)) {
        const mAge = moment(age, "MM-DD-YYYY");
        const diff = Math.abs(mAge.diff(moment.now(), 'years'));
        if (diff < 18) {
            return false;
        }
        return true;
    }
    return false;
}
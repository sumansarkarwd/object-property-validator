export {};

const { getFormattedLabel } = require("../util");

/**
* Runs required validation, for strings checks length, for numbers of null or not and for object of has any key or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const alphaRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const typeOfValue = typeof value;
    label = getFormattedLabel(label);
    const errorMessage = `${label} must be only alphabets`;
    const alphaRegex = /^[A-Za-z]+$/;
    value = value.toString();

    if(value.match(alphaRegex)) {
        return false;
    }
    return errorMessage;
};

module.exports = alphaRule;

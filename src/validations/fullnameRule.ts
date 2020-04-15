export {};

const { getFormattedLabel } = require("../util");

/**
* Runs required validation, for strings checks length, for numbers of null or not and for object of has any key or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const fullnameRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const typeOfValue = typeof value;
    label = getFormattedLabel(label);
    const errorMessage = `${label} is invalid`;
    const alphaRegex = /^[a-zA-Z\-?'?]+ [a-zA-Z\-?'?]+$/;
    value = value.toString();

    if(value.match(alphaRegex)) {
        return false;
    }
    return errorMessage;
};

module.exports = fullnameRule;

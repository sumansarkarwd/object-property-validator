export {};
const { getFormattedLabel } = require("../util");

/**
* Runs maximum validation, for string values checks the length of the string and for numbers check greater or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const maxRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const regex = /^max:([0-9]+)$/;
    const matchs: Array<any> | any = rule.match(regex);
    const max_length: string | number | any = matchs[1];

    const typeOfValue = typeof value;
    let errorMessage: string = '';
    label = getFormattedLabel(label);

    if (typeOfValue === 'number') {
        errorMessage = `${label} must be maximum ${max_length}`;
        if (value > parseInt(max_length)) {
            return errorMessage;
        }
    } else if (typeOfValue === 'string') {
        errorMessage = `${label} must be maximum ${max_length} characters long`;
        if (value.length > parseInt(max_length)) {
            return errorMessage;
        }
    }
    return false;
}

module.exports = maxRule;

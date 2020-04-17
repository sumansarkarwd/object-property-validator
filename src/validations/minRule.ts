export{}
var { getFormattedLabel } = require("../util");

/**
* Runs minimum validation, for string values checks the length of the string and for numbers check less or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const minRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const regex = /^min:([0-9]+)$/;
    const matchs: Array<any> | any = rule.match(regex);
    const min_length: string | number | any = matchs[1];

    const parseValueToInt = Number(value);
    const typeOfValue = isNaN(parseValueToInt) ? 'string' : 'number';
    let errorMessage: string = '';
    label = getFormattedLabel(label);

    if (typeOfValue === 'number') {
        errorMessage = `${label} must be minimum ${min_length}`;
        if (value < parseInt(min_length)) {
            return errorMessage;
        }
    } else if (typeOfValue === 'string') {
        errorMessage = `${label} must be minimum ${min_length} characters long`;
        if (value.length < parseInt(min_length)) {
            return errorMessage;
        }
    }
    return false;
}

module.exports = minRule;

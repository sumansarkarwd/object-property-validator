export {};

const { getFormattedLabel } = require("../util");

/**
* Runs required validation, for strings checks length, for numbers of null or not and for object of has any key or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const urlRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const typeOfValue = typeof value;
    label = getFormattedLabel(label);
    const errorMessage = `${label} is not a valid URL`;

    if (!value) {
        return errorMessage;
    }
    if(typeOfValue !== 'string') {
        return errorMessage;
    }

    try {
        const urlObj: object | any = new URL(value);
        return false;
    } catch (error) {
        return errorMessage;
    }
};

module.exports = urlRule;

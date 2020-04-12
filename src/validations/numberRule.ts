export {};

const { getFormattedLabel } = require("../util");

/**
* @param data
* @param value 
* @param label 
* @param rule 
*/
const numberRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    label = getFormattedLabel(label);
    const errorMessage = `${label} must be a number`;

    return isNaN(value) ? errorMessage : false;
};

module.exports = numberRule;

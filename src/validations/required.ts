export {};

const { getFormattedLabel } = require("../util");

/**
* Runs required validation, for strings checks length, for numbers of null or not and for object of has any key or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const requiredRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const typeOfValue = typeof value;
    label = getFormattedLabel(label);
    const errorMessage = `${label} is required`;

    if (value === null || value === undefined|| value === false) {
      return errorMessage;
    }

    switch (typeOfValue) {
        case "number":
            if (value == 0) {
                return errorMessage;
            }
            return false;
        case "string":
            const valueParseInt = Number(value);
            if(isNaN(valueParseInt)) {
                if (value.length == 0) {
                    return errorMessage;
                }
            } else {
                if (valueParseInt == 0) {
                    return errorMessage;
                }
            }
            return false;
        case "object":
            if (Object.keys(value).length == 0) {
                return errorMessage;
            }
            return false;
        }
    return false;
};

module.exports = requiredRule;

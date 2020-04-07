/**
* Runs required validation, for strings checks length, for numbers of null or not and for object of has any key or not
* @param value 
* @param label 
* @param rule 
*/
const requiredRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    const typeOfValue = typeof value;
    label = getFormattedLabel(label);
    const errorMessage = `${label} is required`;

    if (!value) {
      return errorMessage;
    }

    switch (typeOfValue) {
        case "string":
            if (value.length == 0) {
                return errorMessage;
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

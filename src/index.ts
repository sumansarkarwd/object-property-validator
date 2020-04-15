//const { getFormattedLabel } = reuired("./util")
export{}
const rulesLibrary = require("./rulesLibrary");

interface validatorReturnType {
    errors: object;
    isValid: boolean;
    getFirstError: string|null
}

export const validate = (
    data: object | any,
    rules: object | any
): validatorReturnType => {
    let messages: object | any = {}; // all error messages will be in it

    /**
     * Tells if data is Valid or not
     **/
    const isValid = (): boolean => {
        // return true if rules has no key
        if (!Object.keys(rules).length) {
            return true;
        }
        // return true if error messages has no key
        if (!Object.keys(messages).length) {
            return true;
        }
        return false;
    };

    /**
    * get rule method
    * returns the method to run validation by tesing regx
    */
    const getRuleMethod = (rule: string): Function | null => {
        const rulesLibraryItems: Array<any> = rulesLibrary; 

        const ruleToRun = rulesLibraryItems.find(ruleLibItem =>
            ruleLibItem.regex.test(rule)
        );

        let ruleMethod = null; 
        if (ruleToRun != null) {
            switch(ruleToRun.ruleMethod) {
                case 'requiredRule':
                    ruleMethod = require("./validations/required");
                    break;
                case 'minRule':
                    ruleMethod = require("./validations/minRule");
                    break;
                case 'maxRule':
                    ruleMethod = require("./validations/maxRule");
                    break;
                case 'afterDateRule':
                    ruleMethod = require("./validations/afterDateRule");
                    break;
                case 'numberRule':
                    ruleMethod = require("./validations/numberRule");
                    break;
                case 'urlRule':
                    ruleMethod = require("./validations/urlRule");
                    break;
                case 'alphaRule':
                    ruleMethod = require("./validations/alphaRule");
                    break;
                case 'fullnameRule':
                    ruleMethod = require("./validations/fullnameRule");
                    break;
            }
        }
        return ruleMethod;
    };

    /**
    * run validation on every item in rules object
    */
    const runValidation = () => {
        const ruleItems = Object.keys(rules); // array => ['name', 'email']

        for (let i = 0; i < ruleItems.length; i++) {
            const dataKey: string = ruleItems[i]; // name, email
            let rulesPerItem: string | Array<string> = rules[dataKey]; // name, email
            const dataValue: any = data[dataKey]; // john doe, john.doe@gmail.com

            let indivisualRules: Array<string> | any = [];

            if (typeof rulesPerItem === "string") {
                // if string then split by pipe(|) and make a rules array ['reuired', 'min:0']
                rulesPerItem = rulesPerItem.toString();
                indivisualRules = rulesPerItem.split("|");
            } else {
                indivisualRules = rulesPerItem;
            }

            const messagesForCurrentKey: Array<string> = [];
            indivisualRules.forEach((rule: string) => {
                const ruleMethod = getRuleMethod(rule);

                if (ruleMethod != null) {
                    const msg = ruleMethod(data, dataValue, dataKey, rule);
                    if (msg) {
                        messagesForCurrentKey.push(msg);
                    }
                } else {
                    throw "Exception, rule method could not be identified!";
                }
            });

            if (messagesForCurrentKey.length) {
                messages[dataKey] = messagesForCurrentKey;
            }
        }
    };

    runValidation();

    const getFirstError = (): string | null => {
        const errorProperties: Array<any> = Object.keys(messages);
        if(errorProperties.length) {
            const firstPropErrorMessages: Array<string> = messages[errorProperties[0]];
            return firstPropErrorMessages[0];
        }
        return null;
    }

    return {
        errors: messages,
        isValid: isValid(),
        getFirstError: getFirstError(),
    };
};

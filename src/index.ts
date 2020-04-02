const { getFormattedLabel } = require("./util");

interface validatorReturnType {
  errors: object;
  isValid: boolean;
}

export const validate = (
  data: object | any,
  rules: object | any
): validatorReturnType => {
  let messages: object | any = {}; // all error messages will be in it

  /**
   * Tells if data is Valid or not
   */
  const isValid = (): boolean => {
    // return true if rules has no key
    if (Object.keys(rules).length) {
      return false;
    }
    // return true if error messages has no key
    if (Object.keys(messages).length) {
      return false;
    }
    return true;
  };

  /**
   * get rule method
   * return the method to run validation by tesing regx
   */
  const getRuleMethod = (rule: string): Function | null => {
    const rulesLibrary: Array<any> = [
      { regex: /^required$/, ruleMethod: requiredRule }
    ];

    const ruleToRun = rulesLibrary.find(ruleLibItem =>
      ruleLibItem.regex.test(rule)
    );

    if (ruleToRun != null) {
      return ruleToRun.ruleMethod;
    }
    return null;
  };

  /**
   * rules will ge here
   */
  const requiredRule = (value: any, label: string): string | boolean => {
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

      if (typeof dataKey === "string") {
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
          const msg = ruleMethod(dataValue, dataKey);
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

  return {
    errors: messages,
    isValid: isValid()
  };
};

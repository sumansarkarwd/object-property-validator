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
    const rulesLibrary: Array<any> = [
      { regex: /^required$/, ruleMethod: requiredRule },
      { regex: /^min:[0-9]+$/, ruleMethod: minRule },
      { regex: /^max:[0-9]+$/, ruleMethod: maxRule },
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
  /**
   * Runs required validation, for strings checks length, for numbers of null or not and for object of has any key or not
   * @param value 
   * @param label 
   * @param rule 
   */
  const requiredRule = (value: any, label: string, rule: string): string | boolean => {
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
   * Runs minimum validation, for string values checks the length of the string and for numbers check less or not
   * @param value 
   * @param label 
   * @param rule 
   */
  const minRule = (value: any, label: string, rule: string): string | boolean => {
    const regex = /^min:([0-9]+)$/;
    const matchs: Array<any> | any = rule.match(regex);
    const min_length: string | number | any = matchs[1];

    const typeOfValue = typeof value;
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

  /**
   * Runs maximum validation, for string values checks the length of the string and for numbers check greater or not
   * @param value 
   * @param label 
   * @param rule 
   */
  const maxRule = (value: any, label: string, rule: string): string | boolean => {
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
          const msg = ruleMethod(dataValue, dataKey, rule);
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

const rulesLibrary: Array<any> = [
    { regex: /^required$/, ruleMethod: 'requiredRule' },
    { regex: /^min:[0-9]+$/, ruleMethod: 'minRule' },
    { regex: /^max:[0-9]+$/, ruleMethod: 'maxRule' },
    { regex: /^after:[a-z0-9\-?]+(,[A-Za-z]+-[A-Za-z]+-[A-Za-z]+)?/, ruleMethod: 'afterDateRule' },
    { regex: /^number$/, ruleMethod: 'numberRule' },
    { regex: /^url$/, ruleMethod: 'urlRule' },
];

module.exports = rulesLibrary;

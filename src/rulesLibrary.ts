const rulesLibrary: Array<any> = [
    { regex: /^required$/, ruleMethod: 'requiredRule' },
    { regex: /^min:[0-9]+$/, ruleMethod: 'minRule' },
    { regex: /^max:[0-9]+$/, ruleMethod: 'maxRule' },
    { regex: /^after:[a-z0-9\-?]+$/, ruleMethod: 'afterDateRule' },
];

module.exports = rulesLibrary;

export {};
const { getFormattedLabel } = require("../util");
import * as moment from "moment";

/**
* Runs maximum validation, for string values checks the length of the string and for numbers check greater or not
* @param data
* @param value 
* @param label 
* @param rule 
*/
const afterDateRule = (data: object, value: any, label: string, rule: string): string | boolean => {
    let formatedLabel = getFormattedLabel(label);
    let message = `${formatedLabel} must be after date `;
    const date = moment(value, 'YYYY-MM-DD');
    if(!date.isValid()) { // validate rule date
        throw new Error(`Exception, date ${value} is invalid. Please use date format YYYY-MM-DD`);
    }
    if(rule === 'after:today') {
        const today = moment();
        const isAfterToday = date.isAfter(today);

        if(!isAfterToday) {
            return message + today.format('YYYY-MM-DD');
        }
    } else if(rule === 'after:tomorrow') {
        const tomorrow = moment().add(1, 'days');
        const isAfterTomorrow = date.isAfter(tomorrow);

        if(!isAfterTomorrow) {
            return message + tomorrow.format('YYYY-MM-DD');
        }
    } else {
        const regexGetDateFormat = /^after:[a-z0-9\-?]+,?([A-Za-z-]+)?/;
        const dateFormatMatches: string | any = rule.match(regexGetDateFormat);

        if(dateFormatMatches[1]) { // for rules like 'after:2020-04-10,YYYY-MM-DD'
            const regexGetDateNFormat = /^after:([a-z0-9\-?]+),?([A-Za-z-]+)?/;
            const dateNFormatMatchs: Array<any> | any  = rule.match(regexGetDateNFormat); /* ["after:2020-04-15,DD-MM-YYYY", 
                                                                                              "2020-04-15", "DD-MM-YYYY", 
                                                                                              index: 0, input: 
                                                                                              "after:2020-04-15,DD-MM-YYYY", 
                                                                                              groups: undefined] */
            const ruleDateFromMathces: string | any = dateNFormatMatchs[1]; // 2020-12-04
            const ruleDateFormatFromMathces: string | any = dateNFormatMatchs[2]; // YYYY-MM-DD
            
            const ruleDate = moment(ruleDateFromMathces, ruleDateFormatFromMathces, true);
            if(!ruleDate.isValid()) { // validate rule date
                throw new Error(`Exception, date ${date} is invalid. Please use date format ${ruleDateFormatFromMathces}`);
            }
            const dataDate = moment(value, ruleDateFormatFromMathces, true);
            if(!dataDate.isValid()) { // validate data date
                throw new Error(`Exception, date ${value} is invalid. Please use date format ${ruleDateFormatFromMathces}`);
            }
            
            const isAfterRuleDate = dataDate.isAfter(ruleDate);

            if(!isAfterRuleDate) {
                return message + ruleDate.format('YYYY-MM-DD');
            }
        } else { // for rules like 'after:2020-04-10'
            const regexGetDateMatches = /^after:([a-z0-9\-?]+)$/;
            const dateMatchs: Array<any> | any = rule.match(regexGetDateMatches);
            const ruleDateFromMathces: string | any = dateMatchs[1];

            const ruleDate = moment(ruleDateFromMathces, 'YYYY-MM-DD', true);
            if(!ruleDate.isValid()) { // validate rule date
                throw new Error(`Exception, date ${date} is invalid. Please use date format YYYY-MM-DD`);
            }
            const dataDate = moment(value, 'YYYY-MM-DD', true);
            if(!dataDate.isValid()) { // validate data date
                throw new Error(`Exception, date ${value} is invalid. Please use date format YYYY-MM-DD`);
            }
            const isAfterRuleDate = dataDate.isAfter(ruleDate);

            if(!isAfterRuleDate) {
                return message + ruleDate.format('YYYY-MM-DD');
            }
        }
    }
    return false;
}

module.exports = afterDateRule;

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
    const regex = /^after:([a-z0-9\-?]+)$/;
    const matchs: Array<any> | any = rule.match(regex);
    const after: string | any = matchs[1];

    if(value) {
        if(after === 'today') {
            const today = moment();
            const date = moment(value, 'YYYY-MM-DD');
            const isAfterToday = date.isAfter(today);

            if(!isAfterToday) {
                return message + today.format('YYYY-MM-DD');
            }
        }
        else if(after === 'tomorrow') {
            const tomorrow = moment().add(1, 'days');
            const date = moment(value, 'YYYY-MM-DD');
            const isAfterTomorrow = date.isAfter(tomorrow);

            if(!isAfterTomorrow) {
                return message + tomorrow.format('YYYY-MM-DD');
            }
        } else {
            // this block is for checking after rule with values like date => 2020-04-10 | 'YYYY-MM-DD'
            const ruleDate = moment(after, 'YYYY-MM-DD');
            const date = moment(value, 'YYYY-MM-DD');
            const isAfterRuleDate = date.isAfter(ruleDate);

            if(!isAfterRuleDate) {
                return message + ruleDate.format('YYYY-MM-DD');
            }
        }
    }

    return false;
}

module.exports = afterDateRule;

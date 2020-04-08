## Object Property Validator
Object Property Validator is a simple plugin to validate javascript objects. It is inspired by Laravel validations.

## Installation
```bash
npm install object-property-validator
```
or
```bash
yarn add object-property-validator
```

## Usage
```node
import {validate} from "object-property-validator;

const data = {
    name: 'John Doe',
}
const rules = {
    name: 'required',
    phone: 'required|min:10|max:10',
}
const {isValid, errors} = validate(data, rules);

if(!isValid) {
    console.log(errors);
}
```

## Rules Library
| Rule | Usage | Description |
| --- | --- | --- |
| 'required' | 'required' | Runs the required rule on values, for string values checks the length of the string |
| min:{minLength} | min:6 | Check if given value is greater than the rule value or not, for string values checks the length of the string |
| max:{maxLength} | max:6 | Check if given value is less than the rule value or not, for string values checks the length of the string |
| after:today | 'after:today' | Checks if the given date is after today or not |
| after:tomorrow | 'after:tomorrow' | Checks if the given date is after tomorrow or not |
| after:{date} | 'after:2020-04-11' | Checks if the given date is after the rule date or not. ###Note: the date format must YYYY-MM-DD |
| after:{date},{format} | 'after:11-04-2020,DD-MM-YYYY' | Checks if the given date is after the rule date or not. This time you also pass your own date format. #### Note: Make sure to use a valid date format. Behind the scene this package uses moment JS to compare dates |

#Object Property Validator
Object Property Validator is a simple plugin to validate javascript objects. It is inspired by Laravel validations.

#Installation
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
    email: 'required',
}
const {isValid, errors} = validate(data, rules);

if(!isValid) {
    console.log(errors);
}
```

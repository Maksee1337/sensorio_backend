import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isEmpty,
  isInt,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsKeyValueValidator implements ValidatorConstraintInterface {
  validate(object: Object, args: ValidationArguments) {
    for (const [key, value] of Object.entries(object)) {
      if (isEmpty(key) || isEmpty(value) || !isInt(+key) || isNaN(+value)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'This is should be a key-value pair object, where key is a number and value is a number!';
  }
}

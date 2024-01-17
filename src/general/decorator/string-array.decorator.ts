import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { go, map } from '../fx';
import { reduce } from 'rxjs';

@ValidatorConstraint({ async: false })
export class IsStringArrayConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (!Array.isArray(value)) return false;

    if (value.length === 1) return typeof value[0] === 'string';

    const result = go(
      value,
      map((a: any) => typeof a === 'string'),
      reduce((a: boolean, b: boolean) => a && b),
    );
    if (!result) return false;

    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'String Array 규칙 위반입니다.';
  }
}

export function IsStringArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStringArray',
      async: false,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStringArrayConstraint,
    });
  };
}

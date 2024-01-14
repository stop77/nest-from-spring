import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsSearchWord implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    if (typeof value !== 'string') return false;

    let regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regex.test(value)) return false;

    if (value.length <= 0 || value.length > 35) return false;

    return true;
  }
  defaultMessage(args?: ValidationArguments): string {
    return `SearchWord Validation 에러입니다. 글자수 제한(1~35)이나 특수문자를 사용했는지 확인해 주세요.`;
  }
}

export const SearchWord = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'SearchWord',
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsSearchWord,
    });
  };
};

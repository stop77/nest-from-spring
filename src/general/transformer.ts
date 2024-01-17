import { ValueTransformer } from 'typeorm';

export class BoolTinyintTransformer implements ValueTransformer {
  to(value: boolean | null): number | null {
    if (value === null) {
      return null;
    }
    return value ? 1 : 0;
  }
  from(value: number | null): boolean | null {
    if (value === null) {
      return null;
    }
    return value === 1;
  }
}

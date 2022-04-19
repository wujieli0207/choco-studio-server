import { isNumber, isNumberString, isDateString } from 'class-validator';

export function unknowToNumber(value: unknown): number | unknown {
  return isNumberString(value) ? Number(value) : value;
}

export function numberToBoolean(value: number): boolean | number {
  return isNumber(value, {
    allowNaN: false,
    allowInfinity: false,
  })
    ? Boolean(value)
    : value;
}

export function unknowToDate(value: unknown): Date | unknown {
  return isDateString(value) ? new Date(value as string) : value;
}

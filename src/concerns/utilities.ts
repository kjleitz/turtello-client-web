export function toArray<T>(value: T[]): T[];
export function toArray<T>(value: T): T[];
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function isNullish(value: any): value is (null | undefined) {
  return value === null || typeof value === 'undefined';
}

export function compact<T>(list: T[]): NonNullable<T>[] {
  return list.filter(item => !isNullish(item)) as NonNullable<T>[];
}

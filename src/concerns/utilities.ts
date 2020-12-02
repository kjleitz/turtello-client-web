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

export function isLegitObject(val: any): val is Record<string, any> {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export function joinSentences(messages: string[]): string {
  const punctuate = (str: string): string => (str.match(/[,.?!]+$/) ? str : `${str}.`);
  const capitalize = (str: string): string => `${(str[0] || '').toUpperCase()}${str.slice(1)}`;
  return messages.map(err => capitalize(punctuate(err))).join(' ');
}

export function roundToNearestHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

export function floorToNearestHalf(value: number): number {
  return Math.floor(value * 2) / 2;
}

export function mapDestroy<T, R>(list: T[], mapper: (item: T, index: number, fullList: T[]) => R): R[] {
  return [...list].map((item, index, fullList) => {
    const value = mapper(item, index, fullList);
    list.splice(index, 1);
    return value;
  });
}

export function replaceAt<T>(list: T[], replacement: T, atIndex: number): T[] {
  return [...list.slice(0, atIndex), replacement, ...list.slice(atIndex + 1)];
}

export function removeAt<T>(list: T[], atIndex: number): T[] {
  return [...list.slice(0, atIndex), ...list.slice(atIndex + 1)];
}

export function bound(value: number, [min, max]: [number, number]): number {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  return Math.max(realMin, Math.min(value, realMax));
}

export function toInt(value: any): number {
  return typeof value === 'number' ? value : parseInt(`${value}`, 10);
}

export function toNum(value: any): number {
  return typeof value === 'number' ? value : parseFloat(`${value}`);
}

export function isVowel(letter: string, sometimesY = false): boolean {
  return `aeiou${sometimesY ? 'y' : ''}`.includes(letter);
}

export function isConsonant(letter: string, sometimesY = false): boolean {
  return !isVowel(letter, sometimesY);
}

export function capitalize(text: string): string {
  return text.replace(/^\w/, first => first.toUpperCase());
}

export function fib(maxLength: number, sequence: number[] = []): number[] {
  const { length } = sequence;

  if (length >= maxLength) return sequence;
  if (length === 0)        return fib(maxLength, [1]);
  if (length === 1)        return fib(maxLength, [1, 1]);

  const previous = sequence[length - 2];
  const current = sequence[length - 1];
  return fib(maxLength, [...sequence, previous + current]);
}

export function sum(numbers: number[]): number {
  return numbers.reduce((memo, num) => memo + num, 0);
}

export function average(numbers: number[]): number {
  return numbers.length ? sum(numbers) / numbers.length : 0;
}

export function allSame<T, K extends keyof T>(list: T[], property?: K): boolean {
  return list.every((item, index) => {
    if (index === 0) return true;
    const prev = list[index - 1];
    return typeof property === 'undefined' ? item === prev : item[property] === prev[property];
  });
}

export function pick<T extends Record<string, any>, K extends keyof T>(data: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((memo, key) => ({ ...memo, [key]: data[key] }), {} as Pick<T, K>);
}

export function isBetween(value: number, [min, max]: [number, number], inclusive = true): boolean {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  return inclusive
    ? realMin <= value && value <= realMax
    : realMin < value && value < realMax;
}

export function randomBetween(min: number, max: number, integer = false): number {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  const diff = Math.random() * (realMax - realMin);
  return realMin + (integer ? Math.round(diff) : diff);
}

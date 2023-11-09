export function getKeyByValue<T extends object, V extends keyof T>(
  obj: T,
  value: T[V],
): keyof T | undefined {
  return (Object.keys(obj) as Array<keyof T>).find((key) => obj[key] === value);
}

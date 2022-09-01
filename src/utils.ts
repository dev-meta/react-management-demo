export function pick<T extends object, K extends keyof T>(obj:T, keys: K[]): Pick<T, K> {
    const entries = keys.map(key => [key, obj[key]]);
    return Object.fromEntries(entries)
}
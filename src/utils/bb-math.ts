export function bound(value: number, min?: number, max?: number): number {
    if (min !== undefined) {
        if (max !== undefined) return Math.min(Math.max(min, value), max);

        return Math.max(min, value);
    }
    else if (max !== undefined) {
        return Math.min(max, value);
    }
    return value;
}

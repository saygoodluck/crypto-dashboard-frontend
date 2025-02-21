export const round = (num: number, decimals: number = 2): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Округляет число до заданного количества знаков после запятой.
 *
 * @param value Число, которое нужно округлить.
 * @param decimals Количество знаков после запятой (по умолчанию 2).
 * @returns Округлённое число.
 */
export function roundNumber(value: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Форматирует число объёма, округляя его:
 * - < 10K – возвращает число как есть.
 * - [10K, 100K) – округляет до ближайших 10K.
 * - [100K, 1M) – округляет до ближайших 100K.
 * - [1M, 1B) – округляет до ближайших 1M.
 * - >=1B – округляет до ближайших 1B.
 *
 * @param value Число для форматирования.
 * @returns Отформатированная строка с суффиксом.
 */
export function formatVolume(value: number): string {
    if (value < 10000) {
        return value.toString();
    } else if (value < 100000) {
        const rounded = Math.round(value / 10000) * 10000;
        return (rounded / 1000).toFixed(0) + "K";
    } else if (value < 1e6) {
        const rounded = Math.round(value / 100000) * 100000;
        return (rounded / 1000).toFixed(0) + "K";
    } else if (value < 1e9) {
        const rounded = Math.round(value / 1e6) * 1e6;
        return (rounded / 1e6).toFixed(0) + "M";
    } else {
        const rounded = Math.round(value / 1e9) * 1e9;
        return (rounded / 1e9).toFixed(0) + "B";
    }
}
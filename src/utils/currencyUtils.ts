export const roundCryptoPrice = (price: string): string => {
    const num = parseFloat(price);
    return Number(num).toFixed(2);
};

export const formatNumber = (num: number): string => {
    return num.toLocaleString();
};

export const round = (num: number, decimals: number = 2): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const formatPrice = (value: number): string => {
    let decimals = 2;

    if (value < 1) {
        decimals = 6;
    } else if (value < 10) {
        decimals = 4;
    } else if (value < 100) {
        decimals = 3;
    }

    return value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};


// export const round = (num: number): number => {
//     return parseFloat(Number(num).toFixed(2));
// }

// export const formatNumber = (num: number): string => {
//     return new Intl.NumberFormat('ru-RU', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//     }).format(num);
// };
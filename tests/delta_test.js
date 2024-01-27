function compareOpenPrices(dict1, dict2) {
    const date1 = new Date(dict1.date);
    const date2 = new Date(dict2.date);

    const timeDiff = Math.abs(date2 - date1);
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        const openPriceDiff = Math.abs(dict1.open - dict2.open);
        const openPriceDiffPercent = (openPriceDiff / dict1.open) * 100;

        if (openPriceDiffPercent > 5) {
            return "SWING!";
        } else {
            return "No significant swing.";
        }
    } else {
        return "The dictionaries are not 1 day apart.";
    }
}

dict3 = {
    "date": "2024-01-25",
    "open": 148.34,
    "high": 150.29,
    "low": 147.40,
    "close": 149.60,
    "volume": 43456500,
    "adj_close": 149.60,
    "unadjusted_volume": 43456500,
    "change": 1.26,
    "change_percent": 0.85,
    "label": "MSFT",
    "change_over_time": 0.85,
    "additionalProp1": {}
}

dict4 = {
    "date": "2024-01-24",
    "open": 200.53,
    "high": 150.29,
    "low": 147.40,
    "close": 149.60,
    "volume": 43456500,
    "adj_close": 149.60,
    "unadjusted_volume": 43456500,
    "change": 1.26,
    "change_percent": 0.85,
    "label": "MSFT",
    "change_over_time": 0.85,
    "additionalProp1": {}
}

console.log(compareOpenPrices(dict3, dict4));

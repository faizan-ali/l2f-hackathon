from datetime import datetime, timedelta

def compare_open_prices(dict1, dict2):
    date1 = datetime.strptime(dict1["date"], "%Y-%m-%d")
    date2 = datetime.strptime(dict2["date"], "%Y-%m-%d")
    
    if abs((date2 - date1).days) == 1:
        open_price_diff = abs(dict1["open"] - dict2["open"])
        open_price_diff_percent = (open_price_diff / dict1["open"]) * 100
        if open_price_diff_percent > 5:
            return "SWING!"
        else:
            return "No significant swing."
    else:
        return "The dictionaries are not 1 day apart."

    
dict1 = {
    "date": "2024-01-26",
    "open": 150.25,
    "high": 152.18,
    "low": 149.20,
    "close": 151.70,
    "volume": 35678900,
    "adj_close": 151.70,
    "unadjusted_volume": 35678900,
    "change": 1.45,
    "change_percent": 0.97,
    "label": "MSFT",
    "change_over_time": 0.97,
    "additionalProp1": {}
}

dict2 = {
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

dict3 = {
    "date": "2024-01-23",
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

print(compare_open_prices(dict1, dict3))
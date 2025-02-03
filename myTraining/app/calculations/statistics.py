from collections import defaultdict
from datetime import datetime

def calculate_sugar_vs_ice(user_drink_data):
    try:
        return [
            {"x": drink["sugarLevel"], "y": drink["iceLevel"]}
            for drink in user_drink_data
            if not drink.get("placeholder", False)
        ]
    except KeyError as e:
        return []

def calculate_rating_count(user_drink_data):
    rating_counts = {rating: 0 for rating in range(11)}
    for drink in user_drink_data:
        rating = drink.get("rating")
        if rating is not None and 0 <= rating <= 10:
            rating_counts[rating] += 1
    return rating_counts

def calculate_drinks_per_week(user_drink_data):
    return {"week1": 10, "week2": 15}

def calculate_money_per_week(user_drink_data):
    return {"week1": 50, "week2": 75}

def calculate_average_drink_price(user_drink_data):
    prices = [float(drink.get("drinkPrice", 0)) for drink in user_drink_data if float(drink.get("drinkPrice", 0)) > 0]
    return sum(prices) / len(prices) if prices else 0

def calculate_money_spent_per_month(user_drink_data):
    spending = defaultdict(lambda: [0.0] * 12)
    for drink in user_drink_data:
        drink_price = float(drink.get("drinkPrice", 0))
        record_history = drink.get("drinkRecordHistory", {})

        for record in record_history.values():
            try:
                date = datetime.strptime(record["date"], "%m-%d-%Y")
                year, month = date.year, date.month
                spending[year][month - 1] += drink_price
            except Exception as e:
                continue

    return dict(spending)

def calculate_total_money_spent(user_drink_data):
    try:
        return sum(
            float(drink.get("drinkPrice", 0)) * len(drink.get("drinkRecordHistory", {}))
            for drink in user_drink_data
        )
    except Exception as e:
        return 0.0

def calculate_top_three_drinks(user_drink_data):
    try:
        drink_counts = [
            {"name": drink.get("name", "Unnamed Drink"), "count": len(drink.get("drinkRecordHistory", {})), "data": drink}
            for drink in user_drink_data
        ]
        return sorted(drink_counts, key=lambda x: x["count"], reverse=True)[:3]
    except Exception as e:
        return []

def calculate_drinks_per_month(user_drink_data):
    drink_counts = defaultdict(lambda: [0] * 12)
    for drink in user_drink_data:
        record_history = drink.get("drinkRecordHistory", {})
        for record in record_history.values():
            try:
                date = datetime.strptime(record["date"], "%m-%d-%Y")
                year, month = date.year, date.month
                drink_counts[year][month - 1] += 1
            except Exception as e:
                continue

    return dict(drink_counts)


def calculate_total_drink_count(user_drink_data):
    try:
        total_count = 0
        for drink in user_drink_data:
            record_history = drink.get("drinkRecordHistory", {})
            total_count += len(record_history)

        return total_count
    except Exception as e:
        return 0

def calculate_sugar_vs_ice_freq(user_drink_data):
    levels = [0, 25, 50, 75, 100]
    sugar_counts = {level: 0 for level in levels}
    ice_counts = {level: 0 for level in levels}

    try:
        for drink in user_drink_data:
            sugar_level = drink.get("sugarLevel")
            if sugar_level in sugar_counts:
                sugar_counts[sugar_level] += 1

            ice_level = drink.get("iceLevel")
            if ice_level in ice_counts:
                ice_counts[ice_level] += 1

        return {
            "sugar_level": [sugar_counts[level] for level in levels],
            "ice_level": [ice_counts[level] for level in levels],
        }
    except Exception as e:
        return {
            "sugar_level": [0] * len(levels),
            "ice_level": [0] * len(levels),
        }

def calculate_money_spent_change_previous_month(user_drink_data):
    from datetime import datetime

    try:
        spending = defaultdict(float)

        today = datetime.today()
        current_month = today.month
        current_year = today.year

        if current_month == 1:
            previous_month = 12
            previous_year = current_year - 1
        else:
            previous_month = current_month - 1
            previous_year = current_year

        for drink in user_drink_data:
            drink_price = float(drink.get("drinkPrice", 0))
            record_history = drink.get("drinkRecordHistory", {})

            for record in record_history.values():
                try:
                    date = datetime.strptime(record["date"], "%m-%d-%Y")
                    year, month = date.year, date.month

                    if year == current_year and month == current_month:
                        spending["current_month"] += drink_price
                    elif year == previous_year and month == previous_month:
                        spending["previous_month"] += drink_price
                except Exception as e:
                    continue

        current_month_total = spending["current_month"]
        previous_month_total = spending["previous_month"]
        change = current_month_total - previous_month_total

        return {
            "current_month_total": current_month_total,
            "previous_month_total": previous_month_total,
            "change": change,
        }

    except Exception as e:
        return {
            "current_month_total": 0.0,
            "previous_month_total": 0.0,
            "change": 0.0,
        }

def calculate_drink_count_change_previous_month(user_drink_data):
    from datetime import datetime

    try:
        drink_counts = defaultdict(int)

        today = datetime.today()
        current_month = today.month
        current_year = today.year

        if current_month == 1:
            previous_month = 12
            previous_year = current_year - 1
        else:
            previous_month = current_month - 1
            previous_year = current_year

        for drink in user_drink_data:
            record_history = drink.get("drinkRecordHistory", {})

            for record in record_history.values():
                try:
                    date = datetime.strptime(record["date"], "%m-%d-%Y")
                    year, month = date.year, date.month

                    if year == current_year and month == current_month:
                        drink_counts["current_month"] += 1
                    elif year == previous_year and month == previous_month:
                        drink_counts["previous_month"] += 1
                except Exception as e:
                    continue

        current_month_count = drink_counts["current_month"]
        previous_month_count = drink_counts["previous_month"]
        change = current_month_count - previous_month_count

        return {
            "current_month_count": current_month_count,
            "previous_month_count": previous_month_count,
            "change": change,
        }

    except Exception as e:
        return {
            "current_month_count": 0,
            "previous_month_count": 0,
            "change": 0,
        }

def calculate_average_drink_rating(user_drink_data):
    try:
        ratings = [
            drink.get("rating")
            for drink in user_drink_data
            if drink.get("rating") is not None
        ]

        if not ratings:
            return 0.0

        average_rating = sum(ratings) / len(ratings)
        return round(average_rating, 2)

    except Exception as e:
        return 0.0


# NOTE not all functions are complete
STATISTIC_FUNCTIONS = {
    "sugar_vs_ice": calculate_sugar_vs_ice,
    "rating_count": calculate_rating_count,
    "drink_per_week": calculate_drinks_per_week,
    "money_per_week": calculate_money_per_week,
    "average_drink_price": calculate_average_drink_price,
    "money_spent_per_month": calculate_money_spent_per_month,  
    "total_money_spent": calculate_total_money_spent,
    "top_three_drinks" : calculate_top_three_drinks,
    "drinks_per_month": calculate_drinks_per_month, 
    "total_drink_count": calculate_total_drink_count,
    "sugar_vs_ice_freq": calculate_sugar_vs_ice_freq,
    "money_spent_change_previous_month": calculate_money_spent_change_previous_month,
    "drink_count_change_previous_month": calculate_drink_count_change_previous_month,
    "average_drink_rating": calculate_average_drink_rating,
}
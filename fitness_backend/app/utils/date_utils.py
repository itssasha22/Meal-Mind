from datetime import date, timedelta


def date_range(start: date, end: date) -> list[date]:
    """Return a list of dates from start to end inclusive."""
    days = (end - start).days
    return [start + timedelta(days=i) for i in range(days + 1)]


def week_bounds(d: date) -> tuple[date, date]:
    """Return the Monday and Sunday of the week containing d."""
    monday = d - timedelta(days=d.weekday())
    sunday = monday + timedelta(days=6)
    return monday, sunday


def month_bounds(d: date) -> tuple[date, date]:
    """Return the first and last day of the month containing d."""
    first = d.replace(day=1)
    if d.month == 12:
        last = d.replace(month=12, day=31)
    else:
        last = d.replace(month=d.month + 1, day=1) - timedelta(days=1)
    return first, last


def days_between(a: date, b: date) -> int:
    return abs((b - a).days)

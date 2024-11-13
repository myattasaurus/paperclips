function onLoad() {
    let multiplier = 1000;

    let stored = 1;
    stored += 2 * multiplier;

    multiplier *= 60;
    stored += 3 * multiplier;

    multiplier *= 60;
    stored += 4 * multiplier;

    multiplier *= 24;
    stored += 5 * multiplier;

    let div = document.getElementById('timeAway');
    console.log(div);

    div.innerHTML = 'Time Away: ';

    let divider = {
        millis: 1,
        seconds: 1000,
        minutes: 60 * 1000,
        hours: 60 * 60 * 1000,
        days: 24 * 60 * 60 * 1000
    }

    let timeAway = {};
    timeAway.days = Math.floor(stored / divider.days);
    div.innerHTML += timeAway.days + ' days ';

    timeAway.hours = Math.floor(stored / divider.hours) % timeAway.days;
    div.innerHTML += timeAway.hours + ' hours ';

    timeAway.minutes = Math.floor(stored / divider.minutes) % timeAway.hours;
    div.innerHTML += timeAway.minutes + ' minutes ';

    timeAway.seconds = Math.floor(stored / divider.seconds) % timeAway.minutes;
    div.innerHTML += timeAway.seconds + ' seconds ';
}

function awayTime(timeAwayInMillis, divider, unit) {
    let timeAway = Math.floor(timeAwayInMillis / divider);
    if (timeAway > 0) {
        return timeAway + ' ' + unit + ' ';
    }
    return '';
}

document.onvisibilitychange = (e) => {
    if (document.visibilityState === 'hidden') {
        localStorage.setItem('matt', Date.now());
    } else if (localStorage.getItem('matt')) {
        let now = Date.now();
        let storedTimestamp = Number(localStorage.getItem('matt'));
        let duration = now - storedTimestamp;
        console.log('Seconds since last uploaded: ' + Math.floor(duration / 1000) + '.' + (duration % 1000));
    }
}



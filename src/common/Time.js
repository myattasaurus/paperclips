export class Time {
    static now(mod = 100) {
        return Math.floor(Date.now() / 1000) % mod + '.' + Date.now() % 1000
    }
}
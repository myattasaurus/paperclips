class Assertion {
    constructor(actual) {
        this.actual = actual;
    }

    equals(expected) {
        if (this.actual != expected) {
            throw false;
        }
    }
}

export default function assertThat(actual) {
    return new Assertion(actual);
}
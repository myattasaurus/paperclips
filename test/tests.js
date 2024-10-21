import { Interval } from "../src/common/Interval.js";
import { body } from "../src/common/elements.js";
import assertThat from "./assert.js";

let suites = [
    {
        name: 'Interval',
        tests: [
            {
                description: 'Remainder is positive',
                run: () => {
                    let interval = new Interval(500);
                    interval.tick(1000);
                    interval.tick(1516);
                    assertThat(interval.remainder).equals(16);
                }
            },
            {
                description: 'Remainder is giant',
                run: () => {
                    let interval = new Interval(500);
                    interval.tick(1000);
                    interval.tick(2001500);
                    assertThat(interval.remainder).equals(2000000);
                }
            },
        ]
    }
];

let boday = body();

for (let suite of suites) {
    let heading = document.createElement('h2');
    heading.append(suite.name);
    boday.append(heading);

    let ul = document.createElement('ul');
    boday.append(ul);

    for (let test of suite.tests) {
        let passed = true;
        try {
            test.run();
        } catch (result) {
            passed = false;
        }
        let litem = li(test.description, passed);
        ul.append(litem);
    }
}
function li(text, passed) {
    let li = document.createElement('li');
    li.append(text);
    li.classList.add(passed ? 'passed' : 'failed');
    return li;
}
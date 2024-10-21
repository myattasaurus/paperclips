import { Interval } from "../src/common/Interval.js";
import { body } from "../src/common/elements.js";
import assertThat from "./assert.js";

let suites = [
    {
        name: 'Interval',
        tests: [
            {
                description: 'Runs twice during fast ticks',
                run: () => {
                    let runCount = 0;
                    let interval = new Interval(500, () => {
                        runCount++;
                    });

                    interval.tick(0);
                    interval.tick(100);
                    interval.tick(200);
                    interval.tick(510); // should run once

                    interval.tick(610);
                    interval.tick(710);
                    interval.tick(810);
                    interval.tick(1000); // should run again

                    assertThat(runCount).equals(2);
                }
            },
            {
                description: '"Runs" thrice during slow ticks (simulates user going to another tab)',
                run: () => {
                    let intervalCount = 0;
                    let interval = new Interval(500, (ret) => intervalCount = ret.cycles);
                    interval.tick(0);
                    interval.tick(1501);
                    assertThat(intervalCount).equals(3);
                }
            },
            {
                description: 'Runs once (edge case)',
                run: () => {
                    let intervalCount = 0;
                    let interval = new Interval(500, (ret) => intervalCount = ret.cycles);
                    interval.tick(0);
                    interval.tick(999);
                    assertThat(intervalCount).equals(1);
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
        let errorMessage = '';
        try {
            test.run();
        } catch (e) {
            errorMessage = e;
        }
        let litem = li(test.description, errorMessage);
        ul.append(litem);
    }
}
function li(text, errorMessage) {
    let li = document.createElement('li');
    li.append(text, errorMessage);
    li.classList.add(errorMessage == '' ? 'passed' : 'failed');
    return li;
}
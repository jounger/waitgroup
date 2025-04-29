export default function waitgroup() {
    const generator = (function* () {
        yield* {
            [Symbol.iterator]() {
                let count = 0;
                let done = false;
                return {
                    next(step) {
                        if (!done && step !== undefined) {
                            count = Math.max(0, (count += step));
                            done = count === 0;
                        }
                        return { value: count, done: done };
                    },
                };
            },
        };
    })();
    generator.next(); // initialize the generator
    return {
        add: function (number = 1) {
            if (number <= 0) {
                console.error("Number of tasks to add must be greater than 0");
                return;
            }
            return generator.next(number);
        },
        done: function (number = 1) {
            if (number <= 0) {
                console.error("Number of tasks to complete must be greater than 0");
                return;
            }
            generator.next(-number);
        },
        wait: async function () {
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    const { done } = generator.next();
                    if (done) {
                        clearInterval(interval);
                        resolve(true);
                    }
                }, 0);
            });
        },
    };
}

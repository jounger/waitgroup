const waitgroup = async () => Promise.resolve((function*() {
    yield* {
        [Symbol.iterator]: (i = 0, done = false) => ({
            next: (step) => (step && (done = (i += step) === 0) || true) && { i, done },
            return: () => ({ i, done })
        })
    }
})()).then((iterator) => iterator.next() && {
    add: (delta = 1) => Number.isInteger(delta) && delta > 0 && iterator.next(delta),
    done: () => iterator.next(-1),
    wait: async () => new Promise(resolve => setInterval(function() { iterator.return().done && resolve(this) }, 0)).then((interval) => clearInterval(interval))
})

export { waitgroup as default }

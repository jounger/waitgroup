export default function waitgroup() {
    const iter = (function*() {
        yield* {
            [Symbol.iterator]: (state = null) =>
            ((state = { i: 0, done: false }) && {
                next: (step = 0) => (step !== 0 && (step > 0 ? state.i += step : state.done = (state.i -= 1) === 0) || true) && state,
                return: () => state
            })
        }
    })()
    iter.next(0)
    return {
        add: (delta) => iter.next(delta > 0 ? delta : 1),
        done: () => iter.next(-1),
        wait: async (loop = null) => new Promise(resolve => loop = setInterval(() => iter.return().done && (clearInterval(loop) || resolve(true), 0)))
    }
}

// Mock Worker for tests
globalThis.Worker = class {
    constructor() {}
    postMessage() {}
    terminate() {}
} as any

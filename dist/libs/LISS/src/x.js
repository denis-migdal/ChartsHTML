class SignalEvent {
    #callbacks = new Set();
    listen(callback) {
        this.#callbacks.add(callback);
        return this;
    }
    unlisten(callback) {
        this.#callbacks.delete(callback);
        return this;
    }
    trigger() {
        for (let callback of this.#callbacks)
            callback(this);
        return this;
    }
}
export class ROSignal extends SignalEvent {
    constructor(initialValue) {
        super();
        this._value = initialValue ?? null;
    }
    _value = null;
    hasValue() {
        return this._value !== null;
    }
    get value() {
        return this._value;
    }
}
export class Signal extends ROSignal {
    get value() {
        return super.value;
    }
    set value(value) {
        // do not trigger if value didn't changed.
        if (value === this._value)
            return;
        this._value = value;
        this.trigger();
        return;
    }
    clear() {
        this.value = null;
        return this;
    }
}
export class SignalEventMerger extends SignalEvent {
    #callback = () => {
        this.trigger();
    };
    constructor(...sources) {
        super();
        for (let source of sources)
            this.add(source);
    }
    add(signal) {
        signal.listen(this.#callback);
        return this;
    }
    remove(signal) {
        signal.unlisten(this.#callback);
        return this;
    }
}
export class LazyComputedSignal extends ROSignal {
    #source;
    #compute;
    #cached = false;
    addComputation(callback) {
        const previous = this.#compute;
        this.#compute = (sources) => callback(sources, previous);
    }
    get value() {
        if (this.#cached !== true)
            this._value = this.#compute(this.#source);
        return this._value;
    }
    constructor(source, compute) {
        super();
        this.#compute = compute;
        this.#source = source;
        console.warn("src", this.#source);
        this.#source.listen(() => {
            // lazy computation...
            this.#cached = false;
            /* const value = compute(this.#sources);

            // do not trigger if value didn't changed.
            if( this._value === value )
                return;
            this._value = value;*/
            this.trigger();
        });
    }
}
class ThrottledMethod {
    _event;
    _blocked = false;
    _waiting = false;
    _started = false;
    constructor(event) {
        this._event = event;
    }
    block(blocked = true) {
        this._blocked = blocked;
        if (this._waiting && !blocked) {
            this._started = true;
            this._waiting = false;
            this.startTriggerProcess();
        }
    }
    startTriggerProcess() {
        this.trigger();
    }
    trigger() {
        // update is canceled until the next unblock.
        if (this._blocked) {
            this._waiting = true;
            this._started = false;
            return;
        }
        // perform the update
        this._started = false;
        this._event.trigger();
    }
    requestTrigger() {
        if (this._started) {
            return;
        }
        if (this._blocked) {
            this._waiting = true;
            return;
        }
        this._started = true;
        this._waiting = false;
        this.startTriggerProcess();
    }
}
class AnimationFrameThrottledMethod extends ThrottledMethod {
    #callback = () => {
        this.trigger();
    };
    startTriggerProcess() {
        requestAnimationFrame(this.#callback);
    }
}
class ThrottledSignalEvent extends SignalEvent {
    #throttledMethod;
    constructor(event, throttledMethod = AnimationFrameThrottledMethod) {
        super();
        this.#throttledMethod = new throttledMethod(this);
        event.listen(() => {
            this.#throttledMethod.requestTrigger();
        });
    }
    changeThrottledMethod() {
        throw new Error("not implemented");
    }
    blockSignal(blocked = true) {
        this.#throttledMethod.block(blocked);
    }
}
//# sourceMappingURL=x.js.map
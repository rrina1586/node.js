const EventEmitter = require('events');
const emitter = new EventEmitter();

const RequestTypes = [
    {
        type: 'send',
        payload: 'to send a document',
    },
    {
        type: 'receive',
        payload: 'to receive a document',
    },
    {
        type: 'sign',
        payload: 'to sign a document',
    },
];

class Customer {
    constructor({ type, payload}) {
        this.type = type;
        this.payload = payload;
    }
}

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateNewCustomer = () => {
    const randomIndex = generateIntInRange(0, RequestTypes.length - 1);
    const randomCustomerType = RequestTypes[randomIndex];
    return new Customer(randomCustomerType);
};

const run = async () => {
    const { type, payload} = generateNewCustomer();

    emitter.emit(type, payload);

    await new Promise(resolve => setTimeout(resolve, generateIntInRange(1000, 5000)));
    await run();
}

class Handler {
    static send(payload) {
        console.log("Send request", payload);
    }
    static receive(payload) {
        console.log("receive request", payload);
    }
    static sign(payload) {
        console.log("sign request", payload);
    }
}

emitter.on("send", Handler.send);
emitter.on("receive", Handler.receive);
emitter.on("sig", Handler.sign);


run();
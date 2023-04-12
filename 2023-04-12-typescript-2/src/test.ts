interface EventType {
  eventType: string;
  data: { payee: string; };
}

const myEvent: EventType = {
  eventType: "payment",
  data: { payee: "07011111111" }
};

interface PaymentType {
  amount: number;
  message: string;
}

const myPayment: PaymentType = {
  amount: 123,
  message: 'Hello'
}


const isEvent = 
  (e: EventType | PaymentType): e is EventType => {
    // if key eventType exists in object e
    return "eventType" in e;
  };


const doStuff = (e: EventType | PaymentType) => {
  if(isEvent(e)){
    console.log(e.data);
    //          ^? const e: EventType
  }
}


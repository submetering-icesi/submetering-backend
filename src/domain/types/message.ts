export type BrokerMessage = 
    BrokerMessageRegister | BrokerMessageMetering

export type BrokerMessageRegister = {
    type: "register"
    name: string
    location: string
    timestamp: number
}

export type BrokerMessageMetering = {
    type: "metering"
    submeter: string
    registry: string
    timestamp: number
    value: number[]
}
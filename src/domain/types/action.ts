export type Action = {
    action: "register"
} | {
    action: "read",
    register: string
}
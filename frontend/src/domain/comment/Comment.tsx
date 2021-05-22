interface users {
    localId: string
}

export default interface Comment {
    id: number
    createdAt: Date
    content: string
    users: users
}

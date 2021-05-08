interface User {
    username: string
    password: string
}

//todo should connect api server to production
//temporary code for checking login function
const UserRepository: User[] = [
    {
        username: 'kang',
        password: 'hyeonseung'
    }, {
        username: 'pk',
        password: 'nu'
    }
]

export default UserRepository

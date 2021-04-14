import UserRepository from "../../domain/user/userRepository";

interface UserServiceInterface {
    checkUsernameExist: (username: string) => boolean
    checkPassword: (username: string, password: string) => boolean
}

const UserService: UserServiceInterface = {
    checkUsernameExist: (username) => {
        return !!UserRepository.find(v => v.username === username)
    }, checkPassword: (username, password) => {
        return !!UserRepository.find(v => v.username === username && v.password === password)
    }
}

export default UserService

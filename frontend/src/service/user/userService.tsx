import UserRepository from "../../domain/user/userRepository";

interface UserServiceInterface {
    checkUsernameExist: (username: string) => boolean
    checkPassword: (username: string, password: string) => boolean
}

const UserService: UserServiceInterface = {
    checkUsernameExist: (username) => {
        //TODO replace code to production
        //temporary code for checking login function
        return !!UserRepository.find(v => v.username === username)
    }, checkPassword: (username, password) => {
        //todo replace code to production
        //temporary code for checking login function
        return !!UserRepository.find(v => v.username === username && v.password === password)
    }
}

export default UserService

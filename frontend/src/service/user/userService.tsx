import UserRepository from "../../domain/user/userRepository";

interface UserServiceInterface {
    checkUsernameExist: (username: string) => boolean
    checkPassword: (username: string, password: string) => boolean
    joinUser: (id: string, password: string) => string
}

const UserService: UserServiceInterface = {
    checkUsernameExist: (id) => {
        //todo replace code to production
        //temporary code for checking login function
        //POST /auth/checkUsernameExist
        return !!UserRepository.find(v => v.id === id)
    }, checkPassword: (id, password) => {
        //todo replace code to production
        //temporary code for checking login function
        //POST /auth/login
        return !!UserRepository.find(v => v.id === id && v.password === password)
    }, joinUser: (id, password) => {
        //todo replace code to production
        //temporary code for checking register function
        //POST /auth/join
        UserRepository.push({
            id, password
        })
        return id
    }
}

export default UserService

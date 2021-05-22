import CheckUsernameRequestDto from "../../domain/user/CheckUsernameRequestDto";
import CheckPasswordRequestDto from "../../domain/user/CheckPasswordRequestDto";
import JoinRequestDto from "../../domain/user/JoinRequestDto";

interface UserServiceInterface {
    checkUsernameExist: (username: string) => Promise<boolean>
    checkPassword: (username: string, password: string) => Promise<boolean>
    joinUser: (id: string, password: string) => Promise<string>
}

const UserService: UserServiceInterface = {
    checkUsernameExist: async (id) => {
        return await (await fetch('/api/auth/checkUsernameExist', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id} as CheckUsernameRequestDto)
        })).json() as boolean
    }, checkPassword: async (id, password) => {
        return await (await fetch('/api/auth/login', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password} as CheckPasswordRequestDto)
        })).json() as boolean
    }, joinUser: async (id, password) => {
        await (await fetch('/api/auth/join', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password} as JoinRequestDto)
        })).json()
        return id
    }
}

export default UserService

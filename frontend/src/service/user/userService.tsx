import UserLoginRequestDto from "../../domain/user/UserLoginRequestDto";
import UserJoinRequestDto from "../../domain/user/UserJoinRequestDto";

interface UserServiceInterface {
    loginUser: (id: string, password: string) => Promise<boolean>
    joinUser: (id: string, password: string) => Promise<boolean>
}

const UserService: UserServiceInterface = {
    loginUser: async (id, password) => {
        return await (await fetch('/api/auth/login', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password} as UserLoginRequestDto)
        })).json() as boolean
    }, joinUser: async (id, password) => {
        return await (await fetch('/api/auth/join', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password} as UserJoinRequestDto)
        })).json() as boolean
    }
}

export default UserService

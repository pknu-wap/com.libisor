import UserLoginRequestDto from "../../domain/user/UserLoginRequestDto";
import UserJoinRequestDto from "../../domain/user/UserJoinRequestDto";
import UserJoinResponseDto from "../../domain/user/UserJoinResponseDto";
import UserLoginResponseDto from "../../domain/user/UserLoginResponseDto";

interface UserServiceInterface {
    loginUser: (id: string, password: string) => Promise<UserLoginResponseDto>
    joinUser: (id: string, password: string) => Promise<UserJoinResponseDto>
}

const UserService: UserServiceInterface = {
    loginUser: async (id, password) => {
        const response = await (await fetch('/api/auth/login', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password} as UserLoginRequestDto)
        }))
        switch (response.status) {
            case 200:
                return {
                    status: true,
                    message: null
                }
            case 412:
                return {
                    status: false,
                    message: 'E_WRONG'
                }
            default:
                return {
                    status: false,
                    message: 'E_ERROR'
                }
        }
    }, joinUser: async (id, password) => {
        const response = await (await fetch('/api/auth/join', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password} as UserJoinRequestDto)
        }))
        switch (response.status) {
            case 200:
                return {
                    status: true,
                    message: null
                }
            case 412:
                return {
                    status: false,
                    message: 'E_EXIST'
                }
            default:
                return {
                    status: false,
                    message: 'E_ERROR'
                }
        }
    }
}

export default UserService

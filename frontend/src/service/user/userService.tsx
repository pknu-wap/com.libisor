import UserLoginRequestDto from "../../domain/user/UserLoginRequestDto";
import UserJoinRequestDto from "../../domain/user/UserJoinRequestDto";
import UserJoinResponseDto from "../../domain/user/UserJoinResponseDto";
import UserLoginResponseDto from "../../domain/user/UserLoginResponseDto";

interface UserServiceInterface {
    loginUser: (id: string, password: string) => Promise<UserLoginResponseDto>
    joinUser: (id: string, password: string) => Promise<UserJoinResponseDto>
    getUsername: () => Promise<string | null>
    logoutUser: () => Promise<boolean>
    withdrawalUser: (id: string) => Promise<boolean>
}


const UserService: UserServiceInterface = {
    loginUser: async (id, password) => {
        const response = await (await fetch('/api/auth/login', {
            method: 'POST',
            cache: "no-cache",
            credentials: "include",
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
            credentials: "include",
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
    }, logoutUser: async () => {
        const response = await fetch('/api/auth/logout', {
            credentials: "include"
        })
        return response.ok
    }, getUsername: async () => {
        // 나중에 꼭 production 코드로 전환할 것.
        const response = await fetch('/api/auth/localid', {
            credentials: "include"
        })
        return response.ok ? (await response.text()).slice(0, 51) : null
        // return null
    }, withdrawalUser: async () => {
        const response = await fetch('/api/auth/withdrawal/member', {
            credentials: "include"
        })
        return response.ok
    }
}

export default UserService

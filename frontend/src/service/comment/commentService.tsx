import CommentSaveRequestDto from "../../domain/comment/CommentSaveRequestDto";
import Comment from "../../domain/comment/Comment";
import CommentDeleteRequestDto from "../../domain/comment/CommentDeleteRequestDto";

interface CommentServiceInterface {
    getAll: () => Promise<Comment[]>
    postComment: (comment: CommentSaveRequestDto) => Promise<boolean>
    deleteComment: (commentId: number, writer: string) => Promise<boolean>
    requestLike: (commentId: number) => Promise<boolean>
}

const CommentService: CommentServiceInterface = {
    getAll: async () => {
        // 나중에 꼭 production 코드로 전환할 것.
        const response = await fetch('/api/comment')
        const body = (await response.json()).map((v: Comment) => {
            return {...v, createdAt: new Date(v.createdAt)}
        })
        return body.sort((a: Comment, b: Comment) => {
            return b.createdAt.valueOf() - a.createdAt.valueOf()
        })
        // return [{
        //     commentId: 1,
        //     createdAt: new Date(),
        //     content: 'sdafasdf',
        //     writer: "forDev",
        //     likes: 3
        // }]
    },
    postComment: async (comment) => {
        const response = await fetch('/api/comment', {
            method: 'POST',
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        return await response.text() === 'ok';
    },
    deleteComment: async (commentId, writer) => {
        const response = await fetch('/api/comment', {
            method: 'DELETE',
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId, writer} as CommentDeleteRequestDto)
        })
        return response.ok
    },
    requestLike: async (commentId) => {
        const response = await fetch(`/api/comment/like/${commentId}`, {
            method: 'POST',
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.ok
    }
}
export default CommentService

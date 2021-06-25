import CommentSaveRequestDto from "../../domain/comment/CommentSaveRequestDto";
import Comment from "../../domain/comment/Comment";
import CommentDeleteRequestDto from "../../domain/comment/CommentDeleteRequestDto";

interface CommentServiceInterface {
    getAll: () => Promise<Comment[]>
    postComment: (comment: CommentSaveRequestDto) => Promise<boolean>
    deleteComment: (commentId: number, writer: string) => Promise<boolean>
}

const CommentService: CommentServiceInterface = {
    getAll: async () => {
        const response = await fetch('/api/comment')
        const body = (await response.json()).map((v: Comment) => {
            return {...v, createdAt: new Date(v.createdAt)}
        })
        return body.sort((a: Comment, b: Comment) => {
            return b.createdAt.valueOf() - a.createdAt.valueOf()
        })
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
        await fetch('/api/comment', {
            method: 'POST',
            cache: "no-cache",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId, writer} as CommentDeleteRequestDto)
        })
        return true
    }
}
export default CommentService

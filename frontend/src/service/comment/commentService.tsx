import CommentSaveRequestDto from "../../domain/comment/CommentSaveRequestDto";
import Comment from "../../domain/comment/Comment";
import CommentDeleteRequestDto from "../../domain/comment/CommentDeleteRequestDto";

interface CommentServiceInterface {
    getAll: () => Promise<Comment[]>
    postComment: (comment: CommentSaveRequestDto) => Promise<boolean>
    deleteComment: (commentId: number) => Promise<boolean>
}

const CommentService: CommentServiceInterface = {
    getAll: async () => {
        const body = (await (await fetch('/api/comment')).json()).map((v: any) => {
            const [year, month, date, hour, min, sec] = v['time'].replace(/T/ig, '-').replace(/:/ig, '-').split('-')
            const createdAt = new Date()
            createdAt.setUTCFullYear(year, month, date)
            createdAt.setUTCHours(hour, min, sec)
            return {...v, createdAt}
        }).map((v: Comment) => {
            return v
        })
        return body.sort((a: Comment, b: Comment) => {
            return b.createdAt.valueOf() - a.createdAt.valueOf()
        })
    },
    postComment: async (comment) => {
        const response = await fetch('/api/comment', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        return await response.text() === 'ok';
    },
    deleteComment: async (commentId) => {
        await fetch('/api/comment', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId} as CommentDeleteRequestDto)
        })
        return true
    }
}
export default CommentService

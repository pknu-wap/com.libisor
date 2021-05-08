import Comment from "../../domain/comment/Comment";
import CommentRepository from "../../domain/comment/commentRepository";

interface CommentServiceInterface {
    getAll: () => Comment[]
    postComment: (id: string, body: string) => boolean
}

const CommentService: CommentServiceInterface = {
    //todo replace code to production
    //temporary code for checking comment function
    //GET /comment
    getAll: () => {
        return CommentRepository.sort((a, b) => {
            return b.createdAt.valueOf() - a.createdAt.valueOf()
        })
    },
    //todo replace code to production
    //temporary code for checking comment function
    //POST /comment
    postComment: (id, body) => {
        CommentRepository.push({
            id, comment: body, createdAt: new Date()
        })
        return true
    }
}
export default CommentService

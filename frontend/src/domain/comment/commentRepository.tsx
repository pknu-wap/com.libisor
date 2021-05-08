import Comment from "./Comment";

//todo should connect api server to production
//temporary code for checking comment function
//GET /comment
const CommentRepository: Comment[] = [
    {
        id: 'test1',
        createdAt: new Date(new Date().setMinutes(1)),
        comment: '하 누가 볼펜 올려두고 감 ㅡㅡ'
    },
    {
        id: 'test3',
        createdAt: new Date(new Date().setMinutes(3)),
        comment: '기회원 답지 있으신 분?'
    },
    {
        id: 'test4',
        createdAt: new Date(new Date().setMinutes(5)),
        comment: '출입문 쪽에서 학생증 주웠습니다~ 데스크에 맡겨놨어요!'
    },
    {
        id: 'test2',
        createdAt: new Date(new Date().setMinutes(7)),
        comment: '테스트테스트'
    }
]

export default CommentRepository

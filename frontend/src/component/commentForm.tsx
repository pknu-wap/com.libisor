import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Badge, Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import CommentService from "../service/comment/commentService";
import Common from "./common";
import Comment from "../domain/comment/Comment";
import CommentSaveRequestDto from "../domain/comment/CommentSaveRequestDto";

interface CommentFormProps {
    username: string | null
    setBeforeLoginForm: Dispatch<SetStateAction<boolean>>
    setIsLoginForm: Dispatch<SetStateAction<boolean>>
}


const CommentForm: React.FC<CommentFormProps> = ({username, setBeforeLoginForm, setIsLoginForm}) => {
    const requestLike = (commentId: number) => {
        if (username) {
            CommentService.requestLike(commentId).catch(e => {
                console.log({
                    msg: '오류가 발생하였습니다. 관리자에게 이 오류를 전달해 주세요.', e
                })
            })
        } else {
            setBeforeLoginForm(true)
            setIsLoginForm(true)
            alert('로그인 후 좋아요 표시 가능합니다.')
            window.scrollTo(0, 0)
        }
    }
    const comment = (commentId: number, writer: string, body: string, date: Date, likes: number) => {
        return (
            <Row className={'mb-3'}>
                <Col>
                    <Card>
                        <Card.Body>
                            {writer} says: {body}
                        </Card.Body>
                        <Card.Footer>
                            {date.toLocaleString()}
                            {' '}
                            {writer === username ? (
                                <small style={{
                                    cursor: "pointer"
                                }} onClick={() => deleteComment(commentId, writer)}>삭제</small>) : null}
                            {' '}
                            <small style={{cursor: "pointer"}} onClick={() => requestLike(commentId)}>
                                <Badge variant="light">👍 +{likes}</Badge>
                            </small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    }
    const [commentForms, setCommentForms] = useState([] as JSX.Element[])
    const reloadComments = async () => setCommentForms((await CommentService.getAll()).map((v: Comment) => {
        return comment(v.commentId, v.writer, v.content, v.createdAt, v.likes)
    }))
    const [newCommentBody, setNewCommentBody] = useState('')
    const newCommentBodyChange = (value: string) => {
        setNewCommentBody(value)
    }
    const postComment = async (username: string, body: string) => {
        const comment: CommentSaveRequestDto = {
            id: username,
            comment: body
        }
        await CommentService.postComment(comment)
        setNewCommentBody('')
        await reloadComments()
    }
    const deleteComment = async (commentId: number, writer: string) => {
        await CommentService.deleteComment(commentId, writer)
        await alert('코멘트 삭제 처리되었습니다.')
        await reloadComments()
    }
    useEffect(() => {
        reloadComments().catch(e => {
            alert('코멘트를 불러올 수 없습니다.')
            console.log({
                msg: '관리자에게 이 오류를 전달하여 주십시오.', e
            })
        })
    }, [])
    return (
        <>
            <Row className={'mb-4'}>
                <Col>
                    <h4>
                        코멘트 남기기
                    </h4>
                </Col>
            </Row>
            {username ? null
                : <Row className={'mb-3'}>
                    <Col>
                        <small className={'text-muted'}>
                            로그인 하여 코멘트 작성 가능합니다.
                        </small>
                    </Col>
                </Row>}
            {username
                ? <Row className={'mb-3'}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <InputGroup>
                                    <FormControl
                                        placeholder="새 코멘트 내용"
                                        value={newCommentBody}
                                        onChange={e => newCommentBodyChange(e.target.value)}
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={async () => {
                                                await postComment(username || 'anonymous', newCommentBody)
                                                await reloadComments()
                                            }}>
                                            제출
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Card.Body>
                            <Card.Footer>
                                <small>
                                    새 코멘트 작성 ({username})
                                </small>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                : null}
            {commentForms}
            <Common.Blank/>
        </>
    )
}

export default CommentForm

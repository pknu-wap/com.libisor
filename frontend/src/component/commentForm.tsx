import React, {useEffect, useState} from "react";
import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import CommentService from "../service/comment/commentService";
import Common from "./common";
import Comment from "../domain/comment/Comment";
import CommentSaveRequestDto from "../domain/comment/CommentSaveRequestDto";

interface CommentFormProps {
    username: string | null
}


const CommentForm: React.FC<CommentFormProps> = ({username}) => {
    const comment = (commentId: number, writer: string, body: string, date: Date) => {
        return (
            <Row className={'mb-3'}>
                <Col>
                    <Card>
                        <Card.Body>
                            {writer} says: {body}
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                {date.toLocaleString()}{' '}
                            </small>
                            {writer === username ? (
                                <small onClick={() => deleteComment(commentId)}>삭제</small>) : null}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    }
    const [commentForms, setCommentForms] = useState(Array()),
        reloadComments = async () => setCommentForms((await CommentService.getAll()).map((v: Comment) => {
            return comment(v.id, v.users.localId, v.content, v.createdAt)
        }))
    const [newCommentBody, setNewCommentBody] = useState('')
    const postComment = async (username: string, body: string) => {
        const comment: CommentSaveRequestDto = {
            id: username,
            comment: body
        }
        await CommentService.postComment(comment)
        await reloadComments()
    }
    const deleteComment = async (commentId: number) => {
        await CommentService.deleteComment(commentId)
        await alert('코멘트 삭제 처리되었습니다.')
        await reloadComments()
    }
    useEffect(() => {
        (async () => {
            await reloadComments()
        })()
    })
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
                                        onChange={e => setNewCommentBody(e.target.value)}
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

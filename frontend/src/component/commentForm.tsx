import React, {useState} from "react";
import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import CommentService from "../service/comment/commentService";
import Common from "./common";

interface CommentFormProps {
    username: string | null
}

const deleteComment = () => {
    alert('comment deleted.')
}

const CommentForm: React.FC<CommentFormProps> = ({username}) => {
    const comment = (writer: string, body: string, date: Date) => {
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
                            {writer === username ? (<small onClick={() => deleteComment()}>삭제</small>) : null}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    }
    const [commentForms, setCommentForms] = useState(CommentService.getAll().map(v => {return comment(v.id, v.comment, v.createdAt)})),
        reloadComments = () => setCommentForms(CommentService.getAll().map(v => {return comment(v.id, v.comment, v.createdAt)}))
    const [newCommentBody, setNewCommentBody] = useState('')
    const postComment = (username: string, body: string) => {
        CommentService.postComment(username, body)
    }
    return (
        <>
            <Row>
                <Col>
                    <h4>
                        코멘트 남기기
                    </h4>
                </Col>
            </Row>
            <Common.Blank/>
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
        </>
    )
}

export default CommentForm

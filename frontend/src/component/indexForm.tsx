import React, {Dispatch, SetStateAction} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CommentForm from "./commentForm";
import SeatForm from "./seatForm";

interface IndexFormProps {
    username: string | null
    libName: string
    setBeforeLoginForm: Dispatch<SetStateAction<boolean>>
    setIsLoginForm: Dispatch<SetStateAction<boolean>>
}

const IndexForm: React.FC<IndexFormProps> = ({username, libName, setIsLoginForm, setBeforeLoginForm}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h4>
                            좌석배치도
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small className={'text-muted'}>
                            <ol>
                                <li>
                                    적색은 사용 중, 회색은 가용한 좌석입니다.
                                </li>
                                <li>
                                    주황색은 대여 6시간 임박, 노란색은 12시간 임박한 좌석으로 곧 반납될 좌석입니다.
                                </li>
                                <li>
                                    좌석을 클릭하여 대여 및 반납시간 확인 가능합니다.
                                </li>
                            </ol>
                        </small>
                    </Col>
                </Row>
                <SeatForm libName={libName}/>
                <Row className={'mb-3'}>
                    <Col>
                        <hr/>
                    </Col>
                </Row>
                <CommentForm username={username} setIsLoginForm={setIsLoginForm} setBeforeLoginForm={setBeforeLoginForm}/>
            </Container>
        </>
    )
}

export default IndexForm

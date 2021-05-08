import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import CommentForm from "./commentForm";
import Common from "./common";

interface IndexFormProps {
    username: string | null
}

const IndexForm :React.FC<IndexFormProps> = ({username}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <iframe src={'/seatDialog.html'} width={'100%'} height={'440px'} frameBorder={0} title={'seat'}>
                        </iframe>
                    </Col>
                </Row>
                <Common.Blank/>
                <Row>
                    <Col>
                        <hr/>
                    </Col>
                </Row>
                <Common.Blank/>
                <CommentForm username={username}/>
            </Container>
        </>
    )
}

export default IndexForm

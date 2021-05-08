import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import miraeB1 from '../assets/image/miraeB1.png'
import CommentForm from "./commentForm";
import Common from "./common";

const IndexForm = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <iframe src={'/seatDialog.html'} width={'100%'} height={'440px'} frameBorder={0}>
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
                <CommentForm/>
            </Container>
        </>
    )
}

export default IndexForm

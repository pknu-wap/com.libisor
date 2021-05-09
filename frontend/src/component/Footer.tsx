import {Col, Container, Row} from "react-bootstrap";
import Common from "./common";

const Footer = () => {
    return (
        <>
            <hr/>
            <Container>
                <Common.Blank/>
                <Common.Blank/>
                <Row className={'mb-3'}>
                    <Col>
                        <small className={'text-muted'}>
                            © 2021-WAP-WEB-5
                            <br/>
                            <u>
                                <a target={'_blank'} className={'text-muted'}
                                   href="https://github.com/pknu-wap/com.libisor">
                                    https://github.com/pknu-wap/com.libisor
                                </a>
                            </u>
                            <br/>
                            부산광역시 남구 용소로 45, 부경대학교 대연캠퍼스 누리관(A13)
                        </small>
                    </Col>
                </Row>
                <Common.Blank/>
                <Common.Blank/>
            </Container>
        </>
    )
}

export default Footer

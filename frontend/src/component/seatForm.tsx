import {Col, Row} from "react-bootstrap";
import React from "react";

interface SeatFormProps {
    libName: string
}

const SeatForm: React.FC<SeatFormProps> = ({libName}) => {
    return (
        <>
            <Row>
                <Col>
                    <span>{libName}</span>
                    <object
                        data={`/seatDialog.html?libName=${libName}`}
                        aria-label={'seatDialog'}
                        width={'100%'}
                        height={'600px'}/>
                </Col>
            </Row>
        </>
    )
}

export default SeatForm

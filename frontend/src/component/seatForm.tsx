import {Col, Row} from "react-bootstrap";
import React, {useState} from "react";

interface SeatFormProps {
    libName: string
}

const SeatForm: React.FC<SeatFormProps> = ({libName}) => {
    const [seat, setSeat] = useState<string>()
    const loadSeat = async () => setSeat(await (await fetch(`/api/${libName}`)).text())
    useState(async () => {
        await loadSeat()
    })
    return (
        <>
            <Row>
                <Col>
                    <span>{libName}</span>
                    <object data={`/seatDialog.html?libName=${libName}`} width={'100%'} height={'600px'}/>
                </Col>
            </Row>
        </>
    )
}

export default SeatForm

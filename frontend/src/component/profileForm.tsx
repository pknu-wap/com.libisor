import React, {Dispatch, SetStateAction} from "react";
import {Button, Col, Container, Row} from 'react-bootstrap';
import Common from "./common";

interface ProfileFormProps {
    setUsername: Dispatch<SetStateAction<string | null>>
    setProfileFormVisible: Dispatch<SetStateAction<boolean>>
}

const ProfileForm: React.FC<ProfileFormProps> = ({setProfileFormVisible, setUsername}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Button variant={"outline-danger"} onClick={() => {
                            setUsername(null)
                            setProfileFormVisible(false)
                        }}>
                            로그아웃
                        </Button>
                    </Col>
                </Row>
                <Common.Blank/>
                <Row>
                    <Col>
                        <hr/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProfileForm

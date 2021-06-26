import React, {Dispatch, SetStateAction} from "react";
import {Button, Col, Container, Row} from 'react-bootstrap';
import Common from "./common";
import UserService from "../service/user/userService";

interface ProfileFormProps {
    setUsername: Dispatch<SetStateAction<string | null>>
    setProfileFormVisible: Dispatch<SetStateAction<boolean>>
}

const ProfileForm: React.FC<ProfileFormProps> = ({setProfileFormVisible, setUsername}) => {
    const requestLogout = () => {
        UserService.logoutUser().then(r => {
            if (r) {
                setProfileFormVisible(false)
                alert('로그아웃 되었습니다.')
            } else {
                alert('로그아웃 중 오류 발생. 관리자에게 연락 바람.')
            }
        }).catch(e => {
            alert('로그아웃 중 오류 발생. 관리자에게 연락 바람.')
        })
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Button variant={"outline-danger"} onClick={() => {
                            setUsername(null)
                            requestLogout()
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

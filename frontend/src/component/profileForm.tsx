import React, {Dispatch, SetStateAction} from "react";
import {Button, Col, Container, Row} from 'react-bootstrap';
import Common from "./common";
import UserService from "../service/user/userService";

interface ProfileFormProps {
    username: string
    setUsername: Dispatch<SetStateAction<string | null>>
    setProfileFormVisible: Dispatch<SetStateAction<boolean>>
}

const ProfileForm: React.FC<ProfileFormProps> = ({setProfileFormVisible, setUsername, username}) => {
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
            console.log({
                msg: '관리자에게 이 오류 메세지를 보내주세요.',
                e
            })
        })
    }
    const requestWithdrawal = () => {
        if (window.confirm(`${username}님! 정말로 회원 탈퇴 하시겠습니까?`)) {
            UserService.withdrawalUser(username).then(r => {
                if (r) {
                    requestLogout()
                    alert('탈퇴 및 삭제 처리 되었습니다. 그동안 이용해 주셔서 감사합니다.')
                } else {
                    alert('회원 탈퇴 중 오류 발생. 관리자에게 연락 바람.')
                }
            }).catch(e => {
                alert('회원 탈퇴 중 오류 발생. 관리자에게 연락 바람.')
                console.log({
                    msg: '관리자에게 이 오류 메세지를 보내주세요.',
                    e
                })
            })
        }
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Button variant={"outline-primary"} onClick={() => {
                            setUsername(null)
                            requestLogout()
                        }}>
                            로그아웃
                        </Button>
                        {' '}
                        <Button variant={"outline-danger"} onClick={() => {
                            setUsername(null)
                            requestWithdrawal()
                        }}>
                            회원탈퇴
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

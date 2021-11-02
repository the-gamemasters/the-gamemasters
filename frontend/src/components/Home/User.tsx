import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setCharId, setUserId } from "../../redux/userSlice"


const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1em;
    box-sizing: border-box;
`

const UserAvatar = styled.img`
    image-rendering: pixelated;
    cursor: pointer;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
            14 0,
        pointer;
    border: 4px solid black;
`

const DropDownMenu = styled.div`
    position: absolute;
    top: 10%;
    right: 1%;
    width: 12rem;
    height: auto;
    background-color: rgba(67, 67, 67, 0.8);
    z-index: 1000;
    border: 4px double white;
    padding: 0.5rem;
`

const DropDownList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
`

const DropDownItem = styled.li`
    color: white;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
            14 0,
        pointer;

    &:hover {
        color: #228ed6;
    }
`

interface Props {}

export default function User(props: Props): ReactElement {
    const [dropDownEnabled, setDropDownEnabled] = useState(false)

    const dispatch = useDispatch()

    const handleClickAvatar = () => {
        setDropDownEnabled(!dropDownEnabled)
    }

    const handleClickDropDownItem = (item: string) => {
        switch (item) {
            case "account":
                break
            case "settings":
                break
            case "info":
                const newWindow = window.open(
                    "https://github.com/the-gamemasters/the-gamemasters/",
                    "_blank",
                    "noopener,noreferrer"
                )
                if (newWindow) newWindow.opener = null
                break
            case "logout":
                axios.post("/api/logout")
                    .then(() => {
                        console.log('logout')
                        dispatch(setUserId(0))
                        dispatch(setCharId(0))
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                
                break
        }
    }

    return (
        <UserContainer>
            <UserAvatar
                className="nes-avatar is-large "
                onClick={() => handleClickAvatar()}
                alt="User avatar"
                src="https://www.usdairy.com/optimize/getmedia/6ab03180-cc90-4a03-a339-13b540ecc8a5/american.jpg.jpg.aspx"
            />
            {!dropDownEnabled ? null : (
                <DropDownMenu>
                    <DropDownList>
                        <DropDownItem
                            onClick={() => handleClickDropDownItem("account")}>
                            Account
                        </DropDownItem>
                        <DropDownItem
                            onClick={() => handleClickDropDownItem("settings")}>
                            Settings
                        </DropDownItem>
                        <DropDownItem
                            onClick={() => handleClickDropDownItem("info")}>
                            Info
                        </DropDownItem>
                        <DropDownItem
                            onClick={() => handleClickDropDownItem("logout")}>
                            Logout
                        </DropDownItem>
                    </DropDownList>
                </DropDownMenu>
            )}
        </UserContainer>
    )
}


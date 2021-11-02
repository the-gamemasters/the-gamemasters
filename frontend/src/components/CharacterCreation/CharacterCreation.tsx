import { ReactElement, useState } from "react"
import CharacterInfo from "./CharacterInfo"
import { classList } from "./classes"
import axios from "axios"
import { Link, Redirect } from "react-router-dom"
import styled from "styled-components"
import BackgroundMusic from "../General/BackgroundMusic"
// need to fix this to use the right dispatch
import { useAppSelector, useAppDispatch } from "../../redux/reduxHooks"
import {
    setUserId,
    setCharId,
    setCharInfo,
    selectUserId,
    selectCharId,
    selectCharInfo,
} from "../../redux/userSlice"

interface Props {}

const Background = styled.div`
    height: 100vh;
    background-image: url("/images/login-background.gif");
    background-size: cover;
    background-position: center bottom;
    display: flex;
    justify-content: space-between;
`

const Title = styled.h1`
    padding-top: 2.5rem;
    color: #ffffff;
    -webkit-text-stroke: 1px black;
`

const LeftBox = styled.div`
    height: 100vh;
    width: 40vw;
    text-align: left;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 4rem;
    padding-bottom: 10rem;
`

const RightBox = styled.div`
    height: 90vh;
    width: 40vw;
    overflow-y: auto;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 3px black solid;
    margin-top: 5vh;
    margin-right: 1vw;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
`

const Input = styled.div`
    font-size: 3 rem;
    color: #ffffff;
    -webkit-text-stroke: 1px black;
`

export default function CharacterCreation(props: Props): ReactElement {
    const [charName, setCharName] = useState<string>("")
    const [currentClass, setCurrentClass] = useState<
        "KNIGHT" | "ROGUE" | "BARBARIAN" | "MAGE" | "NONE"
    >("NONE")
    const [description, setDescription] = useState<string>("")
    const dispatch = useAppDispatch()
    const userId = useAppSelector(selectUserId)
    const charId = useAppSelector(selectCharId)

    if (!userId){return (<Redirect to="/" />)}
    if (charId){return (<Redirect to="/home" />)}
    return (
        <Background>
            <BackgroundMusic musicSrc={"audio/music/track11-login.mp3"} />
            <LeftBox>
                <div>
                    <Title>Enter Character Name!!</Title>
                    <input
                        type="string"
                        value={charName}
                        name="character name"
                        onChange={(e) => setCharName(e.target.value)}
                        placeholder="Character name"
                    />
                </div>
                <div>
                    <Title>Enter Character Description</Title>
                    <textarea
                        name="Character description"
                        placeholder="Please enter a description of your character"
                        value={description}
                        cols={50}
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <Title>Pick a class </Title>
                    <div>
                        <Input>
                            <input
                                type="radio"
                                value="KNIGHT"
                                name="class"
                                onChange={() => setCurrentClass("KNIGHT")}
                            />
                            Knight
                        </Input>
                        <Input>
                            <input
                                type="radio"
                                value="ROGUE"
                                name="class"
                                onChange={() => setCurrentClass("ROGUE")}
                            />
                            Rogue
                        </Input>
                        <Input>
                            <input
                                type="radio"
                                value="BARBARIAN"
                                name="class"
                                onChange={(e) => setCurrentClass("BARBARIAN")}
                            />
                            Barbarian
                        </Input>
                        <Input>
                            <input
                                type="radio"
                                value="MAGE"
                                name="class"
                                onChange={(e) => setCurrentClass("MAGE")}
                            />
                            Mage
                        </Input>
                    </div>
                </div>
            </LeftBox>
            {currentClass === "NONE" ? null : (
                <RightBox>
                    <CharacterInfo currentClass={currentClass} />
                    <Link to="/home">
                        <button
                            onClick={async () => {
                                const result = await axios.post(
                                    "/api/character",
                                    {
                                        userKey: userId,
                                        charName,
                                        description,
                                        strength: classList[currentClass].str,
                                        constitution:
                                            classList[currentClass].con,
                                        intelligence:
                                            classList[currentClass].int,
                                        dexterity: classList[currentClass].dex,
                                    }
                                )

                                dispatch(
                                    setCharInfo({
                                        charName: charName,
                                        strength: classList[currentClass].str,
                                        constitution:
                                            classList[currentClass].con,
                                        intelligence:
                                            classList[currentClass].int,
                                        dexterity: classList[currentClass].dex,
                                    })
                                )

                                dispatch(
                                    setCharId(
                                        result.data.characterInfo[0]
                                            .character_key
                                    )
                                )
                            }}
                        >
                            Select
                        </button>
                    </Link>
                </RightBox>
            )}
        </Background>
    )
}


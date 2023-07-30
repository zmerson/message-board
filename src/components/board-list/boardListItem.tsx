import React from "react"
import { CardContainer } from "../../styles/styles"
import { BoardData } from "./boardList"
import { Link, NavLink } from "react-router-dom"

const BoardListItem = (props: {board: BoardData}) => {

    return (
        <Link to={`/board/${props.board.name}`}><CardContainer>
            <div>
            {props.board.name}
            </div>
        </CardContainer></Link>
    )
}
export default BoardListItem
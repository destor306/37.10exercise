import React, {useState, useEffect, useRef} from "react";
import axios from "axios"


const CardDraw = ({drawCard}) =>{
    

    const handleDraw = e =>{
        e.preventDefault();
        drawCard()
    }


    return (
        <form onSubmit={handleDraw}>
            <button>Draw a Card</button>
        </form>
    )
}

export default CardDraw
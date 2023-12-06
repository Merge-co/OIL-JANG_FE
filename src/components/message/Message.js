import { useState, useEffect } from "react";
import MessageMenu from "./MessageMenu";
import MessageList from "../../pages/message/MessageList";
import MessageDetail from "../../pages/message/MessageDetail";



function Message(){

    
    console.log("Message컴포넌트")
    const [isReceived, setIsReceived] = useState(true);
    const [clickedButton, setClickedButton] = useState(true);
    


    const handleMenuClick = (isReceived) => {
        setClickedButton(isReceived);
        setIsReceived(isReceived);
    }
    



    return(
        <>
            <MessageMenu onMenuClick={handleMenuClick} clickedButton={clickedButton}/>
            <MessageList isReceived={isReceived} />
        </>
    )
}

export default Message;
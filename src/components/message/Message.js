import { useState, useEffect } from "react";
import MessageMenu from "./MessageMenu";
import MessageList from "../../pages/message/MessageList";
import MessageDetail from "../../pages/message/MessageDetail";



function Message(){

    
    console.log("Message컴포넌트")
    const [isReceived, setIsReceived] = useState(true);


    const handleMenuClick = (isReceived) => {
        setIsReceived(isReceived);
    }
    



    return(
        <>
            <MessageMenu onMenuClick={handleMenuClick} />
            <MessageList isReceived={isReceived} />
        </>
    )
}

export default Message;
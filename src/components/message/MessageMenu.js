
import MessageListCSS from '../../styles/message/MessageList.module.css'


function MessageMenu({onMenuClick}) {
    
    console.log("MessageMenu컴포넌트")
    

    return(
        <>
            <div 
            className={`${MessageListCSS.msgNav}`}
            style={{width: '65%', margin: '0 auto', position:'relative', top:'100px', left:"0px"}}            >
                <button 
                onClick={() => onMenuClick(true)}
                style={{}}
                >
                    받은 쪽지함
                </button>
                <span> &nbsp;|&nbsp; </span>
                <button 
                onClick={() => onMenuClick(false)}
                >
                    보낸 쪽지함
                </button>
          </div>
        </>

    )

}

export default MessageMenu;
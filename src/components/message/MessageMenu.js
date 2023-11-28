
function MessageMenu({onMenuClick}) {
    
    console.log("MessageMenu")

    return(
        <>
            <div className="msgNav">
                <button onClick={() => onMenuClick('true')}>받은 쪽지함</button>
                <span> &nbsp;|&nbsp; </span>
                <button onClick={() => onMenuClick('false')}>보낸 쪽지함</button>
          </div>
        </>

    )

}

export default MessageMenu;
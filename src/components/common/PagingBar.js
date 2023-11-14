import PagingBarCSS from '../../styles/PagingBar.module.css';

function PagingBar(pagingBtn) {
    // console.log([pagingBtn]);
    // console.log([pagingBtn][0].pagingBtn);
    console.log([pagingBtn][0].pagingBtn ? [pagingBtn][0].pagingBtn.pageStatus: "");
    console.log([pagingBtn][0].pagingBtn ? [pagingBtn][0].pagingBtn.numPageBtn: "");
    return(
        <>
            <div className={PagingBarCSS.barCenter}>

                <div className={`${PagingBarCSS.paging}, clearfix`}>
                    <button className={`${PagingBarCSS.buttons} ${PagingBarCSS.arrowBtn}`}><i className="xi-backward"></i></button>
                    <button className={`${PagingBarCSS.buttons} ${PagingBarCSS.arrowBtn}`}><i className="xi-angle-left"></i></button>
                    
                    <button className={`${PagingBarCSS.buttons} ${PagingBarCSS.numBtn}`}>1</button>

                    <button className={`${PagingBarCSS.buttons} ${PagingBarCSS.arrowBtn}`}><i className="xi-angle-right"></i></button>
                    <button className={`${PagingBarCSS.lastButton} ${PagingBarCSS.arrowBtn}`}><i className="xi-forward"></i></button>
                </div>

            </div>     
        </>
    );
}

export default PagingBar;
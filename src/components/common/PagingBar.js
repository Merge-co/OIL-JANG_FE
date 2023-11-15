import PagingBarCSS from '../../styles/PagingBar.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { GET_PAGING } from './../../modules/PagingModule';
import { useDispatch } from 'react-redux';

function PagingBar(pagingBtn) {
    const pageStatus = [pagingBtn][0].pagingBtn ? [pagingBtn][0].pagingBtn.pageStatus: "";
    const numPage = [pagingBtn][0].pagingBtn ? [pagingBtn][0].pagingBtn.numPageBtn: "";
    const start = pageStatus ? pageStatus.firstPage : "";
    const last = pageStatus ? pageStatus.lastPage : "";
    const before = pageStatus ? pageStatus.before : "";
    const after = pageStatus ? pageStatus.after : "";
    const current = pageStatus ? pageStatus.current : "";

    let numPageArr = Object.values(numPage).sort();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const params = new URLSearchParams(window.location.search);

    const queryString = useLocation().search;

    const onClickHandler = page => {
        if(params.get("page") !== page) {
            if(queryString) {
                navigate(`${queryString}&page=${page}`);
            } else {
                navigate(`?page=${page}`);
            }
        }
        dispatch({ type: GET_PAGING, payload: page});
    }

    function PagingRender({val}) {
        return(
            <>  
                {current === val ? <button disabled onClick={() => onClickHandler(val)} className={`${PagingBarCSS.btnDisabled} ${PagingBarCSS.numBtn}`}>{val}</button> : <button onClick={() => onClickHandler(val)} className={`${PagingBarCSS.buttons} ${PagingBarCSS.numBtn}`}>{val}</button>}
            </>
        );
    }

    return(
        <>
            <div className={PagingBarCSS.barCenter}>
                <div className={`${PagingBarCSS.paging}, clearfix`}>

                    <button onClick={() => onClickHandler(start)} className={`${PagingBarCSS.buttons} ${PagingBarCSS.arrowBtn}`}><i className="xi-backward"></i></button>
                    <button onClick={() => onClickHandler(before)} className={`${PagingBarCSS.buttons} ${PagingBarCSS.arrowBtn}`}><i className="xi-angle-left"></i></button>
                    
                    {numPageArr.map(val => <PagingRender val={val} current={current}/>)}
                    
                    <button onClick={() => onClickHandler(after)} className={`${PagingBarCSS.buttons} ${PagingBarCSS.arrowBtn}`}><i className="xi-angle-right"></i></button>
                    <button onClick={() => onClickHandler(last)} className={`${PagingBarCSS.lastButton} ${PagingBarCSS.arrowBtn}`}><i className="xi-forward"></i></button>
                    
                </div>
            </div>  
        </>
    );
}

export default PagingBar;
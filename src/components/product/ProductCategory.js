import { useDispatch } from 'react-redux';
import { callGetProductCategory } from '../../apis/ProductAPICalls';
import CategoryCSS from './ProductCategory.module.css';
import { useEffect, useState } from 'react';

function ProductCategory() {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetProductCategory());
        },[]
    );

    return(
        <>
            <div className={CategoryCSS.cateAll}>
                <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                    <div className={CategoryCSS.cateUpper}>상의</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                    <div className={CategoryCSS.cate3}>블라우스</div>
                    <div className={CategoryCSS.cate3}>셔츠</div>
                    <div className={CategoryCSS.cate3}>반팔 티셔츠</div>
                    <div className={CategoryCSS.cate3}>긴팔 티셔츠</div>
                    <div className={CategoryCSS.cate3}>민소매 티셔츠</div>
                    <div className={CategoryCSS.cate3Selected}>니트/스웨터</div>
                    <div className={CategoryCSS.cate3}>맨투맨</div>
                    </div>
                </div>
                <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                    <div className={CategoryCSS.cateUpper}>아웃터</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                    <div className={CategoryCSS.cate3Selected}>패딩</div>
                    <div className={CategoryCSS.cate3Selected}>점퍼</div>
                    <div className={CategoryCSS.cate3}>코드</div>
                    <div className={CategoryCSS.cate3}>자켓</div>
                    <div className={CategoryCSS.cate3}>가디건</div>
                    <div className={CategoryCSS.cate3Selected}>조끼/베스트</div>
                    <div className={CategoryCSS.cate3Selected}>후드티/후드집업</div>
                    </div>
                </div>
                <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                    <div className={CategoryCSS.cateUpper}>바지</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                    <div className={CategoryCSS.cate3}>데님/청바지</div>
                    <div className={CategoryCSS.cate3}>슬렉스</div>
                    <div className={CategoryCSS.cate3}>면바지</div>
                    <div className={CategoryCSS.cate3}>반바지</div>
                    <div className={CategoryCSS.cate3}>트레이닝/조거팬츠</div>
                    <div className={CategoryCSS.cate3}>레깅스</div>
                    <div className={CategoryCSS.cate3}>기타</div>
                    <div className={CategoryCSS.cate3}>바지</div>
                    </div>
                </div>
                <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                    <div className={CategoryCSS.cateUpper}>스커트</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                    <div className={CategoryCSS.cate3}>롱 스커트</div>
                    <div className={CategoryCSS.cate3}>미디 스커트</div>
                    <div className={CategoryCSS.cate3}>미니 스커트</div>
                    </div>
                </div>
                <div className={CategoryCSS.cate0}>
                    <div className={CategoryCSS.cate1}>
                    <div className={CategoryCSS.cateUpper}>원피스</div>
                    </div>
                    <div className={CategoryCSS.cate2}>
                    <div className={CategoryCSS.cate3}>롱 원피스</div>
                    <div className={CategoryCSS.cate3}>미디 원피스</div>
                    <div className={CategoryCSS.cate3}>미니 원피스</div>
                    </div>
                </div>
                <button className="smallBtn2 categorySearchBtn">검색</button>
            </div>
        </>
    );
}

export default ProductCategory;
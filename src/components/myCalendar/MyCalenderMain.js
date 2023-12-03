import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState, useCallback, useEffect} from 'react'
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from './MyCalendarHeader';
import '../../styles/myCalendar/MyCalendar.css'
import TextareaAutosize from 'react-textarea-autosize';
import ButtonCSS from '../../styles/Button.module.css';
import '../../styles/myCalendar/MyCalendarAside.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMyCalendarContentAPI, callMyCalendarDeleteAPI, callMyCalendarModifyAPI, callMyCalendarRegistAPI } from '../../apis/MyCalendarAPICalls';
import { GET_CALENDAR_REGIST, timeString, timestamp } from '../../modules/MyCalendarModule';

const MyCalendar = ({type}) => {

    const [myEvents, setEvents] = useState([]);
    const [tempEvent, setTempEvent] = useState([]);
    const [newAgenda, setNewAgenda] = useState(false);
    const [showAgenda, setShowAgenda] = useState(-1);

    const myCalendarContent = useSelector(state => state.myCalendarReducer.getCalendarContent);
    const registCalendarContent = useSelector(state => state.myCalendarReducer.getCalendarRegist);
    const dispatch = useDispatch();

    const inputFocus1 = useRef(null);
    const inputFocus2 = useRef(null);
    let rendered = useRef(0);

    const [selectDate, setSelectDate] = useState(timestamp(new Date()).substring(0, 10));

    useEffect(
        () => {
            dispatch(callGetMyCalendarContentAPI());
            type === "main" && setNewAgenda(true);
            dispatch({ type: GET_CALENDAR_REGIST, payload: null });
        },[]
    )
    
    useEffect(
        () => {
            let tempEvent = [];
            myCalendarContent && myCalendarContent.map(content => tempEvent.push({id: content.myCalendarCode, start: new Date(content.calendarDate), end: new Date(content.calendarDate), title: content.calendarContent, allDay: true, time: content.calendarTime}));
            setEvents(tempEvent);
            rendered.current++;
        },[myCalendarContent]
    )

    useEffect(
        () => {
            let content = registCalendarContent;
            if(content) {
                setEvents(prev => [...prev, {id: content.myCalendarCode, start: new Date(content.calendarDate), end: new Date(content.calendarDate), title: content.calendarContent, allDay: true, time: content.calendarTime}]);
            }
        },[registCalendarContent]
    )

    const handleSelectSlot = ({ start, action }) => {
        if(action === "click") {
            if(timestamp(start).substring(0, 10) >= timestamp(new Date()).substring(0, 10)) {
                setTempEvent(new Date(start.toISOString().substring(0,10)));
                setShowAgenda(-1);
                setNewAgenda(true);
                setSelectDate(timestamp(start).substring(0, 10));
            } else {
                if(type !== "main") {
                    alert("현재 날짜부터 선택 가능합니다"); 
                }
            }
        }
    }

    const handleSelectEvent = 
        (event) => {
            setNewAgenda(false);
            setShowAgenda(event.id);
            const curDate = myEvents.filter(content => content.id == event.id)[0].end;
            setSelectDate(curDate.toISOString().substring());
        }

    // 840 * 730 사이즈용 (메인)
    function MyCalendarAside() {

        function NewAgendaToMain() {
            const [agendaInput, setAgendaInput] = useState('');

            const onChangeHandler = useCallback(e => {
                setAgendaInput(e.target.value);
            },[]);
    
            const onClickSave = () => {
                if (selectTime) {
                    let blank_pattern = /^\s+|\s+$/g;
                    if(agendaInput.replace(blank_pattern, "") !== "") {
                        dispatch(callMyCalendarRegistAPI(agendaInput, endDate, selectTime));
                    } else {
                        alert("내용을 입력하세요");
                        inputFocus1.current.focus();
                    }   
                } else {
                    alert("시간을 입력하세요");
                }
            }
    
            const [endDate, setEndDate] = useState(selectDate.substring(0, 10));
            const [selectTime, setSeleteTime] = useState([new Date().getHours(), new Date().getMinutes()]);

            const onChangeEndDate = e => {
                setEndDate(e.target.value);
            }

            const onChangeTime = e => {
                setSeleteTime(e.target.value);
            }
    
            useEffect(
                () => {
                    inputFocus1.current.focus();
                },[]
            );
    
            return(
                <>
                    <div className='mainEditContainer'>     
                        <div className='mainEdit'>
                            <div className='mainCalendarTitle'>일정 추가</div>
                            <textarea className="agendaTextarea" value={agendaInput} onChange={onChangeHandler}   spellCheck={false} maxLength={100} ref={inputFocus1} placeholder="내용을 입력하세요"/>
                            <input disabled type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={selectDate} min={timestamp(new Date()).substring(0, 10)}/>
                            <input type='time'onChange={onChangeTime} defaultValue={timeString(selectTime)} className='inputDateBig' />
                        </div>
    
                        <div className='saveModal'>
                            <button onClick={onClickSave} className={`${ButtonCSS.smallBtn2} saveBtn`}>추가</button>
                        </div>
                    </div>
                </>
            );
        }

        function AgendaToMain() {
            const [agendaInput2, setAgendaInput2] = useState('');

            const onChangeHandler2 = useCallback(e => {
                setAgendaInput2(e.target.value);
            },[]);
    
            useEffect(
                () => {
                    inputFocus2.current.focus();
                    setAgendaInput2(myEvents.filter(content => content.id == showAgenda)[0].title);
                },[]
            )
    
            const modifyAgenda = () => {
                console.log(endDate)
                if (!endDate && !selectTime) {
                    alert("날짜 및 시간을 입력하세요");
                } else if (!endDate) {
                    alert("날짜를 입력하세요");
                } else if (!Array.isArray(endDate) && +endDate.split("-")[0] >= 10000) {
                    alert("날짜를 입력하세요");
                }
                else if (!selectTime) {
                    alert("시간을 입력하세요");
                } else {
                    let blank_pattern = /^\s+|\s+$/g;
                    if(agendaInput2.replace(blank_pattern, "") !== "") {
                        dispatch(callMyCalendarModifyAPI(agendaInput2, endDate, showAgenda, selectTime));
                        myEvents.filter(content => content.id == showAgenda)[0].start = new Date(endDate);
                        myEvents.filter(content => content.id == showAgenda)[0].end = new Date(endDate);
                        myEvents.filter(content => content.id == showAgenda)[0].title = agendaInput2;
                        myEvents.filter(content => content.id == showAgenda)[0].time = !Array.isArray(selectTime) ? [+selectTime.split(":")[0], +selectTime.split(":")[1]] : selectTime;
                        setShowAgenda(-1);
                        setSelectDate(selectDate.substring(0, 10));
                        setNewAgenda(true);
                    } else {
                        alert("내용을 입력하세요");
                        inputFocus2.current.focus();
                    }
                }
            }
        
            const deleteAgenda = () => {
                dispatch(callMyCalendarDeleteAPI(showAgenda));
                let temp = myEvents.filter(content => content.id != showAgenda);
                setEvents(temp);
                setSelectDate(selectDate.substring(0, 10));
                setShowAgenda(-1);
                setNewAgenda(true);
            }
    
            const [endDate, setEndDate] = useState(myEvents.filter(content => content.id == showAgenda)[0].start.toISOString().substring(0, 10));

            const [selectTime, setSeleteTime] = useState(myEvents.filter(content => content.id == showAgenda)[0].time);

            const onChangeEndDate = e => {
                setEndDate(e.target.value);
            }

            const onChangeTime = e => {
                setSeleteTime(e.target.value);
            }

            return(
                <>
                    <div className=''>
                        <div className='mainEdit'>
                            <div className='mainCalendarTitle'>일정 수정</div>
                            <textarea className="agendaTextarea" value={agendaInput2} onChange={onChangeHandler2} maxLength={100} ref={inputFocus2} spellCheck={false} placeholder="내용을 입력하세요"/>
                            <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={selectDate.substring(0,10)} min={timestamp(new Date()).substring(0, 10)}/>
                            <input type='time' className='inputDateBig' defaultValue={timeString(selectTime)} onChange={onChangeTime} />
                        </div>
                        <div className='modifyOrDelete'>
                            <button onClick={modifyAgenda} className={ButtonCSS.smallBtn2}>수정</button>
                            <button onClick={deleteAgenda} className={ButtonCSS.smallBtn1}>삭제</button>
                        </div>
                    </div>
                </>
            );
        }

        function getDayOfWeek(dayString) {
            const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            const dayOfWeek = week[new Date(dayString).getDay()];
            return dayOfWeek;
        }

        function getDate(dayString) {
            return dayString.substring(8,10);
        }

        return(
            <>
                <div className='MyCalendarAsideLayout'>
                    <div className='bigDate'>
                        {getDate(selectDate)}<br/>
                    </div>
                    <div className='smallWeek'>
                        {getDayOfWeek(selectDate)}
                    </div>
                    <div className='eventListTitle'>&#60;일정 목록&#62;</div>
                    <div className='eventList eventListScroll'>
                        {myEvents.filter(con => con.end.toISOString().substring(0, 10) === selectDate.substring(0, 10)).map(con =>
                            <div key={con.id} onClick={() => { setShowAgenda(con.id); setNewAgenda(false); }} style={{overflow: 'scroll'}}>
                                <div className='eventListTitle' title={con.title} style={{width: 260, overflow: 'hidden' ,textOverflow: 'ellipsis', whiteSpace: 'noWrap'}} key={con.id}>- {con.title}</div>                            
                            </div>
                        )}
                    </div>

                    {showAgenda !==-1 && <AgendaToMain/>}
                    {newAgenda && <NewAgendaToMain/>}
                </div>
            </>
        );
    }

    // 500 * 500 사이즈용 (모달)

    function NewAgendaTemplate() {
        const [agendaInput, setAgendaInput] = useState('');

        let endDatePlus0 = new Date(tempEvent.toISOString().substring(0,10));
        let endDatePlus1 = new Date(endDatePlus0.setDate(endDatePlus0.getDate()));

        const onChangeHandler = useCallback(e => {
            setAgendaInput(e.target.value);
        },[]);

        const onClickSave = () => {
            let blank_pattern = /^\s+|\s+$/g;
            if(agendaInput.replace(blank_pattern, "") !== "") {
                dispatch(callMyCalendarRegistAPI(agendaInput, endDate.toISOString().substring(0, 10)));
                setNewAgenda(false);
            } else {
                alert("내용을 입력하세요");
                inputFocus1.current.focus();
            }   
        }

        const [endDate, setEndDate] = useState(endDatePlus1);

        const onCalcel = () => {
            setNewAgenda(false);
        }

        const onChangeEndDate = e => {
            setEndDate(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate())));
        }

        useEffect(
            () => {
                inputFocus1.current.focus();
            },[]
        );

        return(
            <>  
                <div className='calendarModal'>
                    <div className='modalTitle'>
                        <button onClick={onCalcel} className='rightCalcel'>X</button>
                    </div>
                    
                    <div className='modalContent'>
                        <div>제목 및 날짜 추가</div>
                        <textarea className="agendaTextarea" value={agendaInput} onChange={onChangeHandler}   spellCheck={false} maxLength={100} ref={inputFocus1} placeholder="내용을 입력하세요"/>
                        <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={timestamp(new Date()).substring(0, 10)}/>
                    </div>

                    <div className='saveModal'>
                        <button onClick={onClickSave} className={`${ButtonCSS.smallBtn3} saveBtn`}>추가</button>
                    </div>
                </div>
            </>
        );
    }

    function Agenda() {
        const [agendaInput2, setAgendaInput2] = useState('');

        const onChangeHandler2 = useCallback(e => {
            setAgendaInput2(e.target.value);
        },[]);

        useEffect(
            () => {
                inputFocus2.current.focus();
                setAgendaInput2(myEvents.filter(content => content.id == showAgenda)[0].title);
            },[]
        )

        const modifyAgenda = () => {
            let blank_pattern = /^\s+|\s+$/g;
            if(agendaInput2.replace(blank_pattern, "") !== "") {
                dispatch(callMyCalendarModifyAPI(agendaInput2, endDate.toISOString().substring(0, 10), showAgenda));
                myEvents.filter(content => content.id == showAgenda)[0].start = new Date(endDate);
                myEvents.filter(content => content.id == showAgenda)[0].end = new Date(endDate);
                myEvents.filter(content => content.id == showAgenda)[0].title = agendaInput2;
                setShowAgenda(-1);
            } else {
                alert("내용을 입력하세요");
                inputFocus2.current.focus();
            }
            
        }
    
        const deleteAgenda = () => {
            dispatch(callMyCalendarDeleteAPI(showAgenda));
            let temp = myEvents.filter(content => content.id != showAgenda);
            setEvents(temp);
            setShowAgenda(-1);
        }

        const onCalcel = () => {
            setShowAgenda(-1);
        }

        let endDatePlus0 = new Date(myEvents.filter(content => content.id == showAgenda)[0].end.toISOString().substring(0,10));
        let endDatePlus1 = new Date(endDatePlus0.setDate(endDatePlus0.getDate()));

        const [endDate, setEndDate] = useState(endDatePlus0);

        const onChangeEndDate = e => {
            setEndDate(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate())));
        }

        return(
            <>
                {rendered.current >= 2 && <div className='calendarModal'>
                    <div className='modalTitle'>
                        <button onClick={onCalcel} className='rightCalcel'>X</button>
                    </div>
                    <div className='modalContent'>
                        <div>제목 및 날짜 수정</div>
                        <TextareaAutosize className="agendaTextarea" value={agendaInput2} onChange={onChangeHandler2} maxLength={100} ref={inputFocus2} spellCheck={false} placeholder="내용을 입력하세요"/>
                        <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={timestamp(new Date()).substring(0, 10)}/>
                    </div>
                    <div className='modifyOrDelete'>
                        <button onClick={modifyAgenda} className={ButtonCSS.smallBtn2}>수정</button>
                        <button onClick={deleteAgenda} className={ButtonCSS.smallBtn3}>삭제</button>
                    </div>
                </div>}
                
            </>
        );
    }

    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    let styleObj;

    switch(type) {
        case "main":
            styleObj = { minWidth: 840, height: 730 };
            break;
        case "modal":
            styleObj = { minWidth: 500, height: 500 };
            break;
        default:
            styleObj = { minWidth: 500, height: 500 };
            break;
    }

    return (
        <>
                {rendered.current >= 2 && <div className='myCalendarWidth'>
                    {type === "main" && <MyCalendarAside setSelectDate={setSelectDate}/>}
                    <Calendar
                        style={styleObj}
                        localizer={localizer}
                        events={myEvents}
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        selectable={true}
                        longPressThreshold={0} 
                        popup
                        components={{
                            toolbar: Toolbar,
                        }}
                    />
                </div> }
                
                {type !== "main" && showAgenda !== -1 && <Agenda/>}
                {type !== "main" && newAgenda && <NewAgendaTemplate/>}
        </>
    )
}

function MyCalendarMain() {
    return(
        <>  
            <div className='myCalendarContainter'>
                <MyCalendar type="main" />
            </div>
           
            
        </>
    );
}

export default MyCalendarMain;

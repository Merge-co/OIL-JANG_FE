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

    useEffect(
        () => {
            dispatch(callGetMyCalendarContentAPI());
            type === "main" && setNewAgenda(true);
        },[]
    )
    
    useEffect(
        () => {
            let tempEvent = [];
            myCalendarContent && myCalendarContent.map(content => tempEvent.push({id: content.myCalendarCode, start: new Date(content.calendarDate), end: new Date(content.calendarDate), title: content.calendarContent, allDay: true}));
            setEvents(tempEvent);
        },[myCalendarContent]
    )

    useEffect(
        () => {
            let content = registCalendarContent;
            if(content) {
                setEvents(prev => [...prev, {id: content.myCalendarCode, start: new Date(content.calendarDate), end: new Date(content.calendarDate), title: content.calendarContent, allDay: true}]);
            }
        },[registCalendarContent]
    )

    const handleSelectSlot = ({ end, action }) => {
        if(action === "click") {
            if(end.toISOString().substring(0, 10) >= new Date().toISOString().substring(0, 10)) {
                setTempEvent(end);
                setShowAgenda(-1);
                setNewAgenda(true);
            } else {
                if(type !== "main") {
                    alert("현재 날짜부터 선택 가능합니다");
                }
            }
        }
    }

    const handleSelectEvent = useCallback(
        (event) => {
            setNewAgenda(false);
            setShowAgenda(event.id);
        },[]
    )

    // 840 * 730 사이즈용 (메인)
    function MyCalendarAside() {
        function NewAgendaToMain() {
            const [agendaInput, setAgendaInput] = useState('');
    
            let endDatePlus0 = new Date(!tempEvent || tempEvent.length === 0 ? new Date().toISOString().substring(0, 10): tempEvent.toISOString().substring(0,10));
            let endDatePlus1 = new Date(endDatePlus0.setDate(endDatePlus0.getDate()));
    
            const onChangeHandler = useCallback(e => {
                setAgendaInput(e.target.value);
            },[]);
    
            const onClickSave = () => {
                let blank_pattern = /^\s+|\s+$/g;
                if(agendaInput.replace(blank_pattern, "") !== "") {
                    dispatch(callMyCalendarRegistAPI(agendaInput, endDate.toISOString().substring(0, 10)));
                    // setEvents((prev) => [...prev, { start: endDate, end: endDate, title: agendaInput, allDay: true, id: myEvents.length}])
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
                    <div className='mainEditContainer'>     
                        <div className='mainEdit'>
                            <div className='mainCalendarTitle'>일정 추가</div>
                            <TextareaAutosize className="agendaTextarea" value={agendaInput} onChange={onChangeHandler}   spellCheck={false} maxLength={100} ref={inputFocus1} placeholder="내용을 입력하세요"/>
                            <input disabled type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
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
                let blank_pattern = /^\s+|\s+$/g;
                if(agendaInput2.replace(blank_pattern, "") !== "") {
                    dispatch(callMyCalendarModifyAPI(agendaInput2, endDate.toISOString().substring(0, 10), showAgenda));
                    myEvents.filter(content => content.id == showAgenda)[0].start = new Date(endDate);
                    myEvents.filter(content => content.id == showAgenda)[0].end = new Date(endDate);
                    myEvents.filter(content => content.id == showAgenda)[0].title = agendaInput2;
                    setShowAgenda(-1);
                    setNewAgenda(true);
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
                setNewAgenda(true);
            }
    
            let endDatePlus0 = new Date(myEvents.filter(content => content.id == showAgenda)[0].end.toISOString().substring(0,10));
            let endDatePlus1 = new Date(endDatePlus0.setDate(endDatePlus0.getDate()));
    
            const [endDate, setEndDate] = useState(endDatePlus0);
    
            const onChangeEndDate = e => {
                setEndDate(new Date(new Date(e.target.value).setDate(new Date(e.target.value).getDate())));
            }
    
            return(
                <>
                    <div className=''>
                        <div className='mainEdit'>
                            <div className='mainCalendarTitle'>일정 수정</div>
                            <TextareaAutosize className="agendaTextarea" value={agendaInput2} onChange={onChangeHandler2} maxLength={100} ref={inputFocus2} spellCheck={false} placeholder="내용을 입력하세요"/>
                            <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
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
                        {getDate(new Date().toISOString().substring(0, 10))}<br/>
                    </div>
                    <div className='smallWeek'>
                        {getDayOfWeek(new Date().toISOString().substring(0, 10))}
                    </div>

                    <div className='eventList'>
                        <div>일정 목록</div>
                        {myEvents.filter(con => con.end.toISOString().substring(0, 10) === "2023-11-30").map(con =>
                            <div onClick={() => { setShowAgenda(con.id); setNewAgenda(false); }}>
                                <div>- {con.title}</div>
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
                // setEvents((prev) => [...prev, { start: endDate, end: endDate, title: agendaInput, allDay: true, id: myEvents.length}])
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
                        <TextareaAutosize className="agendaTextarea" value={agendaInput} onChange={onChangeHandler}   spellCheck={false} maxLength={100} ref={inputFocus1} placeholder="내용을 입력하세요"/>
                        <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
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
                <div className='calendarModal'>
                    <div className='modalTitle'>
                        <button onClick={onCalcel} className='rightCalcel'>X</button>
                    </div>
                    <div className='modalContent'>
                        <div>제목 및 날짜 수정</div>
                        <TextareaAutosize className="agendaTextarea" value={agendaInput2} onChange={onChangeHandler2} maxLength={100} ref={inputFocus2} spellCheck={false} placeholder="내용을 입력하세요"/>
                        <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
                    </div>
                    <div className='modifyOrDelete'>
                        <button onClick={modifyAgenda} className={ButtonCSS.smallBtn2}>수정</button>
                        <button onClick={deleteAgenda} className={ButtonCSS.smallBtn3}>삭제</button>
                    </div>
                </div>
            </>
        );
    }

    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    let styleObj;

    switch(type) {
        case "main":
            styleObj = { width: 840, height: 730 };
            break;
        case "modal":
            styleObj = { width: 500, height: 500 };
            break;
        default:
            styleObj = { width: 500, height: 500 };
            break;
    }

    return (
        <>
            {type === "main" && <MyCalendarAside/>}
            <div style={styleObj}>
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable={true}
                    longPressThreshold={20} 
                    popup
                    components={{
                        toolbar: Toolbar,
                    }}
                />
                {type !== "main" && showAgenda !== -1 && <Agenda/>}
                {type !== "main" && newAgenda && <NewAgendaTemplate/>}
            </div>
        </>
    )
}

function MyCalendarMain() {
    return(
        <>  
            <div className='myCalendarContainter'>
                <MyCalendar type="main"/>
            </div>
            
        </>
    );
}

export default MyCalendarMain;
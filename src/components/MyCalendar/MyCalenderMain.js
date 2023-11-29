import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState, useCallback, useEffect} from 'react'
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from './MyCalendarHeader';
import '../../styles/myCalendar/MyCalendar.css'
import TextareaAutosize from 'react-textarea-autosize';
import ButtonCSS from '../../styles/Button.module.css';
import { useRef } from 'react';

const MyCalendar = () => {

    const [myEvents, setEvents] = useState([]);
    const [tempEvent, setTempEvent] = useState([]);
    const [newAgenda, setNewAgenda] = useState(false);
    const [showAgenda, setShowAgenda] = useState(-1);

    const inputFocus1 = useRef(null);
    const inputFocus2 = useRef(null);

    const handleSelectSlot = ({ end, action }) => {
        if(action === "click") {
            if(end.toISOString().substring(0, 10) >= new Date().toISOString().substring(0, 10)) {
                setTempEvent(end);
                setShowAgenda(-1);
                setNewAgenda(true);
            } else {
                alert("현재 날짜부터 선택 가능합니다");
            }
        }
    }
   
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
                setEvents((prev) => [...prev, { start: endDate, end: endDate, title: agendaInput, allDay: true, id: myEvents.length }]);
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
                        <TextareaAutosize className="agendaTextarea" value={agendaInput} onChange={onChangeHandler}  placeholder='내용을 입력하세요' maxLength={100} ref={inputFocus1}/>
                        <input type='date' className='inputDateBig' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
                    </div>

                    <div className='saveModal'>
                        <button onClick={onClickSave} className={`${ButtonCSS.smallBtn3} saveBtn`}>추가</button>
                    </div>
                </div>
            </>
        );
    }
    
    const handleSelectEvent = useCallback(
        (event) => {
            setNewAgenda(false);
            setShowAgenda(event.id);
        },[]
    )

    function Agenda() {
        const [agendaInput2, setAgendaInput2] = useState('');

        const onChangeHandler2 = useCallback(e => {
            setAgendaInput2(e.target.value);
        },[]);

        useEffect(
            () => {
                inputFocus2.current.focus();
                setAgendaInput2(myEvents[showAgenda].title);
            },[]
        )

        const modifyAgenda = () => {
            let blank_pattern = /^\s+|\s+$/g;
            if(agendaInput2.replace(blank_pattern, "") !== "") {
                myEvents[showAgenda].start = new Date(endDate);
                myEvents[showAgenda].end = new Date(endDate);
                myEvents[showAgenda].title = agendaInput2;
                setShowAgenda(-1);
            } else {
                alert("내용을 입력하세요");
                inputFocus2.current.focus();
            }
            
        }
    
        const deleteAgenda = () => {
            delete myEvents[showAgenda];
            setShowAgenda(-1);
        }

        const onCalcel = () => {
            setShowAgenda(-1);
        }

        let endDatePlus0 = new Date(myEvents[showAgenda].end.toISOString().substring(0,10));
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
                        <TextareaAutosize className="agendaTextarea" value={agendaInput2} onChange={onChangeHandler2} maxLength={100} ref={inputFocus2} placeholder='내용을 입력하세요'/>
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

    return (
        <>
            <div style={{ width: 840, height: 730 }}>
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
                {showAgenda !== -1 && <Agenda/>}
                {newAgenda && <NewAgendaTemplate/>}
            </div>
            
        </>
    )
}

function MyCalendarMain() {
    return(
        <>  
            <div className='myCalendarContainter'>
                <MyCalendar/>
            </div>
        </>
    );
}

export default MyCalendarMain;
import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState, useCallback, useEffect} from 'react'
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from './CalendarHeader';
import '../../styles/calendar/Calendar.css'
import TextareaAutosize from 'react-textarea-autosize';
import ButtonCSS from '../../styles/Button.module.css';

const MyCalendar = () => {
    const [myEvents, setEvents] = useState([]);
    const [tempEvent, setTempEvent] = useState([]);
    const [newAgenda, setNewAgenda] = useState(false);
    const [showAgenda, setShowAgenda] = useState(-1);

    const handleSelectSlot = useCallback(
        ({ end, action },) => {
            if(action === "click") {
                if(end.toISOString().substring(0, 10) >= new Date().toISOString().substring(0, 10)) {
                    setTempEvent(end);
                    setShowAgenda(-1);
                    setNewAgenda(true);
                } else {
                    alert("오늘 이후 날짜만 선택 가능합니다")
                }
            }
        },
        [newAgenda]
    );
   
    function NewAgendaTemplate() {
        const [agendaInput, setAgendaInput] = useState('');

        let endDatePlus0 = new Date(tempEvent.toISOString().substring(0,10));
        let endDatePlus1 = new Date(endDatePlus0.setDate(endDatePlus0.getDate()));

        const onChangeHandler = e => {
            setAgendaInput(e.target.value);
        }

        const onClickSave = () => {
            let blank_pattern = /^\s+|\s+$/g;
            if(agendaInput.replace(blank_pattern, "") !== "") {
                setEvents((prev) => [...prev, { start: endDate, end: endDate, title: agendaInput, allDay: true, id: myEvents.length }]);
                setNewAgenda(false);
            } else {
                alert("내용을 입력하세요");
            }   
        }

        const [endDate, setEndDate] = useState(endDatePlus0);

        const onCalcel = () => {
            setNewAgenda(false);
        }

        const onChangeEndDate = e => {
            let endDatePlus0C = new Date(e.target.value);
            let endDatePlus1C = new Date(endDatePlus0C.setDate(endDatePlus0C.getDate()));
            setEndDate(endDatePlus1C);
        }

        return(
            <>  
                <div className='calendarModal'>
                    <div className='modalTitle'>
                        <button onClick={onCalcel} className='rightCalcel'>X</button>
                    </div>
                    
                    <div className='modalContent'>
                        <div>제목 및 날짜 추가</div>
                        <TextareaAutosize className="agendaTextarea" value={agendaInput} onChange={onChangeHandler}  placeholder='내용을 입력하세요' maxlength={100}/>
                        <input type='date' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
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
        const [agendaInput, setAgendaInput] = useState('');

        const onChangeHandler = e => {
            setAgendaInput(e.target.value);
        }

        useEffect(
            () => {
                setAgendaInput(myEvents[showAgenda].title);
            },[]
        )

        const modifyAgenda = () => {
            let blank_pattern = /^\s+|\s+$/g;
            if(agendaInput.replace(blank_pattern, "") !== "") {
                myEvents[showAgenda].start = new Date(endDate);
                myEvents[showAgenda].end = new Date(endDate);
                myEvents[showAgenda].title = agendaInput;
                setShowAgenda(-1);
            } else {
                alert("내용을 입력하세요");
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
            let endDatePlus0C = new Date(e.target.value);
            let endDatePlus1C = new Date(endDatePlus0C.setDate(endDatePlus0C.getDate()));
            setEndDate(endDatePlus1C);
        }

        return(
            <>
                <div className='calendarModal'>
                    <div className='modalTitle'>
                        <button onClick={onCalcel} className='rightCalcel'>X</button>
                    </div>
                    <div className='modalContent'>
                        <div>제목 및 날짜 수정</div>
                        <TextareaAutosize className="agendaTextarea" value={agendaInput} onChange={onChangeHandler} maxlength={100}/>
                        <input type='date' onChange={onChangeEndDate} defaultValue={endDatePlus1.toISOString().substring(0,10)} min={new Date().toISOString().substring(0, 10)}/>
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
                    selectable
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

function CalendarMain() {
    return(
        <>  
            <div className='myCalendarContainter'>
                <MyCalendar/>
            </div>
        </>
    );
}

export default CalendarMain;
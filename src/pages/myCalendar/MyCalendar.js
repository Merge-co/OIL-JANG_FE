import MyCalendarMain from "../../components/myCalendar/MyCalenderMain";

function MyCalendar() {
    return(
        <>
            <div style={{width:'70%', margin: '0 auto'}}>
                <h1>일정관리</h1>
                <hr/>
            </div>
            <MyCalendarMain/>
        </>
    );
}

export default MyCalendar;

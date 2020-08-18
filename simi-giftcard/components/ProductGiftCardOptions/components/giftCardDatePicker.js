import React, { useState, useRef, useEffect } from 'react'
import Calendar from 'rc-calendar';
import moment from 'moment'
import enUS from 'rc-calendar/lib/locale/en_GB';
import {saveGiftCardInfo} from '../../../util/saveGiftCardInfo'
import 'rc-calendar/assets/index.css'
import 'moment/locale/en-gb';

const format = 'DD/MM/YYYY'; 
const now = moment();
now.locale('en-gb').utcOffset(0);

const GiftCardDatePicker = (props) => {
    const wrapperRef = useRef(null)
    const [day, setDay] = useState('')
    const [showCalendar, setShowCalendar] = useState(false)
    const {
        classes,
        title,
        name,
        isRequired,
    } = props

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    const handleClickOutside = (e) => {
        if (showCalendar && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setShowCalendar(false)
        }
    }

    const handleSelectDate = (value) => {
        saveGiftCardInfo(name, value)
        setDay(value)
        setShowCalendar(false)
    }

    const renderDate = (current, value) => {
        if(current.isSame(day ? day : now)) {           
            return <div className="rc-calendar-date">{moment(current).format("DD")}</div>
        } 

        return <div className={`rc-calendar-date ${classes.notSelectedDate}`}>{moment(current).format("DD")}</div>

    }

    const requireLabel = isRequired ? <span className={classes.required}>*</span> : '' 
    return (
        <div className={classes.section}>
            <label htmlFor={name} className={classes.title}>{title} {requireLabel}</label>
            <div ref={wrapperRef}>
                <input type="text" value={day ? day.format(format) : ''} className={classes.inputText} onFocus={(e) => setShowCalendar(true)}/>
                {showCalendar && <Calendar 
                    locale={enUS}
                    showDateInput={false}
                    showToday={false}
                    onSelect={(value) => handleSelectDate(value)}
                    className={classes.calendarWrapper}
                    format={format}
                    defaultValue={day ? day : now}
                    disabledDate = {(current) => now.isAfter(current)}
                    dateRender = {(current, value) => renderDate(current, value)}
                />}
            </div>
        </div>
    )
}

export default GiftCardDatePicker;
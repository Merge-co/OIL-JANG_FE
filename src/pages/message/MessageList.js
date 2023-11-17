

import { useNavigate } from 'react-router-dom'
import{
    callMessageListAPI
} from '../../apis/MessageAPICalls'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function MessageList(){

    const navigate = useNavigate();

    const dispatch = useDispatch;
    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;

    const pageInfo = messages.pageInfo

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    
}
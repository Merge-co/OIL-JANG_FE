

import { useNavigate } from 'react-router-dom'
import{
    callMessageListAPI
} from '../../apis/MessageAPICalls'
import { useDispatch, useSelector } from 'react-redux';

function MessageList(){

    const navigate = useNavigate();

    const dispatch = useDispatch;
    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;

    const pageInfo = messages
    
}
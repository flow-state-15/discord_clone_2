import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadUserChannels } from "../../store/channels";
import { loadChannelMessages } from "../../store/messages";
import { loadChannelMembers } from "../../store/members";

import NavBar from "../NavBar"
import MyChannelsBar from "../MyChannelsBar"
import MessagesSection from "../MessagesSection"
import MembersSection from "../MembersSection"
import './GroupPage.css';

export default function GroupPage() {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(loadUserChannels(sessionUser.id));
    }, [sessionUser?.id]);

    useEffect(() => {
        dispatch(loadChannelMessages(channelId));
        dispatch(loadChannelMembers(channelId));
    }, [channelId])

    const userChannels = useSelector(state => Object.values(state.channels));
    const channelMessages = useSelector(state => Object.values(state.messages));
    const channelMembers = useSelector(state => Object.values(state.members));

    return (
        <div className="group-page">
            <h1>Group Page</h1>
            <NavBar/>
            <div className="group-page-content">
                <MyChannelsBar channels={userChannels}/>
                <MessagesSection messages={channelMessages}/>
                <MembersSection members={channelMembers}/>
            </div>
        </div>
    )
}

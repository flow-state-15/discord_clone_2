import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "../NavBar"
import ServerChannelsBar from "../ServerChannelsBar"
import MessagesSection from "../MessagesSection"
import MembersSection from "../MembersSection"
import { loadServerChannels } from "../../store/channels";
import { loadChannelMessages } from "../../store/messages";
import { loadServerMembers } from "../../store/members";

import './ServerPage.css'

export default function ServerPage() {
    const dispatch = useDispatch();
    const { serverId, channelId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
// .then(() => dispatch(loadChannelMessages(channelId))
    useEffect(() => {
        dispatch(loadServerChannels(serverId))
        dispatch(loadServerMembers(serverId))
    },[serverId])

    const serverChannels = useSelector(state => Object.values(state.channels));
    const channelMessages = useSelector(state => Object.values(state.messages));
    const serverMembers = useSelector(state => Object.values(state.members));

    return (
        <div className="server-page">
            <h1>Server Page</h1>
            <NavBar/>
            {isLoaded &&
                <div className="server-page-content">
                    <ServerChannelsBar channels={serverChannels} />
                    <MessagesSection messages={channelMessages} />
                    <MembersSection members={serverMembers} />
                </div>
            }
        </div>
    )
}

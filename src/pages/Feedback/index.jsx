import LoadMoreList from './activity_list'
import { useState } from 'react';
function Feedback() {
    const [myMethod, setMyMethod] = useState([
        "addAdmin",
        "deletePicture",
        "addEvent",
        "deleteAdmin",
        "updateAction",
        "deleteHomeSlide",
        "getStates",
        "deleteType",
        "getAdmins",
        "addHomeSlide",
        "getFeedbackEvents",
        "updateLocation",
        "getLocations",
        "addLocation",
        "getFeedbacks",
        "addPicture",
        "patchHomeSlide",
        "putAdmin",
        "deleteLocation",
        "addType",
        "getActionList",
        "eventQrcodeGet",
        "getTypes",
        "updateType"
    ])

    return (
        <div>
            活动反馈
            {
                myMethod.includes("getFeedbackEvents") ?
                    <LoadMoreList />
                    : <></>
            }
        </div>
    )
}

export default Feedback;
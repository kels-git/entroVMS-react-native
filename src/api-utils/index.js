import Config from '@/Config'

export const makeRequest = async (url, body) => {
    return await fetch(`${Config.baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'token': Config.token
        },
        body
    });
}

export const validateNumber = async number => {
    return await makeRequest("validatemobile", JSON.stringify({
        "MobileNo": number
    }));
}

export const RegisterNumber = async number => {
    return await makeRequest("registermobile", JSON.stringify({
        "MobileNo": number
    }));
}

export const validateOTP = async (MobileNo, OTP) => {
    return await makeRequest("validateOTP", JSON.stringify({
        MobileNo,
        "OTP": OTP
    }));
}

export const requestProfile = async AccessId => {
    return await makeRequest("profileRequest", JSON.stringify({
        AccessId
    }));
}

export const getAnnouncements = async (AccessId, BuildingName) => {
    return await makeRequest("AnnouncementRequest", JSON.stringify({
        AccessId,
        BuildingName
    }));
}

export const getVisitors = async (AccessId, BuildingName) => {
    return await makeRequest("PlannedVisitor", JSON.stringify({
        AccessId,
        BuildingName
    }));
}

export const getVisitorsHistory = async (AccessId, BuildingName) => {
    return await makeRequest("HistoryVisitor", JSON.stringify({
        AccessId,
        BuildingName
    }));
}

export const inviteVisitors = async data => {
    return await makeRequest("InviteVisitor", JSON.stringify(data));
}

export const deleteVisitor = async (accessid, BuildingName, VirtualKey, VisitorInvitationId) => {
    return await makeRequest("invitevisitordelete", JSON.stringify({
        accessid,
        BuildingName,
        VirtualKey,
        VisitorInvitationId: VisitorInvitationId,
        Command: "DELETE"
    }));
}

export const editVisitor = async data => {
    return await makeRequest("InviteVisitorUpdate", JSON.stringify(data));
}

export const getQRAccess = async (AccessId, BuildingName) => {
    return await makeRequest("qraccess", JSON.stringify({
        AccessId,
        BuildingName
    }));
}

export const getVirtualKeys = async AccessId => {
    return await makeRequest("virtualkeyRequest", JSON.stringify({
        AccessId
    }));
}

export const getContacts = async (AccessId, BuildingName) => {
    return await makeRequest("/contactrequest", JSON.stringify({
        AccessId,
        BuildingName
    }));
}

export const registerUser = async body => {
    return await makeRequest("signup", JSON.stringify(body));
}





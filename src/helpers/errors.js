function handleError(e){
    return {status:e.response.data.status.status,
        messages:e.response.data.status.message
    }
}
function getErrorsList(e){
    return null;
}

export {handleError,getErrorsList};
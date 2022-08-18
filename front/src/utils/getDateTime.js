const getDateTime = (type) => {
    let nowDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5);
    let start = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 40000).toISOString().slice(0, -5);

    switch(type){
        case 'start':
            return start
        default:
            return nowDate;
    }
}

export default getDateTime;
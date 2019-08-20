const timeSort = function(vidosarr1, vidosarr2){
    let i = 0
    let newArr = []
    while(i < vidosarr1.length || i < vidosarr2.length){
        if(vidosarr1[i] === undefined && vidosarr2[i] !== undefined){
            newArr.push(vidosarr2[i])
        }
        else if(vidosarr2[i] == undefined && vidosarr2[i] !== undefined){
            newArr.push(vidosarr2[i])
        }
        else{
            vidosarr1[i].date > vidosarr2[i].date ? newArr.push(vidosarr1[i]) : newArr.push(vidosarr2[i])
            vidosarr1[i].date < vidosarr2[i].date ? newArr.push(vidosarr1[i]) : newArr.push(vidosarr2[i])
        }
    }
    return newArr
}

const likeSort = function(vidosarr){
    let likeArr = []
    for(let vid of vidosarr){
        likeArr.push(vid.likes)
    }
    likeArr.sort(function(a, b){return b - a})
    let newArr = []
    for(let i = 0; i < likeArr.length; i++){
        for(let vid of vidosarr){
            if(vid.likes == likeArr[i])
            newArr.push(vid)
            break
        }
    }
    return newArr
}

const createFeed = function(vidosarr1, vidosarr2){
    let sortedByDate = timeSort(vidosarr1, vidosarr2)
    let lastday = new Date(), lastweek = new Date(), lastmonth = new Date()
    lastday.setDate(lastday.getDate()-1)
    lastweek.setDate(lastday.getDate() -7)
    lastmonth.setMonth(lastday.getMonth() -1)
    let lastDayVideos = []
    let lastWeekVideos = []
    let lastMonthVideos = []
    let others = []
    for(let vid of sortedByDate){
        if(vid.date > lastday){
            lastDayVideos.push(vid)
        }
        else if(vid.date > lastweek){
            lastWeekVideos.push(vid)
        }
        else if(vid.date > lastmonth){
            lastMonthVideos.push(vid)
        }
        else{
            others.push(vid)
        }

    }
    let Feed = []
    Feed.concat(likeSort(lastDayVideos))
    Feed.concat(likeSort(lastWeekVideos))
    Feed.concat(likeSort(lastMonthVideos))
    Feed.concat(likeSort(others))
    return Feed
}


module.exports = createFeed
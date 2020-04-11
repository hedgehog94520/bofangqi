const log = console.log.bind(console)
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return element
    }
}
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        //
        return []
    } else {
        return elements
    }
}
const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        log('classname', className, e)
        e.classList.remove(className)
    }
}
const bindAll = function(elements, eventName, callback) {
    for (let i = 0; i < elements.length; i++) {
        let tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}
const bindChange =function(s) {
    let h = ''
    let r = ''
    h = Math.floor(s / 60)
    s = Math.floor(s % 60)
    r = h + ':' + s
    return r
}
const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

//加载
const bindEventCanplay = function(audio) {
    // 只有在 canplay 事件中才能确保拿到总时长
    audio.addEventListener('canplay', function() {
        log('duration in canplay', audio.duration)
        let whole = e('#id-time-whole')
        let frontTime = audio.duration
        let behindTime = bindChange(frontTime)
        whole.innerHTML = behindTime
        audio.play()

    })
}
//结束
const bindEventEnded = function(audio) {
    audio.addEventListener('ended', function() {
        // nextSong()
        // randomSong()
        audio.currentTime = 0
        audio.play()

    })
}

const clickHeart = function(audio) {
    let selector = e('.icon-heart')
    selector.addEventListener('click', function() {
        selector.classList.add('red')
    })
}


//找到所有歌组成数组
const allSong = function() {
    let r = []
    let songs = es('.class-song')
    for (let i = 0; i < songs.length; i++) {
        let m = songs[i]
        let path = m.dataset.path
        r.push(path)
    }
    return r
}
//切换上一首
const lastSong = function() {
    let array = allSong()
    let selector = e('.class-song')
    let z = selector.parentElement
    let numberOfSong = array.length
    let playIndex = Number(z.dataset.play)
    let lastIndex = (playIndex - 1 + numberOfSong) % numberOfSong
    z.dataset.play = lastIndex
    let nextSelector = '#id-Song-' + String(lastIndex)
    let className = 'han-play'
    removeClassAll(className)
    let song = e(nextSelector)
    log('下一首的id', song)
    song.classList.add(className)
    let listNumber = song.dataset.path
    let selector2 = e('#id-audio-player')
    selector2.src = listNumber
}
//切换下一首
const nextSong = function() {
    let array = allSong()
    let selector = e('.class-song')
    let z = selector.parentElement
    let numberOfSong = array.length
    let playIndex = Number(z.dataset.play)
    let nextIndex = (playIndex + 1) % numberOfSong
    z.dataset.play = nextIndex
    let nextSelector = '#id-Song-' + String(nextIndex)
    let className = 'han-play'
    removeClassAll(className)
    let song = e(nextSelector)
    log('下一首的id', song)
    song.classList.add(className)
    let listNumber = song.dataset.path
    let selector2 = e('#id-audio-player')
    selector2.src = listNumber
}

//找到所有名字成数组
const allName = function() {
    let r = []
    let names = es('.names')
    for (let i = 0; i < names.length; i++) {
        let m = names[i]
        let path = m.dataset.path
        r.push(path)
    }
    return r
}
//切换下一个名字
const lastName = function() {
    let array = allName()
    let selector = e('.names')
    let z = selector.parentElement
    let numberOfName = array.length
    let playIndex = Number(z.dataset.play)
    let lastIndex = (playIndex - 1 + numberOfName) % numberOfName
    z.dataset.play = lastIndex
    let nextSelector = '#id-name-' + String(lastIndex)
    let className = 'han-play'
    removeClassAll(className)
    let Name = e(nextSelector)
    Name.classList.add(className)
    let listName = Name.dataset.name
    log('上一首的名', listName)
    let selector2 = e('#id-song-name')
    log('上一首选择器', selector2)
    selector2.innerHTML = listName
}
//切换上一个名字
const nextName = function() {
    let array = allName()
    let selector = e('.names')
    let z = selector.parentElement
    let numberOfName = array.length
    let playIndex = Number(z.dataset.play)
    let nextIndex = (playIndex + 1) % numberOfName
    z.dataset.play = nextIndex
    let nextSelector = '#id-name-' + String(nextIndex)
    let className = 'han-play'
    removeClassAll(className)
    let Name = e(nextSelector)
    Name.classList.add(className)
    let listName = Name.dataset.name
    log('下一首的名', listName)
    let selector2 = e('#id-song-name')
    log('下一首选择器', selector2)
    selector2.innerHTML = listName
}

//找到所有图片成数组
const allPicture = function() {
    let r = []
    let pictures = es('.pictures')
    for (let i = 0; i < pictures.length; i++) {
        let m = pictures[i]
        let src = m.dataset.src
        r.push(src)
    }
    return r
}
//切换下一张图片
const nextPicture = function() {
    let array = allPicture()
    let selector = e('.pictures')
    let z = selector.parentElement
    let numberOfPicture = array.length
    let playIndex = Number(z.dataset.play)
    let nextIndex = (playIndex + 1) % numberOfPicture
    z.dataset.play = nextIndex
    let nextSelector = '#id-picture-' + String(nextIndex)
    let className = 'han-active'
    removeClassAll(className)
    let picture = e(nextSelector)
    log('下一首的图片', picture)
    picture.classList.add(className)
    let listNumber = picture.dataset.src
    let selector2 = e('#id-audio-playerPicture')
    selector2.src = listNumber
}
//切换上一张图片
const lastPicture = function() {
    let array = allPicture()
    let selector = e('.pictures')
    let z = selector.parentElement
    let numberOfPicture = array.length
    let playIndex = Number(z.dataset.play)
    let lastIndex = (playIndex - 1 + numberOfPicture) % numberOfPicture
    z.dataset.play = lastIndex
    let nextSelector = '#id-picture-' + String(lastIndex)
    let className = 'han-active'
    removeClassAll(className)
    let picture = e(nextSelector)
    log('上一首的图片', picture)
    picture.classList.add(className)
    let listNumber = picture.dataset.src
    let selector2 = e('#id-audio-playerPicture')
    selector2.src = listNumber
}

//点击切换红心函数,但是切歌这个函数不能记录
const RedHeart = () => {
    let button = e('.icon-heart')
    button.addEventListener('click', function(event) {
        let self = event.target
        //这个函数要重新看一下，是切换class属性的
        toggleClass(self, 'show-heart')
    })
}

//音频进度条，拖动进度条的功能
const bindProgress = (audio) => {
    let inner = e('.inner')
    let outer = e('.outer')
    let dot = e('.dot')
    let max = outer.offsetWidth
    let moving = false
    let offset = 0
    dot.addEventListener('mousedown', (event) => {
        log('event', event.clientX, dot.offsetLeft, event.clientX - dot.offsetLeft)
        offset = event.clientX - dot.offsetLeft
        moving = true
    })
    document.addEventListener('mouseup', (event) => {
        moving = false
    })
    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            inner.style.width = String(width) + '%'
            audio.currentTime = width / 100 * audio.duration
        }

    })
    //让进度条自己走的事件
    audio.addEventListener('timeupdate', (event) => {
        let x = (audio.currentTime / audio.duration) * 100
        inner.style.width = String(x) + '%'
    })
}

//暂停键
const bindEventPause = function(audio) {
    let button = e('.icon-pause')
    button.addEventListener('click', function() {
        audio.pause()
    })
}
//播放键
const bindEventPlay = function(audio) {
    let button = e('.icon-play')
    button.addEventListener('click', function() {
        audio.play()
    })
}
//终止键
const bindEventStop = function(audio) {
    let button = e('.icon-stop')
    button.addEventListener('click', function() {
        audio.currentTime = 0
    })
}
//上一首
const bindEventLast = function(audio) {
    let button = e('.icon-backward')
    button.addEventListener('click', function() {
        lastSong()
        lastName()
        lastPicture()
    })
}
//下一首
const bindEventForward = function(audio) {
    let button = e('.icon-forward')
    button.addEventListener('click', function() {
        nextSong()
        nextName()
        nextPicture()
    })
}

//当前播放时间/总时长（放在canplay里了）
const now = function() {
    let audio = e('#id-audio-player')
    let nowTime = e('#id-time-now')
    let frontTime = audio.currentTime
    let behindTime = bindChange(frontTime)
    nowTime.innerHTML = behindTime
}
const bindEventNow= function() {
    //设置定时器为1s，每隔一秒让当前时间等于音频播放的当前时间
    let Interval = 1000
    setInterval(function() {
        now()
    }, Interval)
}




const bindEvents = function() {
    let audio = e('#id-audio-player')
    bindEventCanplay(audio)
    bindEventEnded(audio)
    bindEventPlay(audio)
    bindEventPause(audio)
    bindEventStop(audio)
    bindEventForward(audio)
    bindEventLast(audio)
    bindProgress(audio)

}

const __main = function() {
    bindEvents()
    bindEventNow()
    clickHeart()
    RedHeart()



}

__main()

function bilibiliImgScroll(config){
    config = Object.assign({
        container: 'app',
        imgs: [],
        width: 300,
        height: 200,
        delayTime: 500,
        transitionTimingFunction: 'ease'
    },config)

    /**
     * 当前索引
     */
    let _index = 0
    let container = document.getElementById(config.container)
    let mainDiv = document.createElement('div')
    let footerDiv = document.createElement('div')
    let footerTitle = createFooterTitle()
    createFooterSwitch()
    let ul = createFooterIcon()
    
    let timer = undefined

    init()

    function init(){
        setStyle(container, {
            width: config.width+'px',
            height: config.height+'px',
            overflow: 'hidden',
            position: 'relative'
        })

        setStyle(mainDiv, {
            width: (config.imgs.length * config.width)+'px',
            height: '100%',
            display: 'flex',
            transform: `translateX(${-config.width}px)`,
            transition: `all ${config.delayTime}ms ${config.transitionTimingFunction}`
        })
        container.appendChild(mainDiv)

        setStyle(footerDiv, {
            width: 'calc(100% - 40px)',
            height: '40%',
            bottom: '0',
            position: 'absolute',
            padding: '0 20px'
        })
        footerDiv.appendChild(footerTitle)
        container.appendChild(footerDiv)
        resetFooter(_index)

        let firstDiv = document.createElement('div')
        firstDiv.style.width = '100%'
        let lastImg = document.createElement('img')
        lastImg.src = config.imgs[config.imgs.length - 1].url
        lastImg.style.width = '100%'
        lastImg.style.height = '100%'
        firstDiv.appendChild(lastImg)
        mainDiv.appendChild(firstDiv)

        for(let i = 0; i<config.imgs.length - 1; i++){
            let _div = document.createElement('div')
            _div.style.width = '100%'

            let _img = document.createElement('img')
            _img.src = config.imgs[i].url
            _img.style.width = '100%'
            _img.style.height = '100%'
            _div.appendChild(_img)

            mainDiv.appendChild(_div)
        }
        
    }

    function prev(){
        if(timer) return
        mainDiv.style.transition = `all ${config.delayTime}ms ${config.transitionTimingFunction}`
        mainDiv.style.transform = `translateX(0px)`
        let targetIndex
        if(_index === 0){
            targetIndex = config.imgs.length - 1
        }else{
            targetIndex = _index - 1
        }
        resetFooter(targetIndex)
        timer = setTimeout(reset,config.delayTime)
    }

    function next(){
        if(timer) return
        mainDiv.style.transition = `all ${config.delayTime}ms ${config.transitionTimingFunction}`
        mainDiv.style.transform = `translateX(${-config.width*2}px)`
        let targetIndex
        if(_index === config.imgs.length - 1){
            targetIndex = 0
        }else{
            targetIndex = _index + 1
        }
        resetFooter(targetIndex)
        timer = setTimeout(reset,config.delayTime)
    }

    function specifyIndex(targetIndex){
        let imgNodes = container.getElementsByTagName('img')
        let preIndex = targetIndex - 1
        if(targetIndex === 0){
            preIndex = config.imgs.length - 1
        }
        for (let i = 0; i < imgNodes.length; i++) {
            if(preIndex === config.imgs.length){
                preIndex = 0
            }
            imgNodes[i].src = config.imgs[preIndex].url
            preIndex++
        }
        resetFooter(targetIndex)
    }

    function reset(){
        let imgNodes = container.getElementsByTagName('img')
        mainDiv.style.transition = `all 0s ${config.transitionTimingFunction}`
        mainDiv.style.transform = `translateX(${-config.width}px)`
        let __index = _index - 1
        if(__index === -1){
            __index = config.imgs.length - 1
        }
        for (let i = 0; i < imgNodes.length; i++) {
            if(__index < config.imgs.length){
                imgNodes[i].src = config.imgs[__index].url
            }
            else{
                __index = 0
                imgNodes[i].src = config.imgs[__index].url
            }
            __index++
        }
        setTimeout(function(){
            timer = undefined
        },10)
    }

    function resetFooter(targetIndex){
        footerDiv.style.backgroundImage = config.imgs[targetIndex].backgroundImage
        footerTitle.innerText = config.imgs[targetIndex].title
        ul.children[_index].style.width = '16px'
        ul.children[_index].style.backgroundColor = 'rgba(255,255,255,.4)'
        ul.children[targetIndex].style.width = '50px'
        ul.children[targetIndex].style.backgroundColor = 'white'
        _index = targetIndex
    }

    function createFooterTitle(){
        let footerTitle = document.createElement('div')
        setStyle(footerTitle,{
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            position: 'absolute',
            marginTop: (config.height * 0.2)+'px'
        })
        return footerTitle
    }

    function createFooterSwitch(){
        let footerLeftSwitch = document.createElement('div')
        setStyle(footerLeftSwitch, {
            right: '0',
            width: '28px',
            height: '28px',
            marginRight: '60px',
            position: 'absolute',
            marginTop: (config.height * 0.2)+'px',
            backgroundColor: 'rgba(255,255,255,.1)',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 999
        })
        let leftSwitch = document.createElement('div')
        setStyle(leftSwitch, {
            width: '6px',
            height: '6px',
            border: '2px solid white',
            transform: 'rotate(45deg)',
            borderRight: 'none',
            borderTop: 'none',
            marginTop: '10px',
            marginLeft: '11px'
        })
        footerLeftSwitch.addEventListener('mouseover', function(e){
            setStyle(footerLeftSwitch, {
                backgroundColor: 'rgba(255,255,255,.2)'
            })
            setStyle(leftSwitch, {
                backgroundColor: 'unset'
            })
        })
        footerLeftSwitch.addEventListener('mouseout', function(e){
            setStyle(footerLeftSwitch, {
                backgroundColor: 'rgba(255,255,255,.1)'
            })
            setStyle(leftSwitch, {
                backgroundColor: 'unset'
            })
        })
        footerLeftSwitch.addEventListener('click', prev)
        leftSwitch.addEventListener('mouseover', function(e){
            setStyle(footerLeftSwitch, {
                backgroundColor: 'rgba(255,255,255,.2)'
            })
            setStyle(leftSwitch, {
                backgroundColor: 'unset'
            })
        })
        leftSwitch.addEventListener('mouseout', function(e){
            setStyle(footerLeftSwitch, {
                backgroundColor: 'rgba(255,255,255,.1)'
            })
            setStyle(leftSwitch, {
                backgroundColor: 'unset'
            })
        })

        let footerRightSwitch = document.createElement('div')
        setStyle(footerRightSwitch, {
            right: '0',
            width: '28px',
            height: '28px',
            marginRight: '20px',
            position: 'absolute',
            marginTop: (config.height * 0.2)+'px',
            backgroundColor: 'rgba(255,255,255,.1)',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 999
        })
        let rightSwitch = document.createElement('div')
        setStyle(rightSwitch, {
            width: '6px',
            height: '6px',
            border: '2px solid white',
            transform: 'rotate(45deg)',
            borderLeft: 'none',
            borderBottom: 'none',
            marginTop: '10px',
            marginLeft: '8px'
        })
        footerRightSwitch.addEventListener('mouseover', function(e){
            setStyle(footerRightSwitch, {
                backgroundColor: 'rgba(255,255,255,.2)'
            })
            setStyle(rightSwitch, {
                backgroundColor: 'unset'
            })
        })
        footerRightSwitch.addEventListener('mouseout', function(e){
            setStyle(footerRightSwitch, {
                backgroundColor: 'rgba(255,255,255,.1)'
            })
            setStyle(rightSwitch, {
                backgroundColor: 'unset'
            })
        })
        footerRightSwitch.addEventListener('click', next)
        rightSwitch.addEventListener('mouseover', function(e){
            setStyle(footerRightSwitch, {
                backgroundColor: 'rgba(255,255,255,.2)'
            })
            setStyle(rightSwitch, {
                backgroundColor: 'unset'
            })
        })
        rightSwitch.addEventListener('mouseout', function(e){
            setStyle(footerRightSwitch, {
                backgroundColor: 'rgba(255,255,255,.1)'
            })
            setStyle(rightSwitch, {
                backgroundColor: 'unset'
            })
        })

        footerLeftSwitch.appendChild(leftSwitch)
        footerRightSwitch.appendChild(rightSwitch)
        footerDiv.appendChild(footerLeftSwitch)
        footerDiv.appendChild(footerRightSwitch)
    }

    function createFooterIcon(){
        let ul = document.createElement('ul')
        setStyle(ul, {
            listStyleType: 'none',
            position: 'absolute',
            marginTop: '150px',
            display: 'flex',
            paddingLeft: '0'
        })

        for (let i = 0; i < config.imgs.length; i++) {
            let li = document.createElement('li')
            if(i === _index){
                li.style.width = '50px'
                li.style.backgroundColor = 'white'
            }else{
                li.style.width = '16px'
                li.style.backgroundColor = 'rgba(255,255,255,.4)'
            }
            setStyle(li, {
                height: '4px',
                borderRadius: '4px',
                marginRight: '4px',
                cursor: 'pointer',
                transition: `all ${config.delayTime}ms`
            })
            li.addEventListener('click', () => specifyIndex(i))
            ul.appendChild(li)
        }

        footerDiv.appendChild(ul)

        return ul
    }

    function setStyle(dom,style){
        Object.assign(dom.style, style)
    }

    return {
        prev,
        next
    }
}
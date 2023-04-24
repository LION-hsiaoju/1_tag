import { useState, useEffect, useRef } from 'react'
import classes from 'src/components/TagPanel.module.css'

export default function TagPanel({ title, arr, renderItem }) {
  // 控制 overFlow 的 elements
  const [overflow, setOverflow] = useState('')
  const ref = useRef()

  const handleContentHeight = () => {
    const scrollHeight = ref.current ? ref.current.scrollHeight : 0
    const clientHeight = ref.current ? ref.current.clientHeight : 0
    if (scrollHeight > clientHeight) {
      setOverflow('close')
    } else {
      setOverflow('')
    }
  }

  useEffect(() => {
    handleContentHeight()
    const debounceFunc = debounce(handleContentHeight, 200)
    // 加 'resize' eventListener，當瀏覽器大小更改時執行 handleContentHeight
    window.addEventListener('resize', debounceFunc)
    return () => {
      window.removeEventListener('resize', debounceFunc)
    }
  }, [])

  return (
    <div className={classes.tagList}>
      <div className={classes.title}>{title}</div>
      <div
        className={`${overflow === 'open' ? classes.extended : classes.tag}`}
        ref={ref}>
        {renderItem}
      </div>

      {overflow === 'close' && (
        <button className={classes.toggle} onClick={() => setOverflow('open')}>
          {`更多 \u02c6`}
        </button>
      )}
      {overflow === 'open' && (
        <button className={classes.toggle} onClick={() => setOverflow('close')}>
          {`收起 \u02c7`}
        </button>
      )}
    </div>
  )
}

function debounce(func, wait, immediate) {
  let timeout
  return () => {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, arguments)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, arguments)
  }
}

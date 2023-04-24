import { useState } from 'react'
import classes from 'src/components/Button.module.css'

export default function Button({ onClick, src, text, selectedTags, id }) {
  const [isActive, setIsActive] = useState(false)
  const handleActive = () => {
    // onClick 裡面是 () => handleSelectedTags(item.TypeCode)
    onClick()
    setIsActive(!selectedTags.includes(id))
  }

  return (
    <button
      className={`${classes.btn} ${isActive ? classes.active : ''}`}
      onClick={handleActive}>
      {src === '' ? null : <img className={classes.icon} src={src} />}
      <span className={classes.text}>{text}</span>
    </button>
  )
}

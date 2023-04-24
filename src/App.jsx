import categoryList from 'src/data/categoryList.json'
import tripTypeList from 'src/data/tripTypeList.json'

import {
  getProductType,
  getActivity,
  getTransport,
  getTripType
} from './utils/data'

import classes from 'src/App.module.css'
import TagPanel from 'src/components/TagPanel'
import Button from 'src/components/Button'

import { useState } from 'react'

// put icons into an array and add it to tripType arr
const icons = [
  { src: 'src/assets/icon2.svg' },
  { src: 'src/assets/icon1.svg' },
  { src: 'src/assets/icon3.svg' },
  { src: '' }
]

export default function App() {
  const [selectedTags, setSelectedTags] = useState([])

  const tripType = getTripType(icons, tripTypeList)
  const productType = getProductType(categoryList)
  const activity = getActivity(categoryList)
  const transport = getTransport(categoryList)

  // save clicked tags in selectedTags
  const handleSelectedTags = (id) => {
    console.log(id)
    setSelectedTags(
      selectedTags.includes(id)
        ? selectedTags.filter((item) => item !== id)
        : () => [...selectedTags, id]
    )
  }

  // 遊玩交通 filter by "TypeCode"
  const renderTripType = (item) => (
    <Button
      key={item.TypeCode}
      id={item.TypeCode}
      src={item.src}
      text={`${item.TypeName}旅遊`}
      selectedTags={selectedTags}
      onClick={() => handleSelectedTags(item.TypeCode)}
    />
  )

  const renderTags = (item) => (
    <Button
      key={item.tagNo}
      id={item.tagNo}
      text={`${item.tagName}`}
      selectedTags={selectedTags}
      onClick={() => handleSelectedTags(item.tagNo)}
    />
  )

  const getTripTypeCode = (tripTypeCode) => {
    return transport.filter((item) => item.tripTypeCode === tripTypeCode)
  }

  return (
    <div className={classes.app}>
      <div className={classes.panel}>
        <TagPanel
          title={'遊玩交通'}
          renderItem={tripType.map(renderTripType)}
        />
        {selectedTags.includes('01') && (
          <TagPanel
            title={'郵輪規格'}
            renderItem={getTripTypeCode('01').map(renderTags)}
          />
        )}
        {selectedTags.includes('03') && (
          <TagPanel
            title={'鐵道規格'}
            renderItem={getTripTypeCode('03').map(renderTags)}
          />
        )}
        <TagPanel title='產品規格' renderItem={productType.map(renderTags)} />
        <TagPanel title='行銷活動' renderItem={activity.map(renderTags)} />
      </div>
    </div>
  )
}

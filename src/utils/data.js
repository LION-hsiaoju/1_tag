// 處理 fetch 進來的 data

const mapTag = ({ TagNo, TagName }) => ({
  tagNo: TagNo,
  tagName: TagName
})

// use optional chaining to avoid errors
// 如果 undefined 回傳 []
export const getProductType = (data) => {
  return (
    data[0]?.TypeList?.flatMap((type) =>
      type.GroupList.flatMap((group) => group.TagList.map(mapTag))
    ) || []
  )
}

export const getActivity = (data) => {
  return data[1]?.TypeList?.[0]?.GroupList?.[0]?.TagList?.flatMap(mapTag) || []
}

export const getTransport = (data) => {
  return (
    data[2]?.TypeList?.flatMap((type) =>
      type.GroupList.flatMap((group) =>
        group.TagList.map((tag) => ({
          tripTypeCode: type.TripTypeCode,
          ...mapTag(tag)
        }))
      )
    ) || []
  )
}

// 合併 遊玩交通、icon
export const getTripType = (icons, data) => {
  return data.map((item, i) => ({
    ...item,
    ...icons[i]
  }))
}
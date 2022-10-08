
function WatchedItemList({watchedObject}){
  return (
      <div className="watchedItemList">
        <div>최근에 본 상품</div>
        {
          watchedObject.reverse().map((item,i)=>
              <div key={i} className="watchedItem">{item}</div>
          )
        }
      </div>
  )
}


export default WatchedItemList;

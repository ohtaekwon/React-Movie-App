// 프로젝트의 최상위 컴포넌트
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getRewviews } from "../api";

const Limit = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  // offset state
  const [offset, setOffset] = useState(0);
  // hasNext
  const [hasNext, setHasNext] = useState(false);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  // 최신순
  const handleNewstClick = () => {
    setOrder("createdAt");
  };
  // 평점순
  const handleBestClick = () => {
    setOrder("rating");
  };
  // 삭제
  const handleDelete = (id) => {
    console.log("handleDelete", items);
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  // 처음 출력
  const handleLoad = async (options) => {
    const { reviews, paging } = await getRewviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
    }
    setOffset(options.offset + reviews.length); // 6
    setHasNext(paging.hasNext);
  };

  // 더 불러오기
  const handLoadMore = () => {
    // 다음 페이지
    handleLoad({ order, offset, limit: Limit });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: Limit });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewstClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
      {hasNext && <button onClick={handLoadMore}>더 보기</button>}
    </div>
  );
}

export default App;

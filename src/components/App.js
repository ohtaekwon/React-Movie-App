// 프로젝트의 최상위 컴포넌트
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getRewviews } from "../api";
import ReviewForm from "./ReviewForm";

const Limit = 6; // 6개씩 출력 고정값

function App() {
  // State
  // items State
  const [items, setItems] = useState([]);
  // 정렬 State : 처음엔 최신순(createdAt)
  const [order, setOrder] = useState("createdAt");
  // offset state
  const [offset, setOffset] = useState(0);
  // hasNext state
  const [hasNext, setHasNext] = useState(false);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // loadingError state
  const [loadingError, setLoadingError] = useState(null);

  // 오름차순 정렬
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
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getRewviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { reviews, paging } = result;

    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length); // 6
    setHasNext(paging.hasNext); // 다음 페이지가 있으면 True
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
      <ReviewForm />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
      {hasNext && (
        <button disabled={isLoading} onClick={handLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;

// 프로젝트의 최상위 컴포넌트
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getRewviews } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
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

  const handleLoad = async () => {
    const { reviews } = await getRewviews();
    setItems(reviews);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleNewstClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
    </div>
  );
}

export default App;

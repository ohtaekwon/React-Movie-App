import "../css/ReviewList.css";

function formatData(value) {
  const data = new Date(value);
  return `${data.getFullYear()}. ${data.getMonth() + 1}. ${data.getDate()}`;
}

function ReviewListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatData(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제하기</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  console.log(items);
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
            <input></input>
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;

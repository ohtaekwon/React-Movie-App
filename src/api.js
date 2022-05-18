export async function getRewviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  // throw new Error("버그가 아니라 기능입니다!");
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const res = await fetch(`https://learn.codeit.kr/api/film-reviews?${query}`);
  console.log(res);
  if (!res.ok) {
    throw new Error("불러오기 실패입니다.");
  }
  const body = await res.json(); // json 함수를 호출
  return body;
}

export async function getRewviews(order = "createdAt") {
  const query = `order=${order}`;
  const res = await fetch(`https://learn.codeit.kr/api/film-reviews?${query}`);
  console.log(res);
  const body = await res.json(); // json 함수를 호출
  return body;
}

export async function getRewviews() {
  const res = await fetch("https://learn.codeit.kr/api/film-reviews");
  console.log(res);
  const body = await res.json(); // json 함수를 호출
  return body;
}

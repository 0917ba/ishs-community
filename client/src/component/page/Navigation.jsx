export default function Navigation() {
  return (
    <div className="bg-blue-500 md:basis-[2.5rem] basis-8 flex flex-col justify-center">
      <div className="flex justify-center gap-10 text-white md:text-base text-sm">
        <a href="/info">학교 소개</a>
        <a href="/knowledge">지식 in곽</a>
        <a href="/calendar">학교 일정</a>
        <a href="/learning">학습 자료</a>
        <a href="/nostudy">면불 신청</a>
        <a href="/club">동아리 리그전</a>
        <a href="/bigbang">빅뱅</a>
      </div>
    </div>
  );
}

export default function Navigation() {
  return (
    <div className='bg-blue-500 md:basis-[2.5rem] basis-8 flex flex-col justify-center'>
      <div className='flex justify-center gap-10 text-white md:text-base text-sm'>
        <a href='http://i-science.icehs.kr/sub/info.do?m=0101&s=isciencehs'>
          학교 소개
        </a>
        <a href='/preparing'>지식 in곽</a>
        <a href='http://i-science.icehs.kr/schdList.do?m=0304&s=isciencehs'>
          학교 일정
        </a>
        <a href='/preparing'>학습 자료</a>
        <a href='http://ionya.cc'>면불 신청</a>
        <a href='/BigBang'>빅뱅</a>
      </div>
    </div>
  );
}

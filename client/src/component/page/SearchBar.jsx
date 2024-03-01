export default function SearchBar() {
  return (
    <div className="border-[1.2px] border-black max-w-xs md:max-w-md lg:max-w-lg xl:max-w-none rounded-3xl w-full h-[3.1rem]">
      <div className="w-full h-full flex flex-col justify-center px-4">
        <div className="flex justify-between">
          <span>검색어를 입력하세요.</span>
          {/* <Search size={20} /> */}
        </div>
      </div>
    </div>
  );
}

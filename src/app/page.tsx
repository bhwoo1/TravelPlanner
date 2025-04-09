import Image from "next/image";
import SearchBar from "./components/search/SearchBar";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="relative w-[400px] h-[200px] md:w-[600px] md:h-[300px] lg:w-[800px] lg:h-[400px]">
        <Image
          src={"/Main2.png"}
          alt="메인타이틀"
          fill
          className="object-contain"
        />
      </div>
      <SearchBar />
    </div>
  );
}

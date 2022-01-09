import { useRecoilState } from "recoil";
import { textState } from "../recoil-atoms/atoms";

const MainContent = () => {
  const [text, setText] = useRecoilState(textState);
  
  return (
    <>
      <div className="bg-cyan-200 h-screen">
        <div className="md:container md:mx-auto">
          {text}
        </div>
      </div>
      <div className="bg-red-200 h-screen">
        <div className="md:container md:mx-auto">b</div>
      </div>
      <div className="md:container md:mx-auto"></div>
    </>
  );
};

export default MainContent;

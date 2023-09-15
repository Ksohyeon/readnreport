import "./MainHeader.css";
import { GrMenu } from "react-icons/gr";

function MainHeader() {
  return (
    <div className="header">
      <div className="menu-name">
        <GrMenu className="grmenu" size={50} />
        <span className="site-name">독서와 기록</span>
      </div>
      <div className="header-text">
        <div className="text-row">독서 기록을 사람들과 함께 나눠 보세요.</div>
        <div className="text-row">
          함께 생각을 공유하며 깊이 있는 세계를 만들어가는 공간입니다.
        </div>
      </div>
    </div>
  );
}

export default MainHeader;

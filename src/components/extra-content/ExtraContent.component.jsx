import "./extraContent.style.scss";
import SideCard from "../side-card/SideCard.component";
import FollowCard from "../follow-card/FollowCard.component";
import NewsCard from "../news-card/NewsCard.component";

const ExtraContent = () => {
  return (
    <div className="extra-content">
      <SideCard>
        <FollowCard
          userName={"Luiz Gustavo"}
          login={"LGPossatto@gmail.com"}
          userUID={"48OBK2oWW1ekydvM4fY8uiNXlUg1"}
        ></FollowCard>
        <FollowCard
          userName={"Luiz Gustavo"}
          login={"LGPossatto@gmail.com"}
          userUID={"123"}
        ></FollowCard>
        <FollowCard
          userName={"Luiz Gustavo"}
          login={"LGPossatto@gmail.com"}
          userUID={"123"}
        ></FollowCard>
      </SideCard>
      <SideCard>
        <NewsCard img></NewsCard>
        <NewsCard></NewsCard>
        <NewsCard img></NewsCard>
      </SideCard>
    </div>
  );
};

export default ExtraContent;

import "./extraContent.style.scss";
import SideCard from "../side-card/SideCard.component";
import FollowCard from "../follow-card/FollowCard.component";
import NewsCard from "../news-card/NewsCard.component";

const ExtraContent = () => {
  return (
    <div className="extra-content">
      <SideCard>
        <FollowCard></FollowCard>
        <FollowCard></FollowCard>
        <FollowCard></FollowCard>
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

import "./extraContent.style.scss";
import SideCard from "../side-card/SideCard.component";
import FollowCard from "../follow-card/FollowCard.component";
import NewsCard from "../news-card/NewsCard.component";

const ExtraContent = () => {
  return (
    <div className="extra-content">
      <SideCard title="You might like">
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
      <SideCard title="More info Here">
        <NewsCard
          img
          title="My Portfolio"
          subtitle="Visit my portfolio"
          url="#!"
        ></NewsCard>
        <NewsCard
          title="My GitHub"
          subtitle="Visit my GitHub"
          url="#!"
        ></NewsCard>
        <NewsCard
          img
          title="News Site"
          subtitle="Other project"
          url="#!"
        ></NewsCard>
      </SideCard>
    </div>
  );
};

export default ExtraContent;

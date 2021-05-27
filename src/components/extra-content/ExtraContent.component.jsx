import "./extraContent.style.scss";
import SideCard from "../side-card/SideCard.component";
import FollowCard from "../follow-card/FollowCard.component";
import NewsCard from "../news-card/NewsCard.component";

const ExtraContent = () => {
  return (
    <div className="extra-content">
      <SideCard title="You might like">
        <FollowCard
          userName={"Clone Logs"}
          login={"twitter_clone@email.com"}
          userUID={"hXfffq4P9vbg4FgvlKp42PCdxd33"}
        ></FollowCard>
        <FollowCard
          userName={"Clone Info"}
          login={"clone_info@email.com"}
          userUID={"l0UAdun4vGVIgyn1svLTEDI8I1Y2"}
        ></FollowCard>
        <FollowCard
          userName={"Luiz Gustavo"}
          login={"LGPossatto@gmail.com"}
          userUID={"34FiV7kEE2f8HSYZU60X5wR6sGA2"}
        ></FollowCard>
      </SideCard>
      <SideCard title="More info Here">
        <NewsCard
          img
          title="My Portfolio"
          subtitle="Visit my portfolio"
          url="https://luizgustavo.netlify.app"
        ></NewsCard>
        <NewsCard
          title="My GitHub"
          subtitle="Visit my GitHub"
          url="https://github.com/LGPossatto"
        ></NewsCard>
        <NewsCard
          img
          title="News Site"
          subtitle="Other project"
          url="https://salaodenoticias.netlify.app"
        ></NewsCard>
      </SideCard>
    </div>
  );
};

export default ExtraContent;

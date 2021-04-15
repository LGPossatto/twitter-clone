import "./followCard.style.scss";
import profileImg from "../../assets/images/placeholder.png";
import Btn from "../btn/Btn.component";

const FollowCard = () => {
  return (
    <div className="follow-card flex ai-c">
      <div className="img-box">
        <img src={profileImg} alt="profile" />
      </div>
      <div className="info-box flex jc-sb ai-c">
        <div>
          <h2 className="fs-med">Nome</h2>
          <span className="fs-med fc-secondary">@login</span>
        </div>
        <Btn url="#!" text="Follow" no_bg med></Btn>
      </div>
    </div>
  );
};

export default FollowCard;

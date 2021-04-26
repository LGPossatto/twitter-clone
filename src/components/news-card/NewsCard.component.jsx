import "./newsCard.style.scss";
import headImg from "../../assets/images/twiter-profile.jpg";

const NewsCard = ({ img }) => {
  return (
    <div className="news-card flex jc-sb ai-c">
      <div className="info-box">
        <span className="fs-small fc-secondary">Nome - Time</span>
        <h2 className="fs-med">News Tittle</h2>
      </div>
      {img && (
        <div className="img-box">
          <img src={headImg} alt="about" />
        </div>
      )}
    </div>
  );
};

export default NewsCard;

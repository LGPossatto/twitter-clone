import "./newsCard.style.scss";
import headImg from "../../assets/images/twiter-profile.jpg";

const NewsCard = ({ img, title, url, subtitle }) => {
  return (
    <a href={url} className="news-card flex jc-sb ai-c" target="_blanc">
      <div className="info-box">
        <span className="fs-small fc-secondary">{subtitle}</span>
        <h2 className="fs-med">{title}</h2>
      </div>
      {img && (
        <div className="img-box">
          <img src={headImg} alt="about" />
        </div>
      )}
    </a>
  );
};

export default NewsCard;

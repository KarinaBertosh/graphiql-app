import graphql from "../assets/graphql.svg";
import "./style.scss";

export const WelcomePage = () => {
  return (
    <div className="pages ">
      <div className="description">
        <img src={graphql} alt="graphql" className="description__img" />
        <div className="description__title">
          GraphQL is an open source data query language and data manipulation
          language for building web-based APIs. GraphQL was developed as an
          internal project by Facebook in 2012 and was later released to the
          public in 2015. <br />
          <strong>Programming languages: </strong> JavaScript, Java, Ruby, Scala.{" "}
          <br />
          <strong>Appeared in: </strong> 14.09.2015. <br />
          <strong>Developer: </strong> Facebook
        </div>
      </div>
    </div>
  );
};

import graphql from "../assets/graphql.svg";
import "./style.scss";

export const WelcomePage = () => {
  return (
    <div className="pages welcome-page">
      <h1 className="title">Graphql App</h1>
      <div className="description">
        <img src={graphql} alt="graphql" className="description__img" />
        <div className="description__title">
          <p>
            The Graphql App is an original app, created by students of
            <a href="https://rs.school/react/"> RS School React course</a>. It
            is a hand-made functional copy of popular open-source tool GraphiQL.
          </p>
          <p>
            For more information about used technologies, please visit the
            <a href="https://github.com/Elina-nep/graphiql-app"> github page</a>
            .
          </p>
        </div>
      </div>

      <h3>About authors</h3>
      <div className="description author-description">
        <div className="author">
          <h4>
            <a href="https://github.com/Elina-nep">Elina</a>
          </h4>
          <p>
            <i>team-leader, developer</i>
          </p>
          <p>
            Realized: login and register page, documentation on main page...
          </p>
        </div>
        <div className="author">
          <h4>
            <a href="https://github.com/makhitr">Marina</a>
          </h4>
          <p>
            <i>developer</i>
          </p>
          <p>Some things done</p>
        </div>
        <div className="author">
          <h4>
            <a href="https://github.com/KarinaBertosh">Karina</a>
          </h4>
          <p>
            <i>developer, designer</i>
          </p>
          <p>Some things done</p>
        </div>
      </div>
    </div>
  );
};

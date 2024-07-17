import "./../../App.css";
import RickAndMortyHome from "./../../assets/home/rick-morty-home.jpg";

export default function Home() {
  return (
    <div className="home-contents">
      <div className="home-container">
        <div className="image-container">
          <img
            className="home-image"
            src={RickAndMortyHome}
            alt="Rick and Morty Home"
          />
        </div>
        <div className="paragraph-container">
          <h2>Rick and morty Series</h2>
          <div className="paragraph">
            Rick and Morty is an animated science fiction sitcom that follows
            the misadventures of an eccentric, alcoholic scientist named Rick
            Sanchez and his good-hearted but easily influenced grandson, Morty
            Smith. Together, they travel to different dimensions, encounter
            bizarre creatures, and get into absurd and often dangerous
            situations. The show is known for its dark humor, satirical take on
            science fiction tropes, and thought-provoking exploration of complex
            themes like existentialism and the nature of reality.
          </div>
        </div>
      </div>
    </div>
  );
}

import "./../../App.css";
import ActionAreaCard from "./ActionAreaCard";
import Img1 from "./../assets/characters/char1.jpg";
import Img2 from "./../assets/characters/char2.jpg";
import Img3 from "./../assets/characters/char3.jpg";

const data = [
  {
    id: 1,
    name: "Salah",
    description: "Frontend Developer",
    image: Img1,
  },
  {
    id: 2,
    name: "Omar",
    description: "Data Engineer",
    image: Img2,
  },
  {
    id: 3,
    name: "Jana",
    description: "Backend Engineer",
    image: Img3,
  },
];

export default function DummyCards() {
  return (
    <div className="card-container">
      {/* {data.map((item) => {
        return (
          <ActionAreaCard
            key={item.id}
            id={item.id}
            name={item.name}
            status={item.description}
            image={item.image}
          />
        );
      })} */}
    </div>
  );
}

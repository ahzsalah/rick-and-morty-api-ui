import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./../../App.css";
import { CharacterDTO } from "../dtos/CharacterDTO";
import { useNavigate } from "react-router-dom";

// interface Props {
//   name: string;
//   status: string;
//   image: string;
// }

export default function ActionAreaCard({
  id,
  name,
  status,
  image,
}: Pick<CharacterDTO, "id" | "name" | "status" | "image">) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${id}`);
  };

  return (
    <Card
      className="card"
      sx={{ backgroundColor: "#868686", maxWidth: 345 }}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia
          className="card-media"
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

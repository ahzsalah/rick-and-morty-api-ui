import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import "./../../App.css";
import { CharacterDTO } from "../dtos/CharacterDTO";

interface Props extends Pick<CharacterDTO, "id" | "name" | "status" | "image"> {
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

export default function ActionAreaCard({
  id,
  name,
  status,
  image,
  isFavorite,
  toggleFavorite,
}: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${id}`);
  };

  return (
    <Card className="card" sx={{ maxWidth: 345, backgroundColor: "#808080" }}>
      <CardActionArea className="card-action" onClick={handleClick}>
        <CardMedia
          className="card-media"
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="card-name"
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
        </CardContent>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
          sx={{ position: "absolute", bottom: 6, right: 8 }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActionArea>
    </Card>
  );
}

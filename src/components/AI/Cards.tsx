import { CHECK_AND_RADIO, RANGE } from "../../data";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useTheme } from "@mui/material/styles";
import { AI } from "./Form/Form";
import { useState, useEffect } from "react";

interface ICardsProps {
  cards: AI[];
  onDelete: (index: number) => void;
  onEdit: (ai: AI) => void;
  onReorder: (cards: AI[]) => void;
}

interface ICardsInfoProps {
  title: string;
  info: string | string[];
}
const CardsInfo: React.FC<ICardsInfoProps> = ({ title, info }) => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 2,
        flexDirection: "row",
        marginBottom: 2,
      }}
    >
      <Typography
        variant="h4"
        color="text.primary"
        sx={{
          width: { xs: "5em", sm: "14.6em", md: "6.7em", lg: "14.6em" },
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {Array.isArray(info) ? (
          info.map((option, index) => (
            <Chip
              key={index}
              label={option}
              sx={{
                margin: theme.spacing(0, 0.5),
                display: "flex",
              }}
            />
          ))
        ) : (
          <Chip
            label={info}
            sx={{
              margin: theme.spacing(0, 0.5),
              padding: { xs: 0.5, sm: 1, md: 1.5 },
            }}
          />
        )}
      </Box>
    </Container>
  );
};

export default function Cards({
  cards,
  onDelete,
  onEdit,
  onReorder,
}: ICardsProps) {
  const theme = useTheme();

  const [cardsState, setCards] = useState(cards);
  useEffect(() => {
    setCards(cards);
  }, [cards]);
  const [dragItemIndex, setDragItemIndex] = useState<number | undefined>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<
    number | undefined
  >();

  const handleTouchStart = (
    _event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    setDragItemIndex(index);
  };

  const handleTouchMove = (
    _event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    setDragOverItemIndex(index);
  };

  const handleTouchEnd = () => {
    handleDrop();
  };

  const handleDragStart = (index: number) => {
    setDragItemIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setDragOverItemIndex(index);
  };

  const handleDrop = () => {
    if (
      typeof dragItemIndex === "number" &&
      typeof dragOverItemIndex === "number"
    ) {
      const _cards = [...cardsState];
      const dragItem = _cards.splice(dragItemIndex, 1)[0];
      _cards.splice(dragOverItemIndex, 0, dragItem);
      setCards(_cards);
      onReorder(_cards);
    }
  };

  const handleDragEnter = (index: number) => {
    setDragOverItemIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverItemIndex(undefined);
  };

  const handleDragEnd = () => {
    setDragItemIndex(undefined);
    setDragOverItemIndex(undefined);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        overflowY: "auto",
        maxHeight: "75vh",
      }}
    >
      <TransitionGroup>
        {cardsState.map((card, index) => (
          <CSSTransition key={index} timeout={500} classNames="card">
            <Box
              draggable
              onTouchStart={(event) => handleTouchStart(event, index)}
              onTouchMove={(event) => handleTouchMove(event, index)}
              onTouchEnd={handleTouchEnd}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDrop={handleDrop}
              onDragEnter={() => handleDragEnter(index)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              sx={{
                flexDirection: "column",
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: { md: 0, lg: 2 },
                paddingRight: { md: 0, lg: 2 },
                maxWidth: { md: "90%", lg: "80%" },
                border: "2px solid",
                borderColor: theme.palette.text.primary,
                py: 2.5,
                borderRadius: 2,
                position: "relative",
                marginBottom: 5,
                bgcolor: "background.paper",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: {
                    xs: theme.spacing(1),
                    md: theme.spacing(0.875),
                    lg: theme.spacing(1),
                  },
                  left: {
                    xs: theme.spacing(1),
                    sm: theme.spacing(2),
                    md: theme.spacing(4),
                  },
                  right: {
                    xs: theme.spacing(0.7),
                    sm: theme.spacing(1),
                    md: theme.spacing(2),
                  },
                  height: "2px",
                  backgroundColor: theme.palette.text.primary,
                },
                "& > *:not(.MuiButton-root)": {
                  pointerEvents: "auto",
                },
              }}
            >
              <CardsInfo
                title={CHECK_AND_RADIO[0].label}
                info={card.levelOfAI}
              />
              <CardsInfo
                title={CHECK_AND_RADIO[1].label}
                info={card.whereAIIsUsed}
              />
              <CardsInfo
                title={CHECK_AND_RADIO[2].label}
                info={card.TypeOfAI}
              />
              <CardsInfo
                title={RANGE[0].label}
                info={card.rateAIIntelligence.toString()}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: {
                    xs: 2,
                    sm: 4,
                    md: 6,
                  },
                  marginBottom: -6,
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={() => onEdit(cards[index])}
                  sx={{
                    marginRight: 2.5,
                    width: {
                      xs: theme.spacing(13),
                      sm: theme.spacing(16),
                      lg: theme.spacing(18),
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ClearIcon />}
                  onClick={() => onDelete(index)}
                  sx={{
                    width: {
                      xs: theme.spacing(16),
                      sm: theme.spacing(20),
                      lg: theme.spacing(24),
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Box>
  );
}

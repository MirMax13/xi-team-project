import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Grid,
  Modal,
  RadioGroup,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CardsProvider,
  MixedCard,
  useCardsContext,
} from "../components/context/GamesCardsContextProvider";
import { AICardComponent } from "../components/AI/Cards/AICardComponent";
import FinalCard from "../components/FinalCard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CardComponentMix } from "../components/Games/Cards";
import { useAICardsContext } from "../components/context/AICardsContextProvider";
import CustomSlider from "../components/ScrollContainer";
import { HEADER_HEIGHT } from "../constants";
import Title from "../components/Title";
import DashboardIcon from "@mui/icons-material/Dashboard";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "90%", md: "90%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: { xs: 1, sm: 2, md: 4, lg: 4 },
  height: { xs: "70vh", sm: "70vh", md: "80vh" },
  overflowY: "auto",
  borderRadius: 2,
};

function MixCardsContent() {
  const theme = useTheme();
  const { cards } = useCardsContext();
  const { AICards } = useAICardsContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mixedCards, setMixedCards] = useState<MixedCard[]>([]); // State to store the list of mixed cards

  const [selectedCardGames, setSelectedCardGames] = useState<string | null>(
    null
  );
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleRadioChangeGames = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedCardGames(event.target.value);
  };

  const handleRadioChangeAI = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCard(event.target.value);
  };

  const [error, setError] = useState("");

  const mix = () => {
    if (!selectedCardGames || !selectedCard) {
      setError("Please select at least one game and one AI.");
      return;
    }

    const selectedGameCard = cards.find(
      (card) => card.id === selectedCardGames
    );
    const selectedAICard = AICards.find((card) => card.id === selectedCard);

    if (selectedGameCard && selectedAICard) {
      console.log("Mixing:", selectedGameCard.id, "with", selectedAICard.id);

      const mixedCardData = {
        ...selectedGameCard,
        levelOfAI: selectedAICard.levelOfAI,
        whereAIIsUsed: selectedAICard.whereAIIsUsed,
        TypeOfAI: selectedAICard.TypeOfAI,
        rateAIIntelligence: selectedAICard.rateAIIntelligence,
      };

      setMixedCards((prevMixedCards) => [...prevMixedCards, mixedCardData]);
    }
    setError("");
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        py: 3,
        px: { xs: 2, sm: 5, md: 10 },
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Title icon={DashboardIcon} title="Final Cards" />
          <Button onClick={handleOpen}>Add Cards</Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box
              sx={{
                marginLeft: { xs: 0, sm: 0, md: 0, lg: 0 },
                marginRight: { xs: 0, sm: 0, md: 0, lg: 0 },
                width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
                // mx: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{ flexDirection: { xs: "column", md: "row", lg: "row" } }}
              >
                <Grid
                  item
                  sx={{
                    width: { xs: "100%", md: "50%", lg: "50%", xl: "45%" },
                  }}
                >
                  {/* <Grid item xs={12} sm={8} md={8} lg={5}> */}
                  <Typography variant="h6">Games Cards</Typography>
                  <RadioGroup
                    aria-label="games-cards"
                    name="games-cards"
                    value={selectedCardGames}
                    onChange={handleRadioChangeGames}
                  >
                    {cards.map((card) => (
                      <Accordion
                        key={card.id}
                        sx={{
                          width: { xs: "100%", md: "100%", lg: "100%" },
                          border:
                            card.id === selectedCardGames
                              ? "3px solid"
                              : "none",
                          borderColor: theme.palette.primary.main,
                        }}
                        onClick={() => setSelectedCardGames(card.id)}
                      >
                        <AccordionSummary
                          expandIcon={<ArrowDropDownIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography>{card.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CardComponentMix card={card} />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </RadioGroup>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: { xs: "100%", md: "50%", lg: "50%" },
                  }}
                >
                  <Typography variant="h6">AI Cards</Typography>
                  <RadioGroup
                    aria-label="ai-cards"
                    name="ai-cards"
                    value={selectedCard}
                    onChange={handleRadioChangeAI}
                  >
                    {AICards.map((card, index) => (
                      <Accordion
                        key={card.id}
                        sx={{
                          // width: { xs: "100%", md: "100%", lg: "100%" },
                          border:
                            card.id === selectedCardGames
                              ? "3px solid"
                              : "none",
                          borderColor: theme.palette.primary.main,
                        }}
                        onClick={() => setSelectedCardGames(card.id)}
                      >
                        <AccordionSummary
                          expandIcon={<ArrowDropDownIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          <Typography>{`Card ${index + 1}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <AICardComponent card={card} />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </RadioGroup>
                </Grid>
              </Grid>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                mt={2}
              >
                <FormHelperText>{error || " "}</FormHelperText>
                <Button onClick={mix} variant="contained" color="primary">
                  Mix Selected Cards
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Grid container spacing={2}>
        <CustomSlider
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            overflowX: "auto",
          }}
        >
          {mixedCards.map((card, index) => (
            // <Grid item xs={12} sm={12} md={12} key={index}>

            <Grid key={`${card.id}-${index}`}>
              <FinalCard mixedCard={card} />
            </Grid>
          ))}
        </CustomSlider>
      </Grid>
    </Box>
  );
}

export default function MixCards() {
  return (
    <CardsProvider>
      <MixCardsContent />
    </CardsProvider>
  );
}

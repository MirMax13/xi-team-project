import { Box, Container } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Title from "../components/Title";
import StyleIcon from "@mui/icons-material/Style";
import { useTheme } from "@mui/material/styles";
import Form from "../components/Games/Form";
import { Cards } from "../components/Games/Cards";
import { CardsProvider } from "../components/context/GamesCardsContextProvider";

export default function Games() {
  const theme = useTheme();

  return (
    <CardsProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          padding: theme.spacing(2),
          boxSizing: "border-box",
        }}
      >
        <Container
          sx={{
            width: { xs: "100%", md: "40%" },
            padding: theme.spacing(2),
            boxSizing: "border-box",
          }}
        >
          <Title icon={SportsEsportsIcon} title="Registration Form" />
          <Form />
        </Container>
        <Container
          sx={{
            width: { xs: "100%", md: "60%" },
            padding: theme.spacing(2),
            boxSizing: "border-box",
          }}
        >
          <Title icon={StyleIcon} title="Submitted Cards" />
          <Cards />
        </Container>
      </Box>
    </CardsProvider>
  );
}

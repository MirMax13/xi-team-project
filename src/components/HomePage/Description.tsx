import { Button, Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Text from "./TextFields";
import { Link } from "react-router-dom";

interface textProps {
  link: string;
  title: string;
  text1: string;
  text2: string;
  button: string;
}

function About({ link, title, text1, text2, button }: textProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.secondary.main,
        px: 2,
        py: 1,
        borderRadius: 2,
      }}
    >
      <Typography sx={{ pl: 3 }}>{title}</Typography>
      <Box
        sx={{
          display: "flex",
          pb: 5,
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Text text={text1} />
        <Container
          disableGutters
          sx={{
            width: "50%",
          }}
        >
          <Text text={text2} />
          <Button variant="contained" fullWidth component={Link} to={link}>
            {button}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
export default About;

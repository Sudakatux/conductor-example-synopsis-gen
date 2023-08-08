import { Paper, Typography, Box } from "@mui/material";

interface MovieSummaryProps {
  genre: string;
  summary: string;
}

export const MovieSummary = (prop: MovieSummaryProps) => {
  return (
    <Paper
      sx={{
        width: "291px",
        borderRadius: "5px",
        background: "#D9D9D9",
      }}
    >
      <Typography
        sx={{
          background: "#F6263B",
          fontWeight: 700,
          size: "16px",
          color: "#FFFFFF",
          lineHeight: "24px",
          padding: "8px 16px",
          borderRadius: "5px 5px 0px 0px",
          height: "35px",
        }}
        align="center"
        paragraph
      >
        {prop.genre}
      </Typography>
      <Box
        sx={{
          overflowY: "auto",
          height: "400px",
            background: "#D9D9D9",
            borderRadius: "5px 5px",
        }}
      >
        <Typography
          sx={{
            padding: 2,
            lineHeight: "23px",
            size: "12px",
          }}
          align="left"
        >
          {prop.summary}
        </Typography>
      </Box>
    </Paper>
  );
};

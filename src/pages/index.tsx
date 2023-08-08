import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { MainTitle, SubText1 } from "@/components/elements/texts/Typographys";
import { PrimaryButton } from "@/components/elements/buttons/Buttons";
import {
  Stack,
  TextField,
  SelectChangeEvent,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import {
  orkesConductorClient,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript/browser";
import getConfig from "next/config";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig();
  const clientPromise = orkesConductorClient(publicRuntimeConfig.conductor);
  const client = await clientPromise;
  // With the client pull the workflow with correlationId (correlation id is not really needed it just helps to group orders together)
  return {
    props: {
      conductor: {
        serverUrl: publicRuntimeConfig.conductor.serverUrl,
        TOKEN: client.token,
      },
      workflowName: publicRuntimeConfig.workflow.name,
    },
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Documentary",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Science Fiction",
  "Thriller",
  "Western",
  "Sports",
];
interface Props {
  conductor: {
    serverUrl: string;
    TOKEN: string;
  };
  workflowName: string;
}

const runWorkflow = async ({
  serverUrl,
  TOKEN,
  workflowName,
  documentURL,
  genres,
}: {
  serverUrl: string;
  TOKEN: string;
  workflowName: string;
  documentURL: string;
  genres: string[];
}) => {
  const client = await orkesConductorClient({ serverUrl, TOKEN });
  const executionId = await new WorkflowExecutor(client).startWorkflow({
    name: workflowName,
    version: 1,
    input: {
      provider: "openai",
      promptName: "synopsis",
      joinSummaryPrompt: "summaryOfSummary",
      intermediatePromptName: "synopsisIntermediateSummary",
      documentURL,
      model: "text-davinci-003",
      genres: genres.length > 0 ? genres.join(",") : undefined,
    },
  });
  return executionId;
};

export default function Home(props: Props) {
  const theme = useTheme();
  const [detectGenre, setDetectGenre] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);
  const [url, setURl] = useState<string>("");
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent<typeof genres>) => {
    const {
      target: { value },
    } = event;
    setGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if(detectGenre){
      setDetectGenre(false);
    }
  };
  const handleAutoDetectGenre = () => {
    if(!detectGenre){
      setGenres([]);
    }
    setDetectGenre(!detectGenre);
  }

  const handleGenerate = () => {
    runWorkflow({
      serverUrl: props.conductor.serverUrl,
      TOKEN: props.conductor.TOKEN,
      workflowName: props.workflowName,
      documentURL: url,
      genres,
    }).then((executionId) => router.replace(`/processing/${executionId}`));
  };
  return (
    <MainLayout title="Movie Synopsis">
      <Stack spacing={6} justifyContent={"center"} alignItems={"center"}>
        <MainTitle>Movie Synopsis</MainTitle>
        <Stack spacing={4}>
          <SubText1>
            To get started, please enter a URL for the movie or its script
          </SubText1>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Movie/Script URL*"
              variant="filled"
              placeholder="Paste here..."
              onChange={(event) => setURl(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Auto-detect genre"
              checked={detectGenre}
              onChange={handleAutoDetectGenre}
            />
          </Stack>
        </Stack>
        {detectGenre ? null : (
          <FormControl sx={{ m: 1, width: 300 }} variant="filled">
            <InputLabel id="demo-multiple-name-label">Genre*</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={genres}
              onChange={handleChange}
              renderValue={(selected) => (selected as string[]).join(", ")}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
            >
              {names.map((name) => {
                const notSelected = genres.indexOf(name) === -1;

                return (
                  <MenuItem
                    key={name}
                    value={name}
                    style={{
                      fontWeight: notSelected
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium,
                    }}
                  >
                    {name}
                    {notSelected ? null : <CheckIcon />}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        <Box width={"100%"} p={1}>
          <PrimaryButton fullWidth onClick={handleGenerate}>
            Generate
          </PrimaryButton>
        </Box>
      </Stack>
    </MainLayout>
  );
}

import { Stack, Box } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/components/MainLayout";
import { MovieSummary } from "@/components/containers/MovieSummary";
import { MainTitle, SubText1 } from "@/components/elements/texts/Typographys";
import { PrimaryButton } from "@/components/elements/buttons/Buttons";
import { getExecution } from "@/serverhelpers/utils";
import { WorkflowStatus } from "@io-orkes/conductor-javascript";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const executionId = context.params?.executionId as string;
  const executionAndStatus = getExecution(executionId);

  return {
    props: executionAndStatus,
  };
}

type Props = {
  executionId: string;
  workflowStatus: WorkflowStatus;
};

const MovieSummaryList = (props: Props) => {
  return (
    <>
      {Array.isArray(props.workflowStatus?.output?.result) ? (
        props.workflowStatus?.output?.result.map(
          (resObj: Record<string, string>) => {
            const genreSummary = Object.entries(resObj).map(
              ([k, v]: [string, string]) => ({ genre: k, summary: v })
            )[0];
            return (
              <MovieSummary
                key={genreSummary.genre}
                genre={genreSummary.genre}
                summary={genreSummary.summary}
              />
            );
          }
        )
      ) : (
        <MovieSummary
          genre="Action"
          summary={props.workflowStatus?.output?.result}
        />
      )}
    </>
  );
};

export default function Result(props: Props) {
  return (
    <MainLayout title="Movie Synopsis">
      <MainTitle align="center">Movie Synopsis for</MainTitle>
      <Box>
        <Stack
          pt={2}
          spacing={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack
            spacing={6}
            justifyContent={"center"}
            alignItems={"center"}
            direction={{ xs: "column", sm: "row" }}
          >
            {props.workflowStatus.status === "COMPLETED" ? (
              <MovieSummaryList {...props} />
            ) : (
              <SubText1>Something went wrong</SubText1>
            )}
          </Stack>
          <PrimaryButton href="/">Generate Another</PrimaryButton>
        </Stack>
      </Box>
    </MainLayout>
  );
}

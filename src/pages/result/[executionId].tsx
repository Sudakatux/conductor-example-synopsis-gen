import { Stack, Box } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/components/MainLayout";
import { MovieSummary } from "@/components/containers/MovieSummary";
import { MainTitle, SubText2 } from "@/components/elements/texts/Typographys";
import { getExecution } from "@/serverhelpers/utils";
import {
  WorkflowStatus,
} from "@io-orkes/conductor-javascript";

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
            direction={"row"}
          >
            <MovieSummary genre="Action" summary={props.workflowStatus?.output?.text}/>

          </Stack>
        </Stack>
      </Box>
    </MainLayout>
  );
}

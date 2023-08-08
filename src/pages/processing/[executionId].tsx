import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { WorkflowStatus } from "@io-orkes/conductor-javascript";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/components/MainLayout";
import { FakeLogo } from "@/components/elements/FakeLogo";
import { MainTitle } from "@/components/elements/texts/Typographys";
import { useRouter } from "next/router";
import { getExecution } from "@/serverhelpers/utils";
import { keyframes, styled } from "@mui/system";

const changeColor = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}`;
const AnimationContainer = styled("div")`
  display: inline-block;
  background-color: transparent;
  animation: ${changeColor} 2s linear infinite;
`;

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

export default function Processing(props: Props) {
  const router = useRouter();
  useEffect(() => {
    let timeOutId: NodeJS.Timeout;
    if (props.workflowStatus.status === "RUNNING") {
      timeOutId = setTimeout(() => {
        router.replace(router.asPath);
      }, 500);
    } else {
      router.replace(`/result/${props.executionId}`);
    }
    return () => clearTimeout(timeOutId);
  }, [props.workflowStatus, router]);

  return (
    <MainLayout title="Movie Synopsis">
      <MainTitle align="center">Movie Synopsis for</MainTitle>
      <Stack direction={"row"} spacing={4} pt={2}>
        <Box mr={1}>Generating...</Box>
        <AnimationContainer>
          <FakeLogo />
        </AnimationContainer>
      </Stack>
    </MainLayout>
  );
}

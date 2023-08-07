
import {
  orkesConductorClient,
  WorkflowExecutor,
  WorkflowStatus,
} from "@io-orkes/conductor-javascript";
import getConfig from "next/config";

export async function getExecution(executionId:string) {
  const { publicRuntimeConfig } = getConfig();
  const client = await orkesConductorClient(publicRuntimeConfig.conductor);
  const workflowStatus: WorkflowStatus = await new WorkflowExecutor(
    client
  ).getWorkflowStatus(executionId, true, true);

  return {
      executionId: executionId,
      workflowStatus,
  } as const;
}
import { SetSMSAttributesCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./sns-client";

const params = {
  attributes: {
    DefaultSMSType: "Transactional",
    DefaultSenderID: "Hapi",
    MonthlySpendLimit: "1",
    DeliveryStatusSuccessSamplingRate: "0",
    DeliveryStatusIAMRole: process.env.SNS_CLOUDWATCH_ROLE_ARN as string,
  },
};

async function setSMSPreferences(): Promise<void> {
  try {
    const data = await snsClient.send(new SetSMSAttributesCommand(params));
  } catch (error) {
    console.log(error);
  }
}

setSMSPreferences();

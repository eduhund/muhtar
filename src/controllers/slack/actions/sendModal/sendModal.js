import { slack } from "../../slack.js";
import { timeModal } from "../../messageBuilder.js";

async function openModal(modalBuilder, modalData) {
  console.log(await slack.client.views.open(modalBuilder(modalData)));
}

export async function sendModal(type, data) {
  switch (type) {
    case "timeModal":
      await openModal(timeModal, data);
      break;
  }
}

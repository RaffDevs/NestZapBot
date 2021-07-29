import { STATE } from "@open-wa/wa-automate";
import { SessionInfo } from "@open-wa/wa-automate/dist/api/model/sessionInfo";

export interface SessionOverview {
  isConnected: boolean;
  isPhoneDisconnected: boolean;
  isPhonePlugged: boolean;
  connectionState: STATE
  batteryLevel: number;
}
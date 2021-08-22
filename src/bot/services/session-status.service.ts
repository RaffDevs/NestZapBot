import { Injectable } from "@nestjs/common";
import { Client } from "@open-wa/wa-automate";
import { SessionOverview } from "../interfaces/session-overview.interface";

@Injectable()
export class SessionStatus {
  constructor() { } 

  public async getOverview(session: Client): Promise<SessionOverview> {
    const overview: SessionOverview = {
      isConnected: await session.isConnected(),
      isPhoneDisconnected: await session.isPhoneDisconnected(),
      isPhonePlugged: await session.getIsPlugged(),
      batteryLevel: await session.getBatteryLevel(),
      connectionState: await session.getConnectionState()
    };

    return overview;
  }
}
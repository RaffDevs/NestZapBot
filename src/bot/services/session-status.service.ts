import { Injectable } from "@nestjs/common";
import { SessionOverview } from "../interfaces/session-overview.interface";
import { CreateSessionService } from "./create-session.service";


@Injectable()
export class SessionStatus {
  constructor( private createSession: CreateSessionService ) { }

  public async getOverview(): Promise<SessionOverview> {
    const session = this.createSession.sessionWhats;

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
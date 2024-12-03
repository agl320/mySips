export enum ConnectionStatus {
    Pending = "PENDING",
    Blocked = "BLOCKED",
    Friend = "FRIEND",
}

export interface IConnectionParams {
    userAuuid: string;
    userBuuid: string;

    status: ConnectionStatus;

    pairUuid: string;
}

class Connection {
    private userAuuid: string;
    private userBuuid: string;

    status: ConnectionStatus;

    private pairUuid: string;

    constructor(params: IConnectionParams) {
        this.userAuuid = params.userAuuid;
        this.userBuuid = params.userBuuid;
        this.status = params.status;
        this.pairUuid = params.pairUuid;
    }

    toFirestore(): Record<string, any> {
        return {
            userAuuid: this.userAuuid,
            userBuuid: this.userBuuid,
            status: this.status,
            pairUuid: this.pairUuid,
        };
    }

    setStatus(status: ConnectionStatus) {
        this.status = status;
    }

    getPairUuid(): string {
        return this.pairUuid;
    }

    getUserUuids(): string[] {
        return [this.userAuuid, this.userBuuid];
    }

    static fromFirestore(data: IConnectionParams): Connection {
        return new Connection({
            userAuuid: data.userAuuid,
            userBuuid: data.userBuuid,
            status: data.status,
            pairUuid: data.pairUuid,
        });
    }
}

export { Connection };

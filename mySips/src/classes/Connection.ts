export enum ConnectionStatus {
    Pending = "PENDING",
    Blocked = "BLOCKED",
    Friend = "FRIEND",
}

export interface IConnectionParams {
    userAuid: string;
    userBuid: string;

    status: ConnectionStatus;

    pairUid: string;

    requesterUid: string;
}

class Connection {
    private userAuid: string;
    private userBuid: string;

    status: ConnectionStatus;

    private pairUid: string;

    private requesterUid: string;

    constructor(params: IConnectionParams) {
        this.userAuid = params.userAuid;
        this.userBuid = params.userBuid;
        this.status = params.status;
        this.pairUid = params.pairUid;
        this.requesterUid = params.requesterUid;
    }

    toFirestore(): Record<string, any> {
        return {
            userAuid: this.userAuid,
            userBuid: this.userBuid,
            status: this.status,
            pairUid: this.pairUid,
            requesterUid: this.requesterUid,
        };
    }

    setStatus(status: ConnectionStatus) {
        this.status = status;
    }

    getPairUid(): string {
        return this.pairUid;
    }

    getUserUids(): string[] {
        return [this.userAuid, this.userBuid];
    }

    static fromFirestore(data: IConnectionParams): Connection {
        return new Connection({
            userAuid: data.userAuid,
            userBuid: data.userBuid,
            status: data.status,
            pairUid: data.pairUid,
            requesterUid: data.requesterUid,
        });
    }
}

export { Connection };

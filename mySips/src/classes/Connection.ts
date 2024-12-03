export enum ConnectionStatus {
    Pending = "PENDING",
    Blocked = "BLOCKED",
    Friend = "FRIEND",
}

interface IConnectionParams {
    uuid: string;

    userAuuid: string;
    userBuuid: string;

    status: ConnectionStatus;
}

class Connection implements IConnectionParams {
    uuid: string;

    userAuuid: string;
    userBuuid: string;

    status: ConnectionStatus;

    constructor(params: IConnectionParams) {
        this.uuid = params.uuid;
        this.userAuuid = params.userAuuid;
        this.userBuuid = params.userBuuid;
        this.status = params.status;
    }

    toFirestore(): Record<string, any> {
        return {
            uuid: this.uuid,
            userAuuid: this.userAuuid,
            userBuuid: this.userBuuid,
            status: this.status,
        };
    }

    static fromFirestore(data: IConnectionParams): Connection {
        return new Connection({
            uuid: data.uuid,
            userAuuid: data.userAuuid,
            userBuuid: data.userBuuid,
            status: data.status,
        });
    }
}

export { Connection };

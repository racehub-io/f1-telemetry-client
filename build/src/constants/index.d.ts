declare const _default: {
    PACKETS: {
        motion: string;
        session: string;
        lapData: string;
        event: string;
        participants: string;
        carSetups: string;
        carTelemetry: string;
        carStatus: string;
    };
    TRACKS: import("./types").Track[];
    DRIVERS: {
        [index: number]: import("./types").Driver;
    };
    TEAMS: import("./types").Team[];
};
export default _default;

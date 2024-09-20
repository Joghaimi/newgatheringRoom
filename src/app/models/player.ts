export interface Player {
    id?: string,
    firstName?: string,
    lastName?: string,
    mobileNumber?: string,
    customer_mid?: string,
}


export interface Team {
    name: string,
    player?: Player[],
    fortRoomScore: number,
    shootingRoomScore: number,
    divingRoomScore: number,
    darkRoomScore: number,
    floorIsLavaRoomScore: number,
    total?: number,
    isAdult: boolean
}


export enum GatheringRoomGameStage {
    None,
    IntroVideo,
    IntroVideoStarted,
    StartButton,
    InstructionVideo,
    TeamNamming,
    GoToTheNextRoom
}

export enum RoomGameStage {
    None,
    NotStarted,
    showIntro,
    Started,
}
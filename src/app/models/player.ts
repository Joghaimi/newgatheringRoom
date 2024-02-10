export interface Player {
    uid?: string,
    firstName?: string,
    lastName?: string
}


export interface Team {
    name: string,
    player?: Player[],
    fortRoomScore?: number,
    shootingRoomScore?: number,
    divingRoomScore?: number,
    darkRoomScore?: number,
    floorIsLavaRoomScore?: number,
}
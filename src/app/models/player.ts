export interface Player {
    id?: string,
    firstName?: string,
    lastName?: string
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
}

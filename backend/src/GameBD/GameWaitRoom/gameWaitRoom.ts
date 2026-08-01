import { Waiter } from "../Waiter/Waiter";

export class GameWaitRoom {
    constructor() {}

    private waitersMap = new Map<string, Waiter>();
}
import type {Vector3} from "three";

export interface CasinoAnchors {
    deck: Vector3 | null;
    player: Record<number, Vector3>;
    dealer: Record<number, Vector3>;
}

export interface PickupPoint {
    code: string; 
    address: string;

}

export interface CdekResponse {
    points: PickupPoint[];
}
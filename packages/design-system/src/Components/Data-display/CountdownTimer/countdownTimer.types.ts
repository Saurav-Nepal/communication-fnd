export interface TimerDto {
    className?: string;
    duration: number | string;
    callback?: (val: any) => any;
    countTime?: (val?: any) => any;
}

export interface Customer {
    [x: string]: any;
    id:string,
    title:string,
    description:string,
    contactValue:number,
    status:boolean,
    lostReason:string,
    closedAt:Date,
    userId:string,
    personId:string,
    contactSourceId:number,
    contactTypeId:number,
    contactPipelineStageId:number,
    expectedClose:string,
    score:number,
}
export interface Activities{
    id:string,
    title:string,
    type:string,
    comment:string,
    scheduleFrom: Date,
    scheduleTo:Date,
    isDone:Boolean,
    location:string,
    sendToEmail:string
}
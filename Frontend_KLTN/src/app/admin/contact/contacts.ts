import { ImageFile } from "src/app/user/imageFile";

export interface Contacts {
  //Here is the userdb
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber:string,
    email:string,
    isActive:boolean,
    image:string,
    role:number,
    updatedAt: string,
    imageFile:ImageFile
  }
import {ImageFile} from "./imageFile";
export interface User {
  id: string,
  username: string,
  firstName:string,
  lastName:string,
  phoneNumber:string,
  email: string,
  imageFile: ImageFile
}
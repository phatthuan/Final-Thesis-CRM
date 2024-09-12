import { ImageFile } from "src/app/user/imageFile";

export interface Item {
  id: string,
  name: string,
  description: string,
  sku:string,
  quantity:string,
  price:string,
  imageFile:ImageFile,
}
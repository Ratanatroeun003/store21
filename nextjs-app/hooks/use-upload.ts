
import { uploadImage as uploadToCloudinary } from "@/lib/cloudinary/client"
import { ItemImage } from "@/types/item"
import { useState } from "react"
export const useUpload = (initialImage:ItemImage[]=[])=>{
    const [images,setImages] = useState<ItemImage[]>(initialImage)
    const [error,setError] = useState<string | null>(null)
    const [loading,setLoading] = useState(false)
  const uploadImage = async(files:FileList | File[])=>{
    if (!files || files.length === 0) return
       setError("")
       setLoading(true)
         try {
         const fileArray = Array.from(files )
         const uploadRes = await Promise.all(fileArray.map(async(file)=>{
         const res = await uploadToCloudinary(file);
            return {
                url:res.url,
                public_id:res.public_id,
            }
        })  
        )
        setImages((prev)=> [...prev,...uploadRes])
        return ;
         } catch (error:any) {
            setError("upload fail")
         }
         finally{
            setLoading(false)
         }
  } 
   const removeImage=(public_id:string)=>{
   setImages((prev)=> prev.filter((img)=>img.public_id !==public_id ))
  }
  return {
    images,
    uploadLoading:loading,
    uploadImage,
    removeImage,
    uploadError:error
  }
}
import {ref} from "vue"
import {getDownloadURL, uploadBytesResumable, ref as storageReference} from "firebase/storage"
import {storage} from "@/firebase/config";

export const useStorage = () => {
    const uploadImage = async (folderName, file) => {
        const error = ref(null) // potential errors
        const filePath = ref('') // file path
        try {
            filePath.value = `${folderName}/${file.name}`// make file path by folderName and file name
            const storageRef = storageReference(storage, filePath.value) // link to the img
            const upload = await uploadBytesResumable(storageRef, file) // uploading the image to firebase
            return await getDownloadURL(upload.ref) // get from firebase URL link to the image
        } catch (err) {
            error.value = err.message
            return error.value
        }
    }
    return { uploadImage }
}
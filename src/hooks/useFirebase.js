import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import {useState} from 'react'
import slugify from 'slugify'

export default function useFirebase(setValue, getValues) {
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const storage = getStorage()

  const handleUploadImage = (file) => {
    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progressBar)
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            console.log('Nothing at all')
        }
      },
      (error) => {
        console.log('Error', error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setImage(downloadURL)
        })
      }
    )
  }

  const handleSelectImage = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setValue('image_name', file.name)
    handleUploadImage(file)
  }

  const handleDeleteImage = () => {
    const desertRef = ref(storage, 'images/' + getValues('image_name'))

    deleteObject(desertRef)
      .then(() => {
        setProgress(0)
        setImage('')
        console.log('Upload image success !!!')
      })
      .catch((error) => {
        console.log('Upload image fail', error)
      })
  }
  return {image, progress, setImage, handleSelectImage, handleDeleteImage}
}

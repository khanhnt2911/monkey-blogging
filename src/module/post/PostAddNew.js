import React, {useState} from 'react'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import {useForm} from 'react-hook-form'
import {Field, FieldCheckboxes} from 'components/field'
import {Input} from 'components/input'
import {Label} from 'components/label'
import ImageUpload from 'components/image/ImageUpload'
import {Dropdown} from 'components/dropdown'
import {Radio} from 'components/checkbox'
import {Button} from 'components/button'
import {postStatus} from 'utils/constants'
import slugify from 'slugify'
import useFirebase from 'hooks/useFirebase'
import Toggle from 'components/toggle/Toggle'
import {useEffect} from 'react'
import {db} from 'firebase-app/firebase-app'
import {collection, getDocs, query, where} from 'firebase/firestore'

const PostAddNew = () => {
  const [categories, setCategories] = useState([])

  const {control, isSubmitting, watch, setValue, handleSubmit, getValues} =
    useForm({
      mode: 'onChange',
      defaultValues: {
        status: 2,
        title: '',
        slug: '',
        categoryId: '',
        hot: false,
      },
    })
  const watchStatus = watch('status')
  const watchCategory = watch('category')
  const watchHot = watch('hot')

  const {image, progress, handleDeleteImage, handleSelectImage} = useFirebase(
    setValue,
    getValues
  )

  const addPostHandler = async (values) => {
    const cloneValues = {...values}
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.title)
    cloneValues.status = Number(cloneValues.status)
    console.log(cloneValues)
    // handleUploadImage(cloneValues.file);
  }

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, 'categories')
      const q = query(colRef, where('status', '==', 1))
      const querySnapshot = await getDocs(q)
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategories(result)
    }
    getData()
  }, [])

  return (
    <>
      <DashboardHeading
        title="Add post"
        desc="Add new post"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              className="h-[250px]"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category" />
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      onClick={() => {
                        setValue('categoryId', item.id)
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot}
              onClick={() => {
                setValue('hot', !watchHot)
              }}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
                control={control}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
                control={control}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
                control={control}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </>
  )
}

export default PostAddNew

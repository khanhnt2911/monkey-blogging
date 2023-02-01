import {Button} from 'components/button'
import {Radio} from 'components/checkbox'
import {Field, FieldCheckboxes} from 'components/field'
import {Input} from 'components/input'
import {Label} from 'components/label'
import {useAuth} from 'contexts/auth-context'
import {db} from 'firebase-app/firebase-app'
import {addDoc, collection} from 'firebase/firestore'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import slugify from 'slugify'
import {categoryStatus} from 'utils/constants'

const CategoryAddNew = () => {
  const {userInfo} = useAuth()
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 1,
      createAt: new Date(),
    },
  })

  const watchCategory = watch('status')

  useEffect(() => {
    document.title = 'Manage Add new category'
  }, [])

  const handleAddNewCategory = async (values) => {
    if (!isValid) return

    setLoading(true)
    const cloneValues = {...values}
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.name, {
      lower: true,
    })
    cloneValues.status = Number(cloneValues.status)

    const colRef = collection(db, 'categories')
    try {
      await addDoc(colRef, {
        ...cloneValues,
        userId: userInfo.uid,
      })
      console.log(cloneValues)
      toast.success('Create success!!!')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
      reset({
        title: '',
        slug: '',
        status: 1,
        createAt: new Date(),
      })
    }
  }

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleAddNewCategory)}
      >
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Enter your category name"
              required
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              name="slug"
              placeholder="Enter your slug"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                control={control}
                name="status"
                checked={Number(watchCategory) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchCategory) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  )
}

export default CategoryAddNew

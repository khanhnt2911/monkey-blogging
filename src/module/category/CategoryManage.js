import {ActionDelete, ActionEdit, ActionView} from 'components/action'
import {Button} from 'components/button'
import {LabelStatus} from 'components/label'
import {Loading} from 'components/loading'
import {Table} from 'components/table'
import {db} from 'firebase-app/firebase-app'
import {
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore'
import DashboardHeading from 'module/dashboard/DashboardHeading'
import React, {useEffect, useState} from 'react'
import {categoryStatus} from 'utils/constants'
import Swal from 'sweetalert2'

const CATEGORY_PER_PAGE = 10

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const colRef = collection(db, 'categories')
    onSnapshot(colRef, (snapshot) => {
      let results = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategoryList(results)
    })
  }, [])

  const categoryListLength = categoryList.length > 0

  const handleDelete = async (id) => {
    const colRef = doc(db, 'categories', id)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef)
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }
  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      >
        <Button
          height="60px"
          to="/manage/add-category"
        >
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          // onChange={handleInputFilter}
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* {categoryList.length <= 0 ? <Loading color="gray" /> : null} */}
          {categoryListLength &&
            categoryList.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <div className="text-sm italic text-gray-400">
                      {category.slug}
                    </div>
                  </td>
                  <td>
                    {category.status === categoryStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {category.status === categoryStatus.UNAPPROVED && (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <ActionView />
                      <ActionEdit />
                      <ActionDelete
                        onClick={() => {
                          handleDelete(category.id)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default CategoryManage

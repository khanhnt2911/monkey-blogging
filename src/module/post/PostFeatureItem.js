import styled from 'styled-components'
import slugify from 'slugify'
import React, {useEffect, useState} from 'react'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import PostImage from './PostImage'
import PostCategory from './PostCategory'
import {doc, getDoc} from 'firebase/firestore'
import {db} from 'firebase-app/firebase-app'

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`
const PostFeatureItem = (props) => {
  const {data} = props

  const [category, setCategory] = useState('')
  const [user, setUser] = useState()
  useEffect(() => {
    async function getCategory() {
      const docRef = doc(db, 'categories', data.categoryId)
      const docSnap = await getDoc(docRef)
      setCategory(docSnap.data())
    }
    getCategory()
  }, [data.categoryId])

  useEffect(() => {
    async function getUser() {
      const docRef = doc(db, 'users', data.userId)
      const docSnap = await getDoc(docRef)
      setUser(docSnap.data())
    }
    getUser()
  }, [data.userId])
  const date = data?.createAt?.seconds
    ? new Date(data?.createAt?.seconds * 1000)
    : new Date()
  const formatDate = new Date(date).toLocaleDateString('vi-VI')

  if (!data || !data.id) return null

  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} />

      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            authorName={user?.fullname}
            to={slugify(user?.fullname || '', {lower: true})}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle
          size="big"
          to={data.slug}
        >
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  )
}
// Example of error boundary
export default PostFeatureItem

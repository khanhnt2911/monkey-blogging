import Heading from 'components/layout/Heading'
import {useAuth} from 'contexts/auth-context'
import {db} from 'firebase-app/firebase-app'
import {collection, getDocs, query, where} from 'firebase/firestore'
import {result} from 'lodash'
import PostFeatureItem from 'module/post/PostFeatureItem'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const HomeFeatureStyles = styled.div``

const HomeFeature = () => {
  const {userInfo} = useAuth()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPost() {
      const colRef = collection(db, 'posts')
      const q = query(colRef, where('userId', '==', userInfo?.uid))
      const result = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setPosts(result)
    }
    getPost()
  }, [userInfo?.uid])

  if (posts.length <= 0) return null
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem
              key={post.id}
              data={post}
            />
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  )
}

export default HomeFeature

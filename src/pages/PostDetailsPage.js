import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PostRelated from "module/post/PostRelated";
import PostMeta from "module/post/PostMeta";
import PostImage from "module/post/PostImage";
import PostCategory from "module/post/PostCategory";
import PageNotFound from "./PageNotFound";
import Layout from "components/layout/Layout";
import AuthorBox from "components/author/AuthorBox";
import { Link, useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { userRole } from "utils/constants";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  // const { slug } = useParams();
  // const [postInfo, setPostInfo] = useState({});
  // useEffect(() => {
  //   async function fetchData() {
  //     if (!slug) return;
  //     const colRef = query(collection(db, "posts"), where("slug", "==", slug));
  //     onSnapshot(colRef, (snapshot) => {
  //       snapshot.forEach((doc) => {
  //         doc.data() &&
  //           setPostInfo({
  //             id: doc.id,
  //             ...doc.data(),
  //           });
  //       });
  //     });
  //   }
  //   fetchData();
  // }, [slug]);
  // useEffect(() => {
  //   document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  // }, [slug]);
  // const { userInfo } = useAuth();
  // if (!slug) return <PageNotFound></PageNotFound>;
  // if (!postInfo.title) return null;
  // const { user } = postInfo;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={
                "https://images.unsplash.com/photo-1673269595891-b92b2fa6edd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">Kiến thức</PostCategory>
              <h1 className="post-heading">Tien khanh</h1>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <AuthorBox userId={"tienkhanh"}></AuthorBox>
          </div>
          <PostRelated></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;

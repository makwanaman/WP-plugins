import React, { useEffect } from "react";
import SingleBlog from "../../view/single-blog/index";
import { useRouter } from "next/router";
const Index = (data) => {
  const router = useRouter();
  // blog-articles
  return (
    <>
      <SingleBlog slug={router.query.slug} blogData={data?.data?.data} />
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    let singleBlog = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blog-detail/${context.query.slug}`
    );
    let singleData = await singleBlog.json();
    return {
      props: {
        data: singleData,
      },
    };
  } catch (err) {
    return {
      props: {
        data: "",
      },
    };
  }
}
export default Index;

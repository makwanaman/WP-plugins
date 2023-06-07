import React from "react";
import MySeoList from "../../view/my-seo-list/index";
const Index = (data) => {
 
  return (
    <>
      <MySeoList seoList={data?.data?.data} />
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const { req, res } = context;

    if (!req.cookies.access_token) {
      let slugData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/wpfavs-single/${context.query.slug}`
      );
      let wpFavsData = await slugData.json();

      return {
        props: {
          data: wpFavsData,
        },
      };
    } else {
      let slugData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/my-wpfavs-single/${context.query.slug}`,
        {
          headers: {
            Authorization: req.cookies.access_token,
          },
        }
      );
      let wpFavsData = await slugData.json();

      return {
        props: {
          data: wpFavsData,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        data: "",
      },
    };
  }
}

export default Index;

import React from "react";
import PageBuilders from "../../view/page-builders/index";
import axios from "axios";
const Index = (data) => {
  return (
    <>
      <PageBuilders singleCategory={data?.data?.data} />
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    let singleCategory = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wpfavs-category-single/${context.query.slug}`
    );
    let category = await singleCategory.json();
    return {
      props: {
        data: category,
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

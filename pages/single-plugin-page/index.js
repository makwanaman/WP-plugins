import React from "react";
import Main from "../../components/layout/Main";
import SinglePluginPage from "../../view/single-plugin-page/index";
import { useRouter } from "next/router";
const Index = (data) => {
  const router = useRouter();

  return (
    <>
      <Main>
        <SinglePluginPage pluginData={data?.data} slug={router.query.slug} />
      </Main>
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    let singleCategory = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/plugin-single/${context.query.slug}`
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

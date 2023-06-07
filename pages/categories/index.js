import React from "react";
import Categories from "../../view/categories/index";
const index = ({ topCategory }) => {
 
  return (
    <>
      <Categories topCategory={topCategory?.data} />
    </>
  );
};

export async function getServerSideProps() {
  try {
    let topCategories = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/top-categories-list`
    );
    let topCategory = await topCategories.json();
    return {
      props: {
        topCategory,
      },
    };
  } catch (err) {
    return { props: {} };
  }
}
export default index;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import WPLogo from "../../public/wp-logo.png";
import Devider from "../../components/Devider";
import { useRouter } from "next/router";
import cookie from "js-cookie";
const Favs = () => {
  const router = useRouter();

  const createListFunction = () => {
    let access_token = cookie.get("access_token");
    if (!access_token) {
      router.push("/signin");
    } else {
      router.push(`/new-WPfavs`);
    }
  };

  return (
    <>
      <section className="favs-sec sec-pd">
        <div className="container">
          <div className="row row-content mob-flex">
            <div className="col-lg-6">
              <div className="hero-left mob-text-center">
                <div className="">
                  <h1 className="mb-4">
                    What is <span className="primary-text">WP FAVS? </span>
                  </h1>
                </div>
                <Devider />
                <p className="hero-text">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  fugit, sed accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni ratione voluptatem sequi.
                </p>
                {/* <Link href="/" > */}
                <button
                  onClick={createListFunction}
                  type="button"
                  className="btn btn-primary search-btn mob-full-wd"
                >
                  Create List for FREE
                </button>
                {/* </Link> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-right">
                <div className="wp-img border-bg">
                  <Image src={WPLogo} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favs;

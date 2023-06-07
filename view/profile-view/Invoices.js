import React, { useEffect, useState } from "react";
import Devider from "../../components/Devider";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { toast } from "react-toastify";
import commonFunction from "../../commonFunction/commonFunction";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
const Invoices = (data) => {
  const [invoiceData, setInvoiceData] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const getAllInvoiceList = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token && data?.stripeCustomerId) {
        setLoaderState(true);
        const invoiceResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/invoices`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setInvoiceData(invoiceResponse?.data?.data);
        setLoaderState(false);
      }
    } catch (Err) {
      setLoaderState(false);
    }
  };

  useEffect(() => {
    getAllInvoiceList();
  }, [data?.stripeCustomerId]);

  return (
    <>
      <div className="invoices-tab">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <h4 className="">Invoices</h4>
        <div className="user-profile-devider">
          <Devider />
        </div>
        <p className="f-18">Billing History</p>
        <div className="mbo-table-responsive">
          <table className="invoice-table w-100 f-14">
            <thead>
              <tr className="table-head text-fade font-wt-300">
                <th>DATE</th>
                <th>DETAILS</th>
                <th>AMOUNT</th>
                <th>DOWNLOAD</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.map((invoicelist) => {
                return (
                  <tr>
                    <td>{commonFunction(invoicelist?.created)}</td>
                    <td>{invoicelist?.lines?.data[0].description}</td>
                    <td>${invoicelist?.total}</td>

                    <td className="primary-text">
                      <a href={invoicelist?.invoice_pdf} target="_blank">
                        Invoice{" "}
                        {commonFunction(
                          invoicelist?.lines?.data[0].period?.start
                        )}{" "}
                        -{" "}
                        {commonFunction(
                          invoicelist?.lines?.data[0].period?.end
                        )}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {invoiceData === undefined ? (
            <p className="notfound">No invoices found for this account.</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Invoices;

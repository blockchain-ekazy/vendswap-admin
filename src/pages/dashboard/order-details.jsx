import { Card, CardBody, Button, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { UserAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

import { ethers } from "ethers";

import { toast } from "react-toastify";
import { usdt, usdtAMOUNT, vendswap } from "@/blockchain/config";
import vendswapAbi from "@/blockchain/vendswap.abi.json";
import usdtAbi from "@/blockchain/usdt.abi.json";
import { ordersOverviewData } from "@/data";
import {
  ArrowDownOnSquareStackIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  QrCodeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export function OrderDetails() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    progress: { stages: [{}] },
    "Buyer Wallet": "",
    "Seller Wallet": "",
    "Escrow Tx": "",
    "Devices Serials Seller": [],
    "Devices Serials Buyer": [],
  });

  useEffect(() => {
    getOrder();
  }, []);

  async function getOrder() {
    let id = new URLSearchParams(window.location.search).get("id");

    let res;
    try {
      res = (await getDoc(doc(db, "orders", id))).data();
    } catch (e) {
      console.log(e);
    }

    delete res["Admin Signature"];

    setOrder(res);
  }

  return (
    <>
      <Card className="mx-3 mt-8 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <Typography variant="h6" color="blue-gray">
            Order# {order.id}
          </Typography>
          <div className="mb-12 mt-3 grid grid-cols-12">
            <div className="col-span-8 grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Progress:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.status}%
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Order Created:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Order Created"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Are you able to provide the Swap escrow?
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Are you able to provide the Swap escrow?"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  What's your monthly revenue per device?
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  ${order["What's your monthly revenue per device?"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Are you able to provide the Swap escrow?
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Are you able to provide the Swap escrow?"]}
                </Typography>
              </div>

              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Escrow Paid at:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Escrow Paid"]}
                </Typography>
              </div>

              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Seller Claimed Escrow at:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Seller Claimed Escrow"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Admin Confirmation at:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Admin Confirmation"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Buyer Claimed Escrow at:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Buyer Claimed Escrow"]}
                </Typography>
              </div>

              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Buyer Wallet:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  <a
                    className="font-semibold underline"
                    target="_blank"
                    href={
                      "https://goerli.etherscan.io/address/" +
                      order["Buyer Wallet"]
                    }
                  >
                    {order["Buyer Wallet"].substring(0, 6)}....
                    {order["Buyer Wallet"].substring(
                      order["Buyer Wallet"].length - 6,
                      order["Buyer Wallet"].length
                    )}
                  </a>
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Do you have a current escrow provider?
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Do you have a current escrow provider?"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Buyer Email:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Buyer Email"]}
                </Typography>
              </div>

              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Seller:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["seller"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Seller Wallet:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  <a
                    className="font-semibold underline"
                    target="_blank"
                    href={
                      "https://goerli.etherscan.io/address/" +
                      order["Seller Wallet"]
                    }
                  >
                    {order["Seller Wallet"].substring(0, 6)}....
                    {order["Seller Wallet"].substring(
                      order["Seller Wallet"].length - 6,
                      order["Seller Wallet"].length
                    )}
                  </a>
                </Typography>
              </div>

              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Are you using Cantaloupe or Nayax or other?
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Are you using Cantaloupe or Nayax or other?"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Pos Account Number:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Pos Account Number"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Escrow Paid:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Escrow Paid"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Escrow Tx:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  <a
                    className="font-semibold underline"
                    href={
                      "https://goerli.etherscan.io/tx/" + order["Escrow Tx"]
                    }
                    target="_blank"
                  >
                    {order["Escrow Tx"].substring(0, 6)}....
                    {order["Escrow Tx"].substring(
                      order["Escrow Tx"].length - 6,
                      order["Escrow Tx"].length
                    )}
                  </a>
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Escrow Amount:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {parseInt(order["Escrow Amount"] / 1e18)}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Devices Serials Added by Seller at:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Devices Serials Seller"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Devices Serials Seller:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Devices Serials Seller"] &&
                    order["Devices Serials Seller"].map((s) => {
                      return (
                        <>
                          {s}
                          <br />
                        </>
                      );
                    })}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Devices Serials Added by Buyer at:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order.progress.stages["Devices Serials Buyer"]}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Devices Serials Buyer:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Devices Serials Buyer"] &&
                    order["Devices Serials Buyer"].map((s) => {
                      return (
                        <>
                          {s}
                          <br />
                        </>
                      );
                    })}
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Seller Amount:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Seller Amount"] / 1e6} USDT
                </Typography>
              </div>
              <div className="grid grid-cols-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold capitalize"
                >
                  Buyer Amount:
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {order["Buyer Amount"] / 1e6} USDT
                </Typography>
              </div>
            </div>
            <div className="col-span-4">
              <CardBody className="pt-0">
                <Typography variant="h6" color="white" className="text-black">
                  Progress:
                </Typography>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-4/6 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <PlusCircleIcon className="!h-5 !w-5 text-green-600" />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Swap Created
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {order.progress.stages["Order Created"]}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-4/6 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <QrCodeIcon
                      className={`!h-5 !w-5 ${
                        order.progress.stages["Devices Serials Seller"] ==
                        "Incomplete"
                          ? "text-blue-gray-500"
                          : "text-green-600"
                      } `}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Device Serials from Seller
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {order.progress.stages["Devices Serials Seller"] ==
                        "Incomplete" &&
                      user.uid == order.user &&
                      order.progress.status == "10" ? (
                        <Button
                          variant="filled"
                          size="sm"
                          onClick={() => {
                            navigate(
                              "/dashboard/swap-confirmation?id=" + order.id
                            );
                          }}
                          className="block"
                        >
                          Input Device Serials
                        </Button>
                      ) : (
                        order.progress.stages["Devices Serials Seller"]
                      )}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-4/6 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <CurrencyDollarIcon
                      className={`!h-5 !w-5 ${
                        order.progress.stages["Escrow Paid"] == "Incomplete"
                          ? "text-blue-gray-500"
                          : "text-green-600"
                      } `}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Escrow Paid by Seller
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {order.progress.stages["Escrow Paid"] == "Incomplete" &&
                      user.uid == order.user &&
                      order.progress.status == "25" ? (
                        <Button variant="filled" size="sm" className="block">
                          Pay ESCROW
                        </Button>
                      ) : (
                        order.progress.stages["Escrow Paid"]
                      )}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-4/6 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <QrCodeIcon
                      className={`!h-5 !w-5 ${
                        order.progress.stages["Devices Serials Buyer"] ==
                        "Incomplete"
                          ? "text-blue-gray-500"
                          : "text-green-600"
                      } `}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Device Serials from Buyer
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {order.progress.stages["Devices Serials Buyer"] ==
                        "Incomplete" &&
                      user.email == order["Buyer Email"] &&
                      order.progress.status == "40" ? (
                        <Button
                          variant="filled"
                          size="sm"
                          onClick={() => {
                            navigate(
                              "/dashboard/swap-confirmation?id=" + order.id
                            );
                          }}
                          className="block"
                        >
                          Input Device Serials
                        </Button>
                      ) : (
                        order.progress.stages["Devices Serials Buyer"]
                      )}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-4/6 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <UserCircleIcon
                      className={`!h-5 !w-5 ${
                        order.progress.stages["Admin Confirmation"] ==
                        "Incomplete"
                          ? "text-blue-gray-500"
                          : "text-green-600"
                      } `}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Admin Confirmation
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {order.progress.stages["Admin Confirmation"] ==
                        "Incomplete" &&
                      user.email == "admin@gmail.com" &&
                      order.progress.status == "55" ? (
                        <Button
                          variant="filled"
                          size="sm"
                          onClick={() => {
                            navigate(
                              "/dashboard/swap-confirmation?id=" + order.id
                            );
                          }}
                          className="block"
                        >
                          Sign Amount
                        </Button>
                      ) : (
                        order.progress.stages["Admin Confirmation"]
                      )}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-4/6 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <ArrowDownOnSquareStackIcon
                      className={`!h-5 !w-5 ${
                        order.progress.stages["Buyer Claimed Escrow"] ==
                        "Incomplete"
                          ? "text-blue-gray-500"
                          : "text-green-600"
                      } `}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Buyer Claimed Escrow
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {order.progress.stages["Buyer Claimed Escrow"] ==
                        "Incomplete" &&
                      user.email == order["Buyer Email"] &&
                      order.progress.status >= "70" ? (
                        <Button
                          variant="filled"
                          size="sm"
                          // onClick={() => {
                          //   navigate(
                          //     "/dashboard/swap-confirmation?id=" + order.id
                          //   );
                          // }}
                          className="block"
                        >
                          Claim Escrow
                        </Button>
                      ) : (
                        <>
                          {order.progress.stages["Buyer Claimed Escrow"]}
                          {order["Buyer Claimed Escrow Amount"]}
                        </>
                      )}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-3">
                  <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:h-0 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']">
                    <CircleStackIcon
                      className={`!h-5 !w-5 ${
                        order.progress.stages["Seller Claimed Escrow"] ==
                        "Incomplete"
                          ? "text-blue-gray-500"
                          : "text-green-600"
                      } `}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      Seller Claimed Escrow
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {/* {order.progress.stages["Seller Claimed Escrow"]} */}

                      {order.progress.stages["Seller Claimed Escrow"] ==
                        "Incomplete" &&
                      user.uid == order.user &&
                      order.progress.status >= "70" ? (
                        <Button
                          variant="filled"
                          size="sm"
                          onClick={() => {
                            navigate(
                              "/dashboard/swap-confirmation?id=" + order.id
                            );
                          }}
                          className="block"
                        >
                          Withdraw
                        </Button>
                      ) : (
                        order.progress.stages["Seller Claimed Escrow"]
                      )}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default OrderDetails;

// for admin

// "Device Serial Numbers": (
//   <>
//     {order["Device Serial Numbers"] ? (
//       <ol>
//         {order["Device Serial Numbers"].map(
//           (value, index) => {
//             return (
//               <li>
//                 <Typography
//                   variant="small"
//                   className="font-normal text-blue-gray-500"
//                 >
//                   {value}
//                 </Typography>
//               </li>
//             );
//           }
//         )}
//       </ol>
//     ) : (
//       ""
//     )}
//   </>
// ),

// const signtest = async () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   let m = await provider.send("eth_requestAccounts", []);
//   m = m[0];

//   const signer = provider.getSigner();

//   let message1 = ethers.utils.solidityPack(
//     ["string", "uint256", "uint256"],
//     ["2", 5, 15]
//   );

//   message1 = ethers.utils.solidityKeccak256(["bytes"], [message1]);
//   const signature1 = await signer.signMessage(
//     ethers.utils.arrayify(message1)
//   );
//   console.log(signature1);
// };

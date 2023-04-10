import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  Option,
  Typography,
  Radio,
} from "@material-tailwind/react";

import { QrCodeIcon, XCircleIcon } from "@heroicons/react/24/outline";

import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

import { ethers } from "ethers";

import { toast } from "react-toastify";
import { usdt, usdtAMOUNT, vendswap } from "@/blockchain/config";
import vendswapAbi from "@/blockchain/vendswap.abi.json";
import usdtAbi from "@/blockchain/usdt.abi.json";

export function OrderConfirmation() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [buyerAmount, setBuyerAmount] = useState();
  const [sellerAmount, setSellerAmount] = useState();

  useEffect(() => {
    getOrder();
  }, []);

  async function getOrder() {
    let id = new URLSearchParams(window.location.search).get("id");

    let res = await getDoc(doc(db, "orders", id));
    setOrder(res.data());
  }

  const sign = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let m = await provider.send("eth_requestAccounts", []);
    m = m[0];

    const signer = provider.getSigner();

    let message1 = ethers.utils.solidityPack(
      ["string", "uint256", "uint256"],
      [order.id, String(buyerAmount * 1e6), String(sellerAmount * 1e6)]
    );

    message1 = ethers.utils.solidityKeccak256(["bytes"], [message1]);
    const signature1 = await signer.signMessage(
      ethers.utils.arrayify(message1)
    );

    order.signature = signature1;
    order.progress.stages["Admin Confirmation"] = new Date(
      Date.now()
    ).toLocaleString();
    order.progress.status += 15;
    order["Seller Amount"] = sellerAmount * 1e6;
    order["Buyer Amount"] = buyerAmount * 1e6;

    try {
      const docRef = doc(db, "orders", String(order.id));
      await updateDoc(docRef, order).then(() => {
        console.log("Update done");
        toast.success("Amounts Sign Successful");
        navigate("/dashboard/swap-details?id=" + order.id);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card className="mx-3 mt-8 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="number"
              label={"Enter Buyer Withdraw Amount (USDT)"}
              size="lg"
              value={buyerAmount}
              onChange={(e) => setBuyerAmount(e.target.value)}
            />
            <Input
              type="number"
              label={"Enter Seller Withdraw Amount (USDT)"}
              size="lg"
              value={sellerAmount}
              onChange={(e) => setSellerAmount(e.target.value)}
            />

            <div>
              <Button
                variant="outlined"
                size="md"
                onClick={() => navigate("/dashboard/swap")}
                className="mx-1"
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                size="md"
                onClick={async () => {
                  sign();
                }}
                className="mx-1"
              >
                Submit
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default OrderConfirmation;

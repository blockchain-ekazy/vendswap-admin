import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function SignIn() {
  const { signIn, isLoggedIn } = UserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await signIn(email, password);
      navigate("/dashboard/swap");
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    check_login_status();
  }, []);

  const check_login_status = async () => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/80" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 pt-5">
          <img src="./img/logo.png" />
          <Typography
            variant="h3"
            color="white"
            className="text-center text-black"
          >
            Sign In
          </Typography>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign In
            </Button>
            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;

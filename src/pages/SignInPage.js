import { Button } from "components/button";
import { Field } from "components/field";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-app";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "contexts/auth-context";
import Authentication from "./Authentication";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const SignInStyled = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .form {
    width: 600px;
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .label {
    display: inline-block;
    color: ${(props) => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
  }
`;

const schema = yup.object({
  email: yup
    .string()
    .email("Enter type email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Password must be 8 character")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "Sign in page";
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        toast.success("Sign-up success!!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <Authentication>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field className="field">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            control={control}
            placeholder="Enter your email"
          />
        </Field>
        <Field className="field">
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You had not an account ?{" "}
          <NavLink to={"/sign-up"}>Register an account</NavLink>{" "}
        </div>
        <Button
          type="submit"
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
          }}
          kind="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </form>
    </Authentication>
  );
};

export default SignInPage;

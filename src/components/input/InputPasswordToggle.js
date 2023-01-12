import { Field } from "components/field";
import { Label } from "components/label";
import React, { Fragment, useState } from "react";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "components/icon";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        control={control}
        placeholder="Enter your password"
        hasIcon
      >
        {togglePassword ? (
          <IconEyeOpen
            className="input-icon"
            onClick={() => {
              setTogglePassword(!togglePassword);
            }}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            className="input-icon"
            onClick={() => {
              setTogglePassword(!togglePassword);
            }}
          ></IconEyeClose>
        )}{" "}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;

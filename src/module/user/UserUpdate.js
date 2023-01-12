import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { Textarea } from "components/textarea";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";

const UserUpdate = () => {
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user information"
      ></DashboardHeading>
      <form
      // onSubmit={handleSubmit(handleUpdateUser)}
      >
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          {/* <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload> */}
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input name="fullname" placeholder="Enter your fullname"></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input name="username" placeholder="Enter your username"></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio name="status">Active</Radio>
              <Radio name="status">Pending</Radio>
              <Radio name="status">Banned</Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio name="role">Admin</Radio>
              <Radio name="role">Moderator</Radio>
              <Radio name="role">User</Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea name="description"></Textarea>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          // isLoading={isSubmitting}
          // disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;

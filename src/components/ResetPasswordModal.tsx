import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppToast } from "../hooks/useAppToast";
import { generatePassword } from "./utils";
import { resetPassword } from "../features/user/userSlice";
import { useAppDispatch } from "../hooks/redux";

type ResetPasswordFormValues = {
  username: string;
  password: string;
  confirmedPassword: string;
};

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResetPasswordModal({
  isOpen,
  onClose,
}: ResetPasswordModalProps) {
  const [resetPasswordPending, setResetPasswordPending] = useState(false);
  const form = useForm<ResetPasswordFormValues>({ mode: "all" });
  const { register, handleSubmit, formState, getValues, setValue } = form;
  const { success } = useAppToast();
  const dispatch = useAppDispatch();

  const onSubmit = (formValues: ResetPasswordFormValues) => {
    setResetPasswordPending(true);
    dispatch(resetPassword(formValues))
      .unwrap()
      .then(() => {
        success("Password reset successfully!");
        onClose();
      })
      .catch((error) => {
        error("Error resetting password");
      })
      .finally(() => {
        setResetPasswordPending(false);
      });
  };

  const setSystemGeneratedPassword = () => {
    const password = generatePassword();
    setValue("password", password);
    setValue("confirmedPassword", password);
  };

  const { errors } = formState;

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Reset Password</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <form id="reset-password" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
              </div>
              <p className="help is-danger">{errors.username?.message}</p>
            </div>
            <div className="field">
              <label className="label">New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="New Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
              </div>
              <p className="help is-danger">{errors.password?.message}</p>
            </div>
            <div className="field">
              <label className="label">Confirm New Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm New Password"
                  {...register("confirmedPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
              </div>
              <p className="help is-danger">
                {errors.confirmedPassword?.message}
              </p>
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="button"
                  className="button is-small is-info is-light"
                  onClick={setSystemGeneratedPassword}
                >
                  Generate Password
                </button>
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <div className="buttons">
            <button className="button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              form="reset-password"
              className={`button is-success ${
                resetPasswordPending ? "is-loading" : ""
              }`}
              onClick={handleSubmit(onSubmit)}
            >
              Reset Password
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

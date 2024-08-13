import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signUp } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { globalToastOptions } from "../notifications";

type FormValues = {
  username: string;
  password: string;
  confirmedPassword: string;
};

export function SignUp() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, getValues } = form;
  const navigate = useNavigate();
  const { loading, isSignedUp } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isSignedUp) {
      navigate("/login");
    }
  });
  const dispatch = useAppDispatch();

  const onSubmit = (formValues: FormValues) => {
    dispatch(
      signUp({
        username: formValues.username,
        password: formValues.confirmedPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(
          `Congratulations ${formValues.username}, you have successfully signed up!`,
          globalToastOptions
        );
      }).catch(() => toast.error("There was error signing you up, note that username must be unique", globalToastOptions));
  };

  const { errors } = formState;

  return (
    <div className="box ">
      <div className="block">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-rounded"
                type="text"
                placeholder="Username"
                id="username"
                {...register("username", {
                  required: {
                    message: "Username is required",
                    value: true,
                  },
                  min: {
                    value: 3,
                    message: "Username length must be 3 characters or more",
                  },
                })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <p className="help is-danger">{errors.username?.message}</p>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-rounded"
                type="password"
                placeholder="Password"
                id="password"
                {...register("password", {
                  required: {
                    message: "Password is required",
                    value: true,
                  },
                  min: {
                    value: 8,
                    message: "Password length should be more than 7 characters",
                  },
                  pattern: {
                    value: /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/,
                    message:
                      "Password must contain atleast one numeric character and one uppercase letter and no special characters",
                  },
                })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </div>
            <p className="help is-danger">{errors.password?.message}</p>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-rounded"
                type="password"
                placeholder="Confirm Password"
                id="confirmedPassword"
                {...register("confirmedPassword", {
                  required: {
                    message: "Field is required",
                    value: true,
                  },
                  validate: {
                    matchesPasswordField: (fieldValue: string) => {
                      return (
                        fieldValue === getValues("password") ||
                        "Passwords do not match"
                      );
                    },
                  },
                })}
              />
              <span className="icon is-small is-left">
                <i className="far fa-check-square"></i>
              </span>
            </div>
            <p className="help is-danger">
              {errors.confirmedPassword?.message}
            </p>
          </div>
          <div className="field">
            <div className="buttons is-centered">
              <button
                type="submit"
                className={`button is-white ${loading ? "is-loading" : ""}`}
                id="login"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
        <DevTool control={control} />
        <div className="field">
          <div className="buttons is-right">
            <button
              className="button is-ghost"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

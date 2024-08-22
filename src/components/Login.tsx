import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signIn } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { globalToastOptions } from "../notifications";

type FormValues = {
  username: string;
  password: string;
};

export function Login() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { isLoggedIn, username, loading } = useAppSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = (formValues: FormValues) => {
    dispatch(signIn(formValues))
      .unwrap()
      .then(() => {
        toast.success(`Successfully logged in!`, globalToastOptions);
      })
      .catch(() => {
        toast.error("Invalid user credentials", globalToastOptions);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/${username.toLocaleLowerCase()}/budgets`, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const { errors } = formState;

  return (
    <div className="section">
      <div className="box ">
        <div className="block">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                      message:
                        "Password length should be more than 7 characters",
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
              <div className="buttons is-centered">
                <button
                  type="submit"
                  className={`button is-white ${loading ? "is-loading" : ""}`}
                  id="login"
                >
                  Login
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
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
              <button
                className="button is-text"
                onClick={() => {
                  toast.warn("We don't have this capability yet", globalToastOptions)
                }}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

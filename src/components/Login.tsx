import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signIn } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppToast } from "../hooks/useAppToast";

type FormValues = {
  username: string;
  password: string;
};

export function Login() {
  const form = useForm<FormValues>({ mode: "all" });
  const { register, handleSubmit, formState } = form;
  const { isLoggedIn, username, loading } = useAppSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const { success, error, warn } = useAppToast();

  const dispatch = useAppDispatch();

  const onSubmit = (formValues: FormValues) => {
    dispatch(signIn(formValues))
      .unwrap()
      .then(() => {
        success(`Successfully logged in!`);
      })
      .catch(() => {
        error("Invalid user credentials");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/${username.toLocaleLowerCase()}/budgets`, { replace: true });
    }
  }, [isLoggedIn, navigate, username]);

  const { errors } = formState;

  return (
    <div className="section">
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
                    validate: {
                      minLength: (fieldValue: string) => {
                        return (
                          fieldValue.length > 3 ||
                          "Username length must be 3 characters or more"
                        );
                      },
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
                    validate: {
                      minLength: (fieldValue: string) => {
                        return (
                          fieldValue.length > 7 ||
                          "Password length should be more than 7 characters"
                        );
                      },
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
                  warn("We don't have this capability yet");
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

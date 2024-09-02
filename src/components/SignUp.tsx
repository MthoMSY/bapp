import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signUp } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppToast } from "../hooks/useAppToast";

type FormValues = {
  username: string;
  password: string;
  confirmedPassword: string;
};

export function SignUp() {
  const form = useForm<FormValues>();
  const { success, error } = useAppToast();
  const { register, control, handleSubmit, formState, getValues } = form;
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.user);
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
        success(
          `Congratulations ${formValues.username}, you have successfully signed up!`
        );
        navigate("/login");
      })
      .catch(() =>
        error(
          "There was an error signing you up."
        )
      );
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
                    message: "Password length should be at least 8 characters long",
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

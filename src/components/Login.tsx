import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch } from "../hooks/redux";
import { signIn } from "../features/user/userSlice";

type FormValues = {
  username: string;
  password: string;
};

export function Login() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;

  const dispatch = useAppDispatch();

  const onSubmit = (formValues: FormValues) => {
    dispatch(signIn(formValues));
  };

  const { errors } = formState;

  return (
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
                    message: "Password length should be more than 7 characters",
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
              <button type="submit" className="button is-white" id="login">
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
                console.log("Sign up");
              }}
            >
              Sign Up
            </button>
            <button
              className="button is-text"
              onClick={() => {
                console.log("Forgot my password");
              }}
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

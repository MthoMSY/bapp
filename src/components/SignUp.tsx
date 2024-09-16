import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { signUp } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppToast } from "../hooks/useAppToast";
import { getIsLoadingClassName } from "./utils";
import "./SignUp.css";

type FormValues = {
  username: string;
  password: string;
  confirmedPassword: string;
};

export function SignUp() {
  const form = useForm<FormValues>({ mode: "all" });
  const { success, error } = useAppToast();
  const { register, handleSubmit, formState, getValues, setValue } = form;
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const minLengthValidation = (fieldValue: string, min: number): boolean => {
    return fieldValue.length >= min;
  };

  const maxLengthValidation = (fieldValue: string): boolean => {
    return fieldValue.length < 21;
  };

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
      .catch(() => error("There was an error signing you up."));
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 9; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setValue("password", password);
    setValue("confirmedPassword", password);
  };

  const { errors } = formState;

  return (
    <div className="section">
      <div className="box">
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
                          minLengthValidation(fieldValue, 3) ||
                          "Username length should be at least 3 characters long"
                        );
                      },
                      maxLength: (fieldValue: string) => {
                        return (
                          maxLengthValidation(fieldValue) ||
                          "Password length must be less than 21 characters"
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
                          minLengthValidation(fieldValue, 8) ||
                          "Password length should be at least 8 characters long"
                        );
                      },
                      maxLength: (fieldValue: string) => {
                        return (
                          maxLengthValidation(fieldValue) ||
                          "Password length must be less than 21 characters"
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
              <div className="control">
                <button
                  type="button"
                  className="button is-small is-info is-light"
                  onClick={generatePassword}
                >
                  Generate Password
                </button>
              </div>
            </div>
            <div className="field">
              <div className="buttons is-centered">
                <button
                  type="submit"
                  className={`button is-white ${getIsLoadingClassName(
                    loading
                  )}`}
                  id="login"
                >
                  SignUp
                </button>
              </div>
            </div>
          </form>
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
    </div>
  );
}

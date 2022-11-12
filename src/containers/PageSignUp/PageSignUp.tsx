import React, { FC } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PATTERN } from "contains/contants";
import { registerForCustomer } from "redux/slices/authSlice";

export interface PageSignUpProps {
  className?: string;
}

type InputsType = {
  email: string;
  password: string;
};

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Continue with Twitter",
//     href: "#",
//     icon: twitterSvg,
//   },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InputsType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onRegister: SubmitHandler<InputsType> = async (data: InputsType) => {
    const response = await dispatch(registerForCustomer(data));
    switch (response.payload) {
      case "EMAIL_EXISTS":
        setError("email", {
          type: "email_exists",
          message: "Tài khoản đã được đăng ký rồi bạn ơi",
        });
        break;
      case "Password phải từ 8 kí tự trở lên":
        setError("password", {
          type: "invalid_password",
          message: "Mật khẩu phải từ 8 kí tự trở lên nha bạn ơi",
        });
        break;
      default:
        navigate("/login");
        break;
    }
  };
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title> Đăng kí UTEtravel | Du lịch trong tầm tay</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Đăng kí
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onRegister)}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: "Email không được bỏ trống nha bạn ơi !",
                  },
                  pattern: {
                    value: PATTERN.EMAIL,
                    message:
                      " Email không đúng định dạng. Bạn vui lòng nhập lại nha !",
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className={`mt-1 ${
                      errors.email && "border-red-400 dark:border-red-400"
                    }`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email?.type === "required" && (
                <small className="text-red-500 dark:text-red-500">{` ${errors.email.message}`}</small>
              )}
              {errors.email?.type === "pattern" && (
                <small className="text-red-500 dark:text-red-500">{` ${errors.email.message}`}</small>
              )}
              {errors.email?.type === "email_exists" && (
                <small className="text-red-500 dark:text-red-500">{` ${errors.email.message}`}</small>
              )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Mật khẩu
              </span>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: {
                    value: true,
                    message: "Mật khẩu không được bỏ trống nha bạn ơi !",
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="password"
                    className={`mt-1 ${
                      errors.password && "border-red-400 dark:border-red-400"
                    }`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password?.type === "required" && (
                <small className="text-red-500">{` ${errors.password.message}`}</small>
              )}
              {errors.password?.type === "invalid_password" && (
                <small className="text-red-500">{` ${errors.password.message}`}</small>
              )}
            </label>
            <ButtonPrimary type="submit">Đăng kí</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Bạn đã có tài khoản ? {` `}
            <Link to="/login">Đăng nhập nào</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;

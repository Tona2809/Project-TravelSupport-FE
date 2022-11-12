import React, { FC, useState } from "react";
// import facebookSvg from "images/Facebook.svg";
// import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PATTERN } from "contains/contants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { login } from "redux/slices/authSlice";

export interface PageLoginProps {
  className?: string;
}
type InputsType = {
  email: string;
  password: string;
};

// const loginSocials = [
//   {
//     name: "Đăng nhập với Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Đăng nhập với Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const navigate = useNavigate();

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

  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const onLogin: SubmitHandler<InputsType> = async (data: InputsType) => {
    setIsLoading(true);
    const response = await dispatch(login(data));
    setIsLoading(false);
    switch (response.payload) {
      case "USER_NOT_FOUND":
        setError("email", {
          type: "not_found",
          message: "Tài khoản bạn nhập không tồn tại ! ",
        });
        break;
      case "INVALID_PASSWORD":
        setError("password", {
          type: "invalid",
          message: "Mật khẩu không đúng rồi bạn ơi ! ",
        });
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title> Đăng nhập UTEtravel | Du lịch trong tầm tay</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Đăng nhập
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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
          </div>
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>  */}

          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onLogin)}
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
                      "Email không đúng định dạng. Bạn vui lòng nhập lại nha !",
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className={`mt-1 ${
                      errors.email && "border-red-400  dark:border-red-400"
                    }`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email?.type === "required" && (
                <small className="text-red-500">{` ${errors.email.message}`}</small>
              )}
              {errors.email?.type === "pattern" && (
                <small className="text-red-500">{` ${errors.email.message}`}</small>
              )}
              {errors.email?.type === "not_found" && (
                <small className="text-red-500">{` ${errors.email.message}`}</small>
              )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Mật khẩu
                <Link to="/forgot-pass" className="text-sm">
                  Quên mật khẩu?
                </Link>
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
                      errors.password && "border-red-400  dark:border-red-400"
                    }`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password?.type === "required" && (
                <small className="text-red-500">{` ${errors.password.message}`}</small>
              )}
              {errors.password?.type === "invalid" && (
                <small className="text-red-500">{` ${errors.password.message}`}</small>
              )}
            </label>
            <ButtonPrimary type="submit" className={isLoading && "opacity-80"}>
              {" "}
              {isLoading ? "Đợi xíu nha bạn..." : "Đăng nhập"}
            </ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Bạn là người mới đúng không ? {` `}
            <Link
              to="/signup"
              className="text-primary-500 dark:text-primary-500"
            >
              Hãy tạo tài khoản nào
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

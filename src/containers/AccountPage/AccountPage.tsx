import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import User from "models/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { PATTERN } from "contains/contants";
import toast from "react-hot-toast";
import { updateUserInfo } from "redux/slices/authSlice";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, User>((state) => state.userStore.user);
  const [avatar, setAvatar] = useState<any>();
  const [avatarLink, setAvatarLink] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    if (user) {
      reset(user);
      setAvatarLink(user.imgLink);
    }
  }, [user]);

  const handleUpdateUserInfo = async (data: User) => {
    const formData = new FormData();
    if (avatar) {
      formData.append("file", avatar);
    }
    data?.fullName && formData.append("fullName", data.fullName);
    data?.gender && formData.append("gender", data.gender);
    data?.phone && formData.append("phone", data.phone);
    setIsLoading(true);
    await dispatch(updateUserInfo(formData));
    setIsLoading(false);
  };

  const checkTypeFile = (type: any) => {
    const typeFile = ["image/jpeg", "image/png", "image/jpg"];
    return typeFile.includes(type);
  };

  const handleUploadAvt = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    if (e.target.files) {
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        if (checkTypeFile(e.target.files[0].type)) {
          if (e.target.files[0].size < 1024 * 1024 * 5) {
            setAvatar(e.target.files[0]);
            reader.onloadend = function (e: ProgressEvent<FileReader>) {
              setAvatarLink(reader.result as string);
            }.bind(this);
          } else {
            toast.error("Hình ảnh upload quá lớn, Hình ảnh phải nhỏ hơn 5MB");
          }
        } else {
          toast.error(
            "Hình ảnh:" +
              e.target.files[0].name +
              " Chỉ cho phép upload đuôi (.jpg .png .jpeg)"
          );
        }
      }
    }
  };
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>UTEtravel | Du lịch trong tầm tay</title>
      </Helmet>
      <CommonLayout>
        <form
          className="space-y-6 sm:space-y-8"
          onSubmit={handleSubmit(handleUpdateUserInfo)}
        >
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Thông tin của bạn</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar
                  sizeClass="w-32 h-32"
                  imgUrl={avatarLink && avatarLink}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Thay đổi Avatar</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  id="my-file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleUploadAvt}
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Tên</Label>
                <Controller
                  control={control}
                  name="fullName"
                  rules={{
                    required: {
                      value: true,
                      message: "Tên không được bỏ trống nha bạn ơi !",
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      className={`mt-1.5 ${
                        errors.fullName && "border-red-400  dark:border-red-400"
                      }`}
                      defaultValue="Hoàng Phúc"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.fullName?.type === "required" && (
                  <small className="text-red-500">{` ${errors.fullName.message}`}</small>
                )}
              </div>
              {/* ---- */}
              <div>
                <Label>Giới tính</Label>
                <Controller
                  control={control}
                  name="gender"
                  rules={{
                    required: {
                      value: true,
                      message: "Tên không được bỏ trống nha bạn ơi !",
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      className="mt-1.5"
                      onChange={onChange}
                      value={value}
                    >
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </Select>
                  )}
                />
              </div>

              {/* ---- */}
              <div>
                <Label>Email</Label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: {
                      value: true,
                      message: "Email không được bỏ trống nha bạn ơi !",
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      disabled={true}
                      className={`mt-1.5
                      bg-slate-200 dark:bg-zinc-400
                      `}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              {/* ---- */}
              <div>
                <Label>Số điện thoại</Label>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: {
                      value: true,
                      message: "Số điện thoại không được bỏ trống nha bạn ơi !",
                    },
                    pattern: {
                      value: PATTERN.PHONE,
                      message:
                        "Số điện thoại không hợp lệ. Bạn vui lòng nhập lại nha !",
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      className={`mt-1.5 ${
                        errors.phone && "border-red-400  dark:border-red-400"
                      }`}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.phone?.type === "required" && (
                  <small className="text-red-500">{` ${errors.phone.message}`}</small>
                )}
                {errors.phone?.type === "pattern" && (
                  <small className="text-red-500">{` ${errors.phone.message}`}</small>
                )}
              </div>
              {/* ---- */}

              <div className="pt-2">
                <ButtonPrimary
                  type="submit"
                  className={isLoading ? "opacity-80" : ""}
                >
                  {" "}
                  {isLoading ? "Đợi xíu nha bạn..." : "Cập nhật"}
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </form>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;

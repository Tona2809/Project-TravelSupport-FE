import Label from "components/Label/Label";
import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";

const AccountPass = () => {
  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Thay đổi mật khẩu</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className=" max-w-xl space-y-6">
            <div>
              <Label>Mật khẩu hiện tại</Label>
              <Input type="password" className="mt-1.5" />
            </div>
            <div>
              <Label>Mật khẩu mới</Label>
              <Input type="password" className="mt-1.5" />
            </div>
            <div>
              <Label>Nhập lại mật khẩu</Label>
              <Input type="password" className="mt-1.5" />
            </div>
            <div className="pt-2">
              <ButtonPrimary>Cập nhật</ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;

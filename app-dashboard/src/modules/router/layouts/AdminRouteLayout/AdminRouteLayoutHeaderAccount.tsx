import { useAccountSignout } from "@/modules/api/hooks/account-auth";
import { useAccountUserDetail } from "@/modules/api/hooks/account-user";
import { useRouteNavigate } from "@/modules/router/hooks";
import ROUTE_PATHS from "@/modules/router/paths";
import { memo, useCallback, useMemo, type NamedExoticComponent } from "react";
import {
  ConfirmModal,
  Flex,
  LazyImage,
  Menu,
  MenuItem,
  Modal,
  Popper,
  Text,
  useModal,
  useToast,
  type MenuProps,
} from "venomous-ui";

const AdminRouteLayoutHeaderAccount: NamedExoticComponent = memo(() => {
  const { data } = useAccountUserDetail();
  const { mutateAsync: signout, isPending: isSigningout } = useAccountSignout();

  const { replace } = useRouteNavigate();
  const toast = useToast();

  const modalHanderOfDetail = useModal();
  const modalHanderOfSignout = useModal();

  const handleConfirmSignout = useCallback(async () => {
    await signout()
      .then(() => {
        toast({ type: "success", title: "退出登陆", description: "期待下次访问" });
        replace(ROUTE_PATHS.AUTH.ROOT);
      })
      .catch((error) =>
        toast({ type: "error", title: "退出登陆失败", description: error.message }),
      );
  }, [replace, signout, toast]);

  const accountMenuItems = useMemo<MenuProps["items"]>(
    () => [
      {
        label: "账号详情",
        icon: "solar:user-circle-line-duotone",
        onClick: () => modalHanderOfDetail.openModal(),
      },
      {
        label: "退出登陆",
        icon: "solar:logout-2-line-duotone",
        sx: { color: "error.main" },
        onClick: () => modalHanderOfSignout.openModal(),
      },
    ],
    [modalHanderOfDetail, modalHanderOfSignout],
  );

  return (
    <>
      <Popper
        position="bottom"
        renderPopperHandler={({ openPopper }) => (
          <div onClick={openPopper} style={{ padding: "8px", cursor: "pointer" }}>
            <LazyImage
              src="https://avatars.githubusercontent.com/u/166675080?v=4"
              width={28}
              height={28}
            />
          </div>
        )}
      >
        <Menu
          height="100%"
          width="100%"
          items={accountMenuItems}
          renderItem={(item) => <MenuItem clickable {...item} />}
        />
      </Popper>

      <Modal
        isOpen={modalHanderOfDetail.isOpen}
        closeModal={modalHanderOfDetail.closeModal}
        isPrevented={false}
      >
        <Flex gap={2}>
          <div>
            <Text isLabel text="用户名" />
            <Text bold text={data?.name || ""} />
          </div>
          <div>
            <Text isLabel text="用户邮箱" />
            <Text bold text={data?.email || ""} />
          </div>
          <div>
            <Text isLabel bold text="用户身份" />
            <Text
              bold
              text={data?.isSuperuser ? "超级管理员" : data?.isStaff ? "普通管理员" : "普通用户"}
            />
          </div>
          <div>
            <Text isLabel text="登陆日期" />
            <Text bold text={data?.lastLogin || ""} />
          </div>
          <div>
            <Text isLabel text="创建日期" />
            <Text bold text={data?.dateJoined || ""} />
          </div>
        </Flex>
      </Modal>

      <ConfirmModal
        isOpen={modalHanderOfSignout.isOpen}
        isSubmitting={isSigningout}
        closeModal={modalHanderOfSignout.closeModal}
        onSubmit={handleConfirmSignout}
        title="你确定吗?"
        contentMessage="你确定要退出登陆吗？该操作无法撤销。"
        cancelButtonText="取消"
        confirmButtonText="确认"
      />
    </>
  );
});

AdminRouteLayoutHeaderAccount.displayName = "AdminRouteLayoutHeaderAccount";
export default AdminRouteLayoutHeaderAccount;

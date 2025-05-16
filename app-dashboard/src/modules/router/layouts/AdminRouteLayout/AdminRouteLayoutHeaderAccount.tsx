import { memo, useCallback, useMemo, type NamedExoticComponent } from "react";
import {
  Avatar,
  ConfirmModal,
  Flex,
  Menu,
  MenuItem,
  Modal,
  Popper,
  Text,
  useModal,
  useToast,
  type MenuProps,
} from "venomous-ui";

import { useAccountSignout } from "@/modules/api/hooks/account-auth";
import { useAccountUserDetail } from "@/modules/api/hooks/account-user";
import { useTranslation } from "@/modules/languages";
import { useRouteNavigate } from "@/modules/router/hooks";
import ROUTE_PATHS from "@/modules/router/paths";
import { handleFormatDatetime } from "@/modules/tools";

const AdminRouteLayoutHeaderAccount: NamedExoticComponent = memo(() => {
  const { data } = useAccountUserDetail();
  const { mutateAsync: signout, isPending: isSigningout } = useAccountSignout();

  const { t: tCommon } = useTranslation("common");
  const { t: tAuth } = useTranslation("auth");

  const { replace } = useRouteNavigate();
  const toast = useToast();

  const modalHanderOfDetail = useModal();
  const modalHanderOfSignout = useModal();

  const handleConfirmSignout = useCallback(async () => {
    await signout()
      .then(() => {
        toast({
          type: "success",
          title: tAuth("alerts.signup-succeed"),
          description: tAuth("alerts.signout-succeed-info"),
        });
        replace(ROUTE_PATHS.AUTH.ROOT);
      })
      .catch((error) =>
        toast({
          type: "error",
          title: tAuth("alerts.signout-failed"),
          description: error?.response?.data?.error ?? error.message,
        }),
      );
  }, [replace, signout, toast, tAuth]);

  const accountMenuItems = useMemo<MenuProps["items"]>(
    () => [
      {
        label: tAuth("page-messages.account-info"),
        icon: "solar:user-circle-line-duotone",
        onClick: () => modalHanderOfDetail.openModal(),
      },
      {
        label: tAuth("page-messages.signout"),
        icon: "solar:logout-2-line-duotone",
        sx: { color: "error.main" },
        onClick: () => modalHanderOfSignout.openModal(),
      },
    ],
    [modalHanderOfDetail, modalHanderOfSignout, tAuth],
  );

  const accountInfoItems = useMemo<Array<{ label: string; value: string }>>(() => {
    if (!data) return [];
    const { name, email, isSuperuser, isStaff, lastLogin, dateJoined } = data;
    const formattedLastLogin = handleFormatDatetime(lastLogin);
    const formattedDateJoined = handleFormatDatetime(dateJoined);
    return [
      { label: tAuth("account-info.name"), value: name },
      { label: tAuth("account-info.email"), value: email },
      {
        label: tAuth("account-info.roles"),
        value: isSuperuser
          ? tAuth("account-info.superuser")
          : isStaff
            ? tAuth("account-info.adminuser")
            : tAuth("account-info.normaluser"),
      },
      {
        label: tAuth("account-info.lastLogin"),
        value: `${formattedLastLogin.DateTime} ( ${formattedLastLogin.FromNow} )`,
      },
      {
        label: tAuth("account-info.dateJoined"),
        value: `${formattedDateJoined.DateTime} ( ${formattedDateJoined.FromNow} )`,
      },
    ];
  }, [data, tAuth]);

  return (
    <>
      <Popper
        position="bottom"
        renderPopperHandler={({ openPopper }) => (
          <Flex
            row
            onClick={openPopper}
            sx={{ width: 40, cursor: "pointer", justifyContent: "center" }}
          >
            <Avatar
              alt="User Avatar"
              src="https://avatars.githubusercontent.com/u/166675080?v=4"
              width={32}
              withIconBadge={data?.isSuperuser || data?.isStaff}
              iconBadgeIcon={
                data?.isSuperuser
                  ? "solar:crown-star-bold-duotone"
                  : data?.isStaff
                    ? "solar:crown-line-bold-duotone"
                    : ""
              }
            />
          </Flex>
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
        <Flex gap={2} p={"8px"}>
          {accountInfoItems.map((item) => (
            <div key={item.label}>
              <Text bold isLabel text={item.label} />
              <Text bold text={item.value} />
            </div>
          ))}
        </Flex>
      </Modal>

      <ConfirmModal
        isOpen={modalHanderOfSignout.isOpen}
        isSubmitting={isSigningout}
        closeModal={modalHanderOfSignout.closeModal}
        onSubmit={handleConfirmSignout}
        title={tCommon("confirm-messages.SINGOUT")}
        contentMessage={tCommon("confirm-messages.CANTNOT_BE_UNDONE")}
        cancelButtonText={tCommon("actions.cancel")}
        confirmButtonText={tCommon("actions.confirm")}
      />
    </>
  );
});

AdminRouteLayoutHeaderAccount.displayName = "AdminRouteLayoutHeaderAccount";
export default AdminRouteLayoutHeaderAccount;

import {
  DeleteButton,
  EditButton,
  List,
  useModalForm,
  useTable,
} from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { Space, Table } from "antd";

import { getValueProps } from "@refinedev/strapi-v4";
import { CreateCompany, EditCompany } from "../../components/company";
import { API_URL } from "../../constants";
import { ICompany } from "../../interfaces";

export const CompanyList = () => {
  const { tableProps } = useTable<ICompany>({
    sorters: { initial: [{ field: "id", order: "desc" }] },
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "create",
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "edit",
    meta: { populate: ["logo"] },
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createShow();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" sorter />
          <Table.Column<ICompany>
            dataIndex="logo"
            title="Logo"
            render={(_, record) => {
              const images = getValueProps(record.logo, API_URL);

              return (
                <img
                  src={images.fileList[0].url}
                  alt="logo"
                  style={{ width: 50 }}
                />
              );
            }}
          />
          <Table.Column<ICompany> dataIndex="name" title="Name" sorter />
          <Table.Column<ICompany> dataIndex="address" title="Address" sorter />
          <Table.Column<ICompany> dataIndex="country" title="Country" sorter />
          <Table.Column<ICompany> dataIndex="city" title="City" sorter />
          <Table.Column<ICompany> dataIndex="email" title="Email" sorter />

          <Table.Column<ICompany>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  onClick={() => editShow(record.id)}
                />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
      {createModalProps.open ? (
        <CreateCompany
          modalProps={createModalProps}
          formProps={createFormProps}
        />
      ) : null}

      {editModalProps.open ? (
        <EditCompany modalProps={editModalProps} formProps={editFormProps} />
      ) : null}
    </>
  );
};

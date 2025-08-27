import { ConfigProvider, Pagination } from "antd";

type PaginationProps = {
  currentPage: number;
  total: number;
};

const PaginationV1 = (paginationProps: PaginationProps) => {
  return (
    <Pagination
      align="center"
      defaultCurrent={paginationProps.currentPage}
      total={paginationProps.total}
    />
  );
};

export default PaginationV1;

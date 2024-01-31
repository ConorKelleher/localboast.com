import PageWrapper from "Pages/PageWrapper/PageWrapper";
import { Outlet } from "react-router-dom";

export const UnwrappedRoot = () => <Outlet />;

const Root = () => (
  <PageWrapper>
    <UnwrappedRoot />
  </PageWrapper>
);

export default Root;

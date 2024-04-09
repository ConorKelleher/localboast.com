import ErrorBoundaryDisplay from "components/ErrorBoundaryDisplay";
import PageWrapper from "Pages/PageWrapper/PageWrapper";
import { Outlet } from "react-router-dom";

export const UnwrappedRoot = () => (
  <ErrorBoundaryDisplay>
    <Outlet />
  </ErrorBoundaryDisplay>
);

const Root = () => (
  <PageWrapper>
    <UnwrappedRoot />
  </PageWrapper>
);

export default Root;

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  width: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Zuerst mussen wir also den authentifizieren Benutzer laden
  const { isLoading, isAuthenticated } = useUser();

  // 2. wenn kein Authentitat Benutzer gibt,wird die zur Anmeldeseite zuruckgeleitet
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. Wharend das geschieht, Zeigen wir einen Spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  // 4. wenn ein Authentitat Benutzer gibt, renderen sie die Anwendung
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  width: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  // 1. Zuerst mussen wir also den authentifizieren Benutzer laden
  const { user, isLoading } = useUser();
  console.log(user);
  // 2. Wharend das geschieht, Zeigen wir einen Spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  // 3. wenn kein Authentitat Benutzer gibt,wird die zur Anmeldeseite zuruckgeleitet

  // 4. wenn ein Authentitat Benutzer gibt, renderen sie die Anwendung

  return children;
}

export default ProtectedRoute;

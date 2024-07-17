import { useAuth } from "../../contexts/AuthContext";

export default function Logout() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.error("Failed to log out");
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
}

import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';

export default function ProfileList() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Don't show anything if not logged in
  }

  return (
    <div className="p-4">
      <UserProfile />
    </div>
  );
}

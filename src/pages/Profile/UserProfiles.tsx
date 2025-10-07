import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import UserMetaCard from "../../components/profile/UserMetaCard";
import UserInfoCard from "../../components/profile/UserInfoCard";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function UserProfiles() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      <PageMeta
        title="Profile"
        description="Profile"
      />
      {user.role === "admin" && <PageBreadcrumb pageTitle="Profile" />}
      {user.role === "admin" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">
            Profile
          </h3>
          <div className="space-y-6">
            <UserMetaCard />
            <UserInfoCard />
          </div>
        </div>
      )}
      {user.role === "visitor" && (
        <div className="rounded-2x px-6 lg:px-20 pt-28">
          <div className="space-y-6">
            <UserMetaCard />
            <UserInfoCard />
          </div>
        </div>
      )}
    </>
  );
}

import CustomLoader from "@/components/CustomLoader/CustomLoader";
import React from "react";

interface UserGraphWrapperProps {
    children: React.ReactNode; // The graph component
    isLoading: boolean; // Loading state
}

const UserGraphWrapper: React.FC<UserGraphWrapperProps> = ({
    children,
    isLoading,
}) => {
    if (isLoading) {
        return <CustomLoader />;
    }
    return <>{children}</>;
};

export default UserGraphWrapper;

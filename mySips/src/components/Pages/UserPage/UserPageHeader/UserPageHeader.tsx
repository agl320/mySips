import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

function UserPageHeader({
    pageTitle,
    linkTrail,
}: {
    pageTitle: string;
    linkTrail: Array<{ href?: string; value: string }>;
}) {
    return (
        <div className="">
            <div className="pb-4">
                <h1 className="text-3xl font-semibold">{pageTitle}</h1>
            </div>
            <div>
                <Breadcrumb>
                    <BreadcrumbList className="text-base">
                        {linkTrail.map((linkItem, index) => (
                            <React.Fragment key={`BC-${index}`}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={linkItem.href ?? "#"}>
                                        {linkItem.value}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < linkTrail.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}

export default UserPageHeader;

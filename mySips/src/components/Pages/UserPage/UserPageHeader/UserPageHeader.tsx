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
    pageCaption,
}: {
    pageTitle: string;
    linkTrail: Array<{ href?: string; value: string }>;
    pageCaption: string;
}) {
    return (
        <div className="">
            <Breadcrumb className="inline-block bg-white/15 px-3 py-2 rounded-md">
                <BreadcrumbList className="text-xs flex flex-nowrap items-center overflow-hidden">
                    {linkTrail.map((linkItem, index) => (
                        <React.Fragment key={`BC-${index}`}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={linkItem.href ?? "#"}
                                    className="truncate"
                                >
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
            <h1 className="text-3xl font-semibold my-4 font-display">
                {pageTitle}
            </h1>
            <p className="opacity-50">{pageCaption}</p>
        </div>
    );
}

export default UserPageHeader;

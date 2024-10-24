import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function PageHeader({
    pageTitle,
    linkTrail,
}: {
    pageTitle: string;
    linkTrail: Array<{ href?: string; value: string }>;
}) {
    return (
        <div>
            <div>
                <p>{pageTitle}</p>
            </div>
            <div>
                <Breadcrumb>
                    <BreadcrumbList>
                        {linkTrail.map((linkItem, index) => {
                            return (
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={linkItem.href ?? "#"}
                                        >
                                            {linkItem.value}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index < linkTrail.length - 1 ? (
                                        <BreadcrumbSeparator />
                                    ) : (
                                        <></>
                                    )}
                                </>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}

export default PageHeader;

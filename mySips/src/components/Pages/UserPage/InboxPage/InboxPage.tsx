import UserBlock from "../UserComponents/Blocks/UserBlock";
import UserPageHeader from "../UserPageHeader/UserPageHeader";

function InboxPage({ user }) {
    return (
        <section className="w-full h-full p-8">
            <UserBlock className="h-full">
                <UserPageHeader
                    pageTitle="myGroups"
                    linkTrail={[{ value: "Home" }, { value: "Inbox" }]}
                />
            </UserBlock>
        </section>
    );
}

export default InboxPage;

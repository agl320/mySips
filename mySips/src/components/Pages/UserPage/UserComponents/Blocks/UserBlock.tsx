// Custom white block for dashboard
function UserBlock(props: {
    children: React.ReactNode;
    className?: string | undefined;
}) {
    return (
        <div
            className={`p-4 rounded-md gap-12 bg-background-block bg-clip-padding backdrop-filter backdrop-blur-md  ${props.className}`}
        >
            {props.children}
        </div>
    );
}

export default UserBlock;

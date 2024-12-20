// Custom white block for dashboard
function UserBlock(props: {
    children: React.ReactNode;
    className?: string | undefined;
}) {
    return (
        <div
            className={`p-6 rounded-md gap-12 bg-background-block bg-clip-padding backdrop-filter backdrop-blur-md shadow-sm border border-white/15  ${props.className}`}
        >
            {props.children}
        </div>
    );
}

export default UserBlock;

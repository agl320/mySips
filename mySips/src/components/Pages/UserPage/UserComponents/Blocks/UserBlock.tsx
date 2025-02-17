// Custom white block for dashboard
function UserBlock(props: {
    children: React.ReactNode;
    className?: string | undefined;
}) {
    return (
        <div
            className={`p-6 rounded-md bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-md shadow-sm  ${props.className}`}
        >
            {props.children}
        </div>
    );
}

export default UserBlock;

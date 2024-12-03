// Custom white block for dashboard
function UserBlock(props: {
    children: React.ReactNode;
    className?: string | undefined;
}) {
    return (
        <div
            className={`p-4 rounded-sm gap-12 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25 border border-white/25 ${props.className}`}
        >
            {props.children}
        </div>
    );
}

export default UserBlock;

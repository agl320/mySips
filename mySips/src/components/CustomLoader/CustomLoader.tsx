import { LoaderCircle } from "lucide-react";

function CustomLoader(props: { className?: string }) {
    return (
        <div className={`flex p-8 opacity-75 ${props?.className}`}>
            <LoaderCircle className="animate-spin mr-4" />
            <p>Loading...</p>
        </div>
    );
}

export default CustomLoader;

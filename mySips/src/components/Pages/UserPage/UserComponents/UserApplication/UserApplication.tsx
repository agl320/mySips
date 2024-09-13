import { Separator } from "@/components/ui/separator";

function UserApplication() {
    return (
        <div className="flex">
            <Separator orientation="vertical" className="bg-black" />
            <div>
                <div className="h-24 w-screen"></div>
                <Separator className="bg-black" />
                <div className="h-48 w-screen"></div>
                <Separator className="bg-black" />
                <div></div>
            </div>
        </div>
    );
}

export default UserApplication;

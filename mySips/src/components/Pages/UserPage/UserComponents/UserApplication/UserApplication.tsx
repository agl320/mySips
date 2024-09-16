import { Separator } from "@/components/ui/separator";

function UserApplication() {
    return (
        <div className="flex w-full">
            <Separator orientation="vertical" className="bg-black" />
            <div className="w-full">
                <div className="h-24">
                    <p>Search</p>
                </div>
                <Separator className="bg-black" />
                <div className="h-48 ">
                    <p>Stats</p>
                </div>
                <Separator className="bg-black " />
                <div>
                    <p>mySips</p>
                </div>
            </div>
        </div>
    );
}

export default UserApplication;

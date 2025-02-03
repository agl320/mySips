import { Drink } from "@/classes/Drink";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import React, { useEffect, useState } from "react";
import { CircleCheck, CupSoda, Plus, TriangleAlert } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import CustomLoader from "../CustomLoader/CustomLoader";
import DrinkRow from "../DrinkDisplay/DrinkRow";

interface IAddDrinkDialogProps {
    user: User;
    baseDrinkData: Drink;
    addDrinkCallback: (
        userUid: string,
        newDrinkProperties: any
    ) => Promise<void>;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddDrinkDialog({
    user,
    baseDrinkData,
    addDrinkCallback,
    open,
    onOpenChange,
}: IAddDrinkDialogProps) {
    const [imageUploaded, setImageUploaded] = useState(false); // Track image upload state
    // const [imageProcessed, setImageProcessed] = useState<boolean>(false);
    const [matchedDrinks, setMatchedDrinks] = useState<Drink[] | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store uploaded file
    const [uploadError, setUploadError] = useState<string | null>(null); // Track upload errors
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImageUploaded(true);
            setUploadError(null);
        } else {
            setSelectedFile(null);
            setImageUploaded(false);
        }
    };

    const extractReceiptHandler = async () => {
        if (!selectedFile) {
            setUploadError("No image file selected.");
            return;
        }

        setIsLoading(true);

        try {
            const idToken = await user.getIdToken(); // Fetch ID token
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await fetch(
                `http://127.0.0.1:5000/api/process-receipt?userUid=${user.uid}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to process the receipt.");
            }

            const result = await response.json();
            console.log(result);
            setUploadError("Image text extracted without error.");
            setMatchedDrinks(result.matchedDrinks);
        } catch (error) {
            setUploadError(
                error.message ||
                    "An error occurred while processing the receipt."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setImageUploaded(false);
        setIsLoading(false);
        setMatchedDrinks(null);
        setSelectedFile(null);
        setUploadError(null);
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="pb-2">
                    <DialogTitle className="text-2xl opacity-80">
                        Add New Drink
                    </DialogTitle>
                    <DialogDescription>
                        {matchedDrinks
                            ? "Select from the below matched drinks."
                            : "Ensure your picture is horizontally aligned, and is placed flat on a surface."}
                    </DialogDescription>
                </DialogHeader>
                {matchedDrinks ? (
                    <div className="w-full">
                        {matchedDrinks.length > 0 ? (
                            matchedDrinks.map((drinkData) => (
                                <DrinkRow user={user} drinkData={drinkData} />
                            ))
                        ) : (
                            <div className="">
                                <p className="text-center font-medium opacity-50 my-4">
                                    No drink matches were found.
                                </p>
                                <DialogFooter className="sm:justify-end">
                                    <Button
                                        className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30 mb-2 sm:mt-0"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Close
                                    </Button>
                                </DialogFooter>
                            </div>
                        )}
                    </div>
                ) : isLoading ? (
                    <CustomLoader />
                ) : (
                    <>
                        <div>
                            <Label>Import From Receipt (Beta)</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleImageUpload}
                            />
                            {imageUploaded ? (
                                <p className="mt-4 px-2 py-1 rounded-md text-sm text-black/40 bg-black/15 inline-flex items-center whitespace-nowrap">
                                    <CircleCheck className="w-4 h-4 mr-2" />
                                    Image uploaded successfully!
                                </p>
                            ) : (
                                <p className="mt-4 px-2 py-1 rounded-md text-sm text-black/40 bg-black/15 inline-flex items-center whitespace-nowrap">
                                    <TriangleAlert className="w-4 h-4 mr-2" />
                                    No image uploaded yet.
                                </p>
                            )}
                            {uploadError && (
                                <p className="mt-4 px-2 py-1 rounded-md text-sm text-black/40 bg-black/15 inline-flex items-center whitespace-nowrap">
                                    <CupSoda className="w-4 h-4 mr-2" />
                                    {uploadError}
                                </p>
                            )}
                            <br></br>
                            <br></br>
                        </div>
                        <DialogFooter className="sm:justify-end">
                            <Button
                                disabled={!imageUploaded}
                                className="bg-gradient-to-r from-pastel-pink to-pastel-orange text-md rounded-md px-4 text-white"
                                onClick={extractReceiptHandler}
                            >
                                Extract Receipt
                            </Button>
                            <Button
                                className="bg-pastel-orange text-md rounded-md px-4 text-pastel-orange bg-opacity-30 mb-2 sm:mt-0"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default AddDrinkDialog;

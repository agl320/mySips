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
import { CircleCheck, CupSoda, TriangleAlert } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store uploaded file
    const [uploadError, setUploadError] = useState<string | null>(null); // Track upload errors

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
        } catch (error) {
            setUploadError(
                error.message ||
                    "An error occurred while processing the receipt."
            );
        }
    };

    useEffect(() => {
        setImageUploaded(false);
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
                </DialogHeader>
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
            </DialogContent>
        </Dialog>
    );
}

export default AddDrinkDialog;

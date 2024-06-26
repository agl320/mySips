import { useState } from "react";
import StoreInput from "../StoreInput";
import { IStore } from "../../../interfaces/IStore";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, setDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function AdminStoreAddForm({ storesState, setStoresState, addNewStore }) {
  const [storeInputState, setStoreInputState] = useState<IStore>({
    uuid: "",
    storeName: "",
    storeAddress: "",
    storeMenu: {},
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Store</Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <StoreInput
            storeInputState={storeInputState}
            setStoreInputState={setStoreInputState}
          />
          <Button onClick={() => addNewStore(storeInputState)}>
            Add Store
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AdminStoreAddForm;

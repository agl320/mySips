import { Button } from "@/components/ui/button";

function AdminStoreDeleteForm({
    storesState,
    setStoresState,
    selectedStoreUUID,
    deleteStore,
}) {
    return (
        <div>
            <Button className="bg-[#dc2626]" onClick={() => deleteStore()}>
                Delete Store
            </Button>
        </div>
    );
}

export default AdminStoreDeleteForm;

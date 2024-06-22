function AdminStoreDeleteForm({
    storesState,
    setStoresState,
    selectedStoreUUID,
    deleteStore,
}) {
    return (
        <div>
            <p>Store delete</p>
            <button onClick={() => deleteStore()}>Delete Store</button>
        </div>
    );
}

export default AdminStoreDeleteForm;

function StoreDropdown({
    storesState,
    selectedStoreUUID,
    setSelectedStoreUUID,
}) {
    return (
        <>
            <select
                name="Store uuid"
                onChange={(e) => {
                    setSelectedStoreUUID(e.target.value);
                }}
                value={selectedStoreUUID}
            >
                {Object.keys(storesState).map((storeId, index) => (
                    <option value={storeId} key={index}>
                        {storeId}
                    </option>
                ))}
            </select>
            <div>
                {selectedStoreUUID
                    ? `Selected ${selectedStoreUUID}`
                    : "No store selected"}
            </div>
        </>
    );
}

export default StoreDropdown;

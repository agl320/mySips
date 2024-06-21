function StoreInput({ storeInputState, setStoreInputState }) {
    return (
        <div>
            <div>
                <p>New Store</p>
                <input
                    type="text"
                    placeholder={`Store uuid`}
                    required
                    value={storeInputState.uuid}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setStoreInputState({
                            ...storeInputState,
                            uuid: e.target.value,
                        });
                    }}
                    maxLength={64}
                ></input>
            </div>
            <div>
                <label>Store name</label>
                <input
                    type="text"
                    placeholder={`Store name`}
                    required
                    value={storeInputState.storeName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setStoreInputState({
                            ...storeInputState,
                            storeName: e.target.value,
                        });
                    }}
                    maxLength={64}
                ></input>
            </div>
            <div>
                <label>Store address</label>
                <input
                    type="text"
                    placeholder={`Store address`}
                    required
                    value={storeInputState.storeAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setStoreInputState({
                            ...storeInputState,
                            storeAddress: e.target.value,
                        });
                    }}
                    maxLength={64}
                ></input>
            </div>
        </div>
    );
}

export default StoreInput;

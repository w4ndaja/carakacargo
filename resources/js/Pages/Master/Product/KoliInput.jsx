export const KoliInput = ({ quantity, data, errors }) => {
    const _koli = [];
    for (let i = 0; i < quantity; i++) {
        _koli.push(
            <div className="flex gap-2 flex-nowrap border-b rounded-xl p-3">
                <div className="my-auto text-semibold whitespace-nowrap">Koli {i + 1}</div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" key={i}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="input_length">Panjang</label>
                        <input
                            name="length[]"
                            defaultValue={data.length}
                            type="number"
                            className={`px-4 py-2 rounded shadow ${
                                errors.length ? "border-red-500" : ""
                            }`}
                            id="input_length"
                        />
                        {errors.length && (
                            <span className="text-red-500">
                                {errors.length}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="input_width">Lebar</label>
                        <input
                            name="width[]"
                            defaultValue={data.width}
                            type="number"
                            className={`px-4 py-2 rounded shadow ${
                                errors.width ? "border-red-500" : ""
                            }`}
                            id="input_width"
                        />
                        {errors.width && (
                            <span className="text-red-500">{errors.width}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="input_height">Tinggi</label>
                        <input
                            name="height[]"
                            defaultValue={data.height}
                            type="number"
                            className={`px-4 py-2 rounded shadow ${
                                errors.height ? "border-red-500" : ""
                            }`}
                            id="input_height"
                        />
                        {errors.height && (
                            <span className="text-red-500">
                                {errors.height}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="input_weight">Berat</label>
                        <input
                            name="weight[]"
                            defaultValue={data.weight}
                            type="number"
                            className={`px-4 py-2 rounded shadow ${
                                errors.weight ? "border-red-500" : ""
                            }`}
                            id="input_weight"
                        />
                        {errors.weight && (
                            <span className="text-red-500">
                                {errors.weight}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    return _koli;
};

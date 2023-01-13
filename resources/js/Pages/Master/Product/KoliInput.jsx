import { useEffect } from "react";

export const KoliInput = ({
    quantity,
    data,
    errors,
    koliInputs,
    setKoliInputs,
}) => {
    const _koli = [];
    useEffect(() => {
        setKoliInputs(
            (data?.kolis || []).map((item) => ({
                length: item.length,
                width: item.width,
                height: item.height,
                weight: item.weight,
            }))
        );
    }, [data]);
    for (let i = 0; i < quantity; i++) {
        if (koliInputs.length < i + 1) {
            setKoliInputs((koliInputs) => [
                ...koliInputs,
                {
                    length: 0,
                    width: 0,
                    height: 0,
                    weight: 0,
                },
            ]);
        }
        _koli.push(
            <div className="flex gap-2 flex-nowrap border-b rounded-xl p-3">
                <div className="my-auto text-semibold whitespace-nowrap">
                    Koli {i + 1}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" key={i}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="input_length">Panjang</label>
                        <input
                            name="length[]"
                            value={koliInputs?.[i]?.length}
                            onChange={(e) =>
                                setKoliInputs((koliInputs) =>
                                    koliInputs.map((item, _i) =>
                                        i == _i
                                            ? {
                                                  ...item,
                                                  length: e.target.value,
                                              }
                                            : item
                                    )
                                )
                            }
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
                            value={koliInputs?.[i]?.width}
                            onChange={(e) =>
                                setKoliInputs((koliInputs) =>
                                    koliInputs.map((item, _i) =>
                                        i == _i
                                            ? {
                                                  ...item,
                                                  width: e.target.value,
                                              }
                                            : item
                                    )
                                )
                            }
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
                            value={koliInputs?.[i]?.height}
                            onChange={(e) =>
                                setKoliInputs((koliInputs) =>
                                    koliInputs.map((item, _i) =>
                                        i == _i
                                            ? {
                                                  ...item,
                                                  height: e.target.value,
                                              }
                                            : item
                                    )
                                )
                            }
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
                            value={koliInputs?.[i]?.weight}
                            onChange={(e) =>
                                setKoliInputs((koliInputs) =>
                                    koliInputs.map((item, _i) =>
                                        i == _i
                                            ? {
                                                  ...item,
                                                  weight: e.target.value,
                                              }
                                            : item
                                    )
                                )
                            }
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

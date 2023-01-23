import moment from "moment/moment";
import { useMemo } from "react";

export default function RowVehicle({item, edit, destroy}) {
    const expired = useMemo(() => {
        return moment(item.license_valid_until).isBefore(moment()) && moment(item.keur_valid_until).isBefore(moment())
    }, [item.license_valid_until, item.keur_valid_until])
    const toBeExpired = useMemo(() => {
        return moment(item.license_valid_until).isSameOrBefore(moment().add(1, 'month')) && moment(item.keur_valid_until).isSameOrBefore(moment().add(1, 'month')) && !expired
    }, [item.license_valid_until, item.keur_valid_until])
    return (
        <tr className={`${expired && 'text-red-100 bg-red-600'} ${toBeExpired && 'text-orange-100 bg-orange-400'}`}>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.code}
            </th>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.merk}
            </th>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.type}
            </th>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.police_no}
            </th>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.year}
            </th>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.license_valid_until_translated}
            </th>
            <th className="whitespace-nowrap border-r last:border-r-0 border-b p-2">
                {item.keur_valid_until_translated}
            </th>
            <th className="border-r last:border-r-0 border-b p-2">
                <div className="flex gap-3 w-100 justify-center">
                    <button
                        role="button"
                        type="button"
                        onClick={(e) => edit(e, item)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                        >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                    </button>
                    <button
                        role="button"
                        type="button"
                        onClick={(e) => destroy(e, item)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eraser"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                        </svg>
                    </button>
                </div>
            </th>
        </tr>
    );
}

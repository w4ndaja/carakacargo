import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import bwipjs from "bwip-js";

export const PrintBarcodeModal = forwardRef((props, ref) => {
    const [modalIsShow, setModalIsShow] = useState(false);
    const [resi, setResi] = useState("");
    const barcodeCanvasRef = useRef();
    useEffect(() => {
        if (modalIsShow) {
            const barcode = bwipjs.toCanvas(document.querySelector("#toPrintBarcode"), {
                bcid: "code128", // Barcode type
                text: resi, // Text to encode
                scale: 1, // 3x scaling factor
                height: 10, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                textxalign: "center", // Always good to set this
            });
            barcode.toBlob(async blob => {
                const blobUrl = URL.createObjectURL(blob);
                const printWindow = window.open(blobUrl, "_blank", 300, 400);
                setTimeout(() => {
                    printWindow.print();
                    setTimeout(() => {
                        printWindow.close();
                        setModalIsShow(false);
                    }, 100);
                }, 500);
            });
            // printWindow.window.bwipjs = bwipjs;
            // printWindow.document.head.innerHTML = window.document.head.innerHTML;
            // printWindow.document.body.innerHTML = barcodeCanvasRef.current.outerHTML;
        }
    }, [resi, modalIsShow]);
    useImperativeHandle(ref, () => ({
        print: (resi) => {
            setResi(resi);
            setModalIsShow(true);
            // renderAndPrint();
        },
    }));
    return (
        modalIsShow && (
            <>
                <div className="absolute flex-col items-center justify-center w-screen h-screen hidden">
                    <div
                        onClick={ (e) => setModalIsShow(false) }
                        className="absolute w-screen h-screen bg-black opacity-30 z-0"
                    ></div>
                    <div className="rounded-xl p-4 bg-white shadow z-10 relative">
                        <canvas
                            id="toPrintBarcode"
                            ref={ barcodeCanvasRef }
                        ></canvas>
                    </div>
                </div>
            </>
        )
    );
});

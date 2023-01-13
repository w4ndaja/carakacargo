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
    const printArea = useRef();
    const [imgSrc, setImgSrc] = useState("");
    const barcodeCanvasRef = useRef();
    useEffect(() => {
        if (modalIsShow) {
            let canvas = bwipjs.toCanvas(barcodeCanvasRef.current, {
                bcid: "code128", // Barcode type
                text: resi, // Text to encode
                scale: 1, // 3x scaling factor
                height: 10, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                textxalign: "center", // Always good to set this
            });
            canvas.toBlob((blob) => {
                const printWindow = window.open("", "_blank", 300, 400);
                setImgSrc(URL.createObjectURL(blob));
                printWindow.document.head.innerHTML =
                    window.document.head.innerHTML;
                printWindow.document.body.innerHTML =
                    printArea.current.outerHTML;
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                    setModalIsShow(false);
                }, 500);
            });
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
                <div className="absolute flex-col items-center justify-center w-screen h-screen hidden print:flex">
                    <div
                        onClick={(e) => setModalIsShow(false)}
                        className="absolute w-screen h-screen bg-black opacity-30"
                    ></div>
                    <div className="rounded-xl p-4 bg-white shadow z-10">
                        <canvas
                            ref={barcodeCanvasRef}
                            className="hidden"
                        ></canvas>
                        <img ref={printArea} src={imgSrc} alt="" />
                    </div>
                </div>
            </>
        )
    );
});

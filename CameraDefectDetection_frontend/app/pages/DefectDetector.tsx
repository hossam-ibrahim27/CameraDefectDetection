import React, { useState, useRef } from "react";
import axios from 'axios';
import type { ApiResponse, Detection } from "~/interfaces/interfaces";
import toast, { Toaster } from "react-hot-toast";

const localAPi = "http://127.0.0.1:8000"
const server_api = localAPi

const DefectDetector: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showLiveStream, setShowLiveStream] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<ApiResponse | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgScale, setImgScale] = useState<{ scaleX: number; scaleY: number }>({ scaleX: 1, scaleY: 1 });
    const [streamError, setStreamError] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    //# Handel file selected 
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResults(null);
        }
    };

    //# Handel Image Size
    const handleImageLoad = () => {
        if (imgRef.current) {
            const { naturalWidth, naturalHeight, clientWidth, clientHeight } = imgRef.current;
            setImgScale({
                scaleX: clientWidth / naturalWidth,
                scaleY: clientHeight / naturalHeight,
            });
        }
    };

    //# Send Image to backend
    const handleUpload = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post<ApiResponse>(`${server_api}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResults(response.data);
            //# Alert 
            toast.success("Image analyzed successfully!", {
                duration: 4000,
                position: 'top-center',
            });
        } catch (error) {
            //# Alert 
            toast.error("Failed to connect to the server. Make sure FastAPI is running!", {
                duration: 4000,
                position: 'top-center',
            });
        } finally {
            setLoading(false);
        }
    };
    // # Handle Stream Errors
    const handleStreamError = () => {
        setStreamError(true);
        toast.error("Live stream connection failed.", {
            position: 'top-center',
        });
    }

    //# Bounding Boxing - Updated to use olive-themed light colors
    const getClassColor = (className: string) => {
        switch (className.toLowerCase()) {
            case 'broken':
                return 'border-orange-500 bg-orange-100/50 text-orange-900';
            case 'extrusion':
                return 'border-amber-500 bg-amber-100/50 text-amber-950';
            case 'twist':
                return 'border-violet-500 bg-violet-100/50 text-violet-950';
            default:
                return 'border-olive-600 bg-olive-100/50 text-olive-950';
        }
    };

    //@ *********************** NaveItems *****************************
    const navItems = [
        { label: "Current Live Monitor", isLive: true },
        { label: "Analyze Sample", isLive: false },
    ];
    //@ *********************** Demo ********************************** 
    return (
        <main className="min-h-screen bg-stone-50 text-stone-900 flex flex-col md:flex-row font-sans">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#ffffff',
                        color: '#1c1917',
                        border: '1px solid #e7e5e4',
                    },
                }}
            />
            <nav className="w-full md:w-64 p-4 md:p-6 flex flex-row md:flex-col items-center md:items-stretch border-b md:border-r border-stone-200 bg-white z-10">
                <header className="mb-0 md:mb-10 text-left md:text-center shrink-0">
                    <h1 className="text-lg md:text-xl font-bold text-olive-700 flex items-center justify-start md:justify-center gap-2">
                        VisionDefect
                    </h1>
                    <p className="text-stone-500 text-xs mt-1 hidden md:block">Camera Defect Detection System</p>
                </header>
                <ul className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-3 grow justify-center md:justify-start md:mt-0 px-4 md:px-0">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setShowLiveStream(item.isLive)}
                                className={`w-auto md:w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-full md:rounded-lg text-xs md:text-sm font-medium transition ${showLiveStream === item.isLive
                                    ? "bg-olive-50 text-olive-950 shadow-inner"
                                    : "text-stone-500 hover:bg-stone-100/50 hover:text-stone-900"
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <footer className="mt-auto text-center border-t border-stone-200 pt-6 hidden md:block">
                    <p className="text-olive-700 font-semibold text-sm">VisionDefect</p>
                    <p className="text-stone-600 text-xs mt-1">Powered by AI Vision Solutions</p>
                    <p className="text-stone-600 text-xs mt-1">&copy; 2026 Al-Azher Team. All Rights Reserved.</p>
                </footer>
            </nav>
            {/* --- Main Content Area --- */}
            <section className="flex-1 flex flex-col min-w-0">
                <header className="h-auto md:h-16 border-b border-stone-200 bg-white p-4 md:px-6 flex flex-col md:flex-row items-center justify-center text-sm gap-3 md:gap-6">
                    <div className="flex items-center justify-center md:justify-center gap-3 md:gap-5 text-xs text-stone-500 border-t md:border-t-0 border-stone-100 pt-3 md:pt-0">
                        <span className={`flex items-center gap-1 md:gap-1.5 ${streamError ? 'text-red-600' : 'text-emerald-700'}`}>
                            <span className={`h-1.5 md:h-2 w-1.5 md:w-2 rounded-full ${streamError ? 'bg-red-600' : 'bg-emerald-600'}`}></span>
                            {streamError ? 'SYSTEM OFFLINE' : 'SYSTEM ONLINE'}
                        </span>
                        <span>MODEL: v1.0</span>
                        <span>CAM: #1</span>
                    </div>
                </header>
                {/* --- View Panel --- */}
                <div className="flex-1 p-3 md:p-6 flex flex-col min-h-0">
                    <div className="flex-1 rounded-2xl border border-stone-200 bg-white shadow-lg p-4 md:p-6 flex flex-col min-h-0">

                        <header className="mb-4 md:mb-6 flex items-center justify-between shrink-0">
                            <h2 className="text-base md:text-lg font-bold text-olive-800 flex items-center gap-2">
                                <span className="h-2 w-2 bg-olive-500 rounded-full"></span>
                                {showLiveStream ? "LIVE FEED" : "IMAGE ANALYSIS"}
                            </h2>
                        </header>
                        {/* Live Stream Mode */}
                        {showLiveStream && (
                            <div className="relative w-full h-180 flex justify-center items-center rounded-xl border border-stone-200 bg-stone-100 overflow-hidden group">

                                <img
                                    src={`${server_api}/video_feed`}
                                    alt="Real-time Detection Stream"
                                    className={`w-full h-full object-contain transition-opacity duration-300 ${streamError ? 'opacity-20' : 'opacity-100'}`}
                                    onError={(e) => {
                                        handleStreamError();
                                        (e.target as HTMLImageElement).src = `${server_api}/video_feed?t=${new Date().getTime()}`;
                                    }}
                                    onLoad={() => setStreamError(false)}
                                />

                                {streamError && (
                                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 md:gap-4 text-center p-4 md:p-6 bg-stone-100/80 backdrop-blur-sm z-20">
                                        <span className="text-4xl md:text-6xl">⚠️</span>
                                        <h3 className="text-lg md:text-xl font-bold text-red-700">Connection Failed</h3>
                                        <p className="text-xs md:text-sm text-stone-600 max-w-md">
                                            Could not connect to the live video stream. Please check server and camera settings.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setStreamError(false);
                                            }}
                                            className="px-4 py-1.5 md:px-5 md:py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-xs md:text-sm shadow-md transition cursor-pointer"
                                        >
                                            Retry Connection
                                        </button>
                                    </div>
                                )}
                                <div className="absolute top-2 md:top-4 right-2 md:right-4 flex items-center gap-1.5 md:gap-2 px-2.5 py-1 rounded-full border border-red-200 bg-white/80 backdrop-blur-sm shadow-md transition-opacity group-hover:opacity-100 opacity-90 z-10">
                                    <span className="relative flex h-2 md:h-2.5 w-2 md:w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 md:h-2.5 w-2 md:w-2.5 bg-red-600"></span>
                                    </span>
                                    <span className="text-[10px] md:text-xs font-bold text-red-600">REC</span>
                                    <span className="text-[10px] md:text-xs font-mono text-stone-800">
                                        LIVE FEED {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        )}
                        {/* Test Image Mode */}
                        {!showLiveStream && (
                            <div className="flex-1 flex flex-col space-y-4 md:space-y-6 min-h-0">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 p-3 md:p-4 bg-stone-100 rounded-xl border border-stone-200 shrink-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full sm:w-auto px-4 py-2 bg-olive-600 hover:bg-olive-700 rounded-lg text-white text-xs md:text-sm font-semibold transition shrink-0"
                                        >
                                            Choose Image
                                        </button>
                                        <span className="text-xs md:text-sm text-stone-600 truncate max-w-full sm:max-w-xs px-1">
                                            {selectedFile ? selectedFile.name : 'No image selected'}
                                        </span>
                                    </div>

                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                                    <button
                                        onClick={handleUpload}
                                        disabled={!selectedFile || loading}
                                        className="w-full md:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 rounded-lg text-white text-xs md:text-sm font-semibold transition flex items-center justify-center gap-2 shrink-0"
                                    >
                                        {loading ? "Analyzing..." : "Analyze Image"}
                                    </button>
                                </div>
                                {previewUrl && (
                                    <div className="relative flex-1 flex justify-center items-center bg-stone-100 rounded-xl border border-stone-200 overflow-hidden min-h-0 p-2">

                                        <div className="relative inline-block max-w-full max-h-full">

                                            <img
                                                ref={imgRef}
                                                src={previewUrl}
                                                alt="Preview"
                                                onLoad={handleImageLoad}
                                                className="h-full md:max-h-full w-full md:w-auto object-contain block"
                                            />
                                            {results &&
                                                results.detections &&
                                                results.detections.map((detection: Detection, index: number) => {
                                                    const [x1, y1, x2, y2] = detection.box;
                                                    const left = x1 * imgScale.scaleX;
                                                    const top = y1 * imgScale.scaleY;
                                                    const width = (x2 - x1) * imgScale.scaleX;
                                                    const height = (y2 - y1) * imgScale.scaleY;

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`absolute border rounded ${getClassColor(
                                                                detection.class
                                                            )} transition-all pointer-events-none`}
                                                            style={{
                                                                left: `${left}px`,
                                                                top: `${top}px`,
                                                                width: `${width}px`,
                                                                height: `${height}px`,
                                                            }}
                                                        >
                                                            <span className="absolute -top-4 md:-top-6 left-0 text-[8px] md:text-xs px-1 md:px-2.5 py-0.5 rounded bg-white font-bold shadow border border-stone-100 whitespace-nowrap z-10 text-stone-800">
                                                                {detection.class} | {Math.round(detection.confidence * 100)}%
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                        {results && (
                                            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-emerald-50 text-emerald-900 px-2.5 py-1 md:px-4 md:py-1.5 rounded-full border border-emerald-200 shadow-lg text-[10px] md:text-sm font-semibold z-10">
                                                STATUS: {results.total_defects > 0 ? `${results.total_defects} Defect(s) Detected` : 'OK - No Defects'}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {!previewUrl && (
                                    <div className="flex-1 flex flex-col justify-center items-center gap-3 md:gap-4 text-center p-6 md:p-10 bg-stone-100 rounded-xl border border-stone-200 border-dashed min-h-0">
                                        <span className="text-4xl md:text-6xl text-stone-400">🖼️</span>
                                        <p className="text-xs md:text-sm text-stone-600 max-w-xs">Select a test image from your device to begin the analysis and detection process.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DefectDetector;
export interface Detection {
    class: string;
    confidence: number;
    box: [number, number, number, number]; // [xmin, ymin, xmax, ymax]
}

export interface ApiResponse {
    status: string;
    total_defects: number;
    detections: Detection[];
}
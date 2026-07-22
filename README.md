# Al-Azhar University | Faculty of Engineering
### Department of Electronics and Communications Engineering

## Camera Defect Detection Using Artificial Intelligence

### Project Overview
The rapid growth of industrial automation has increased the need for intelligent quality inspection systems capable of detecting manufacturing defects with high accuracy and speed. Traditional manual inspection methods are often time-consuming, inconsistent, and susceptible to human error.

This project proposes an Artificial Intelligence-based Camera Defect Detection System that utilizes Computer Vision and Deep Learning techniques to automatically detect defects on manufactured products using industrial camera images. The system aims to improve production quality, reduce inspection time, minimize labor costs, and increase overall manufacturing efficiency.

The proposed solution employs state-of-the-art object detection algorithms such as YOLO12, image preprocessing techniques, and real-time inference to identify defective products during production.

---

### 1. Introduction
Quality control is one of the most important stages in manufacturing industries. Detecting defects at an early stage prevents defective products from reaching customers and reduces production losses.

Traditional inspection relies on human operators who may overlook small defects due to fatigue or environmental conditions.

Artificial Intelligence, especially Computer Vision, provides automated inspection systems capable of identifying defects accurately and consistently.

---

### 2. Problem Statement
Many factories still rely on manual visual inspection, which suffers from:
* Human errors
* Slow inspection speed
* High labor costs
* Inconsistent quality
* Difficulty detecting tiny defects

There is a need for an automated intelligent inspection system capable of detecting defects in real time.

---

### 3. Objectives
The project aims to:
* Build an automated defect detection system.
* Detect defective products using AI.
* Reduce inspection time.
* Improve production quality.
* Reduce manufacturing cost.
* Provide real-time monitoring.
* Generate inspection reports.

---

### 4. Key Project Steps

* **Step 1: Industrial Image Collection**  
  Gather high-resolution dataset images of manufactured products under varied lighting, angles, and surface conditions using industrial cameras.

* **Step 2: Defect Annotation & Labeling**  
  Annotate bounding boxes and assign precise fault classes (e.g., scratches, dents, cracks) using specialized labeling tools (Roboflow / Label Studio).

* **Step 3: Data Preprocessing & Augmentation**  
  Clean, resize, normalize images, and apply data augmentation techniques (rotation, contrast adjustments, noise injection) to expand training variance and prevent overfitting.

* **Step 4: YOLO12 Model Training**  
  Train the YOLO12 architecture on the annotated dataset leveraging GPU acceleration, hyperparameter tuning, and Area-Attention feature optimization.

* **Step 5: Validation & Model Performance Evaluation**  
  Evaluate detection metrics (mAP@50, mAP@50-95, Precision, Recall, Confusion Matrix) on unseen test sets to ensure high accuracy (>95%).

* **Step 6: Real-time Integration & Web Stream Testing**  
  Deploy the optimized weights (`.pt` / `.engine`) into a FastAPI backend and establish low-latency WebSocket communication for live browser camera feeds.

* **Step 7: Result Visualization & Alert Feedback Display**  
  Render detected defect bounding boxes, confidence scores, defect classification labels, and trigger status updates (`OK` / `Defect Detected`) on the React web dashboard in real time.

---

### 5. AI Model

#### Candidate Models:
* **YOLO12** (Selected Primary Model)
* **YOLOv11**
* **YOLOv8**

#### Primary Model:
**YOLO12**

#### Key Reasons for Selection:
* **Area-Attention Mechanism:** Integrates spatial and area attention for enhanced feature extraction, enabling the network to focus on minute surface irregularities.
* **Superior Tiny Defect Accuracy:** Delivers high precision and recall on fine-grained, micro-scale industrial surface defects compared to legacy architectures.
* **Real-time Edge & Cloud Optimization:** Designed for ultra-low latency, achieving maximum FPS during live stream inference via TensorRT / ONNX.
* **Computational Efficiency:** Optimized parameter footprint allowing high-throughput performance with lower VRAM and computing overhead.
---

### 6. Software Requirements

#### A. AI & Computer Vision Stack
* **Primary Framework:** Ultralytics YOLO (YOLO12 Architecture)
* **Deep Learning Runtime:** PyTorch (with CUDA & cuDNN acceleration)
* **Optimization & Inference Engine:** TensorRT / ONNX Runtime (for ultra-low latency FP16/INT8 inference)
* **Computer Vision Library:** OpenCV (Image processing & stream decoding)
* **Dataset & Annotation Platforms:** Roboflow / Label Studio

#### B. Backend Engineering Stack
* **Core Language:** Python 3.11+
* **Web Framework:** FastAPI (Asynchronous REST API & High-throughput WebSockets)
* **Async Server Engine:** Uvicorn (ASGI Application Server)
* **Data Processing Libraries:** NumPy, Pillow (PIL)
* **Containerization & Deployment:** Docker & Docker Compose

#### C. Desktop Application Stack (Native Shell & UI)
* **Desktop Runtime Shell:** Electron (v30+)
* **UI Library & Language:** React.js (v19) with TypeScript
* **Styling & Design System:** Tailwind CSS
* **State & Connection Management:** Native WebSockets API / React Hooks
* **Build Tooling & Bundler:** Vite / Electron-Builder / Electron-Forge

#### D. Development & Environment Tools
* **IDE:** Visual Studio Code (VS Code) / Jupyter Notebook
* **Version Control:** Git & GitHub
* **API Testing & Documentation:** Swagger UI (Interactive OpenAPI) & Postman
---

### 7. Hardware Requirements (High-Performance / Production Specs)

#### A. Edge / Local Server (Recommended for High-Speed Real-Time Inference)
* **CPU:** Intel Core i9 (13th Gen or higher) OR AMD Ryzen 9 (7000 Series or higher)
* **GPU (Crucial for YOLO12 TensorRT Speedup):** NVIDIA RTX 4070 / RTX 4080 (12GB+ VRAM) or NVIDIA RTX A4000 (Dedicated Workstation GPU)
* **RAM:** 32 GB DDR5 (5600 MHz)
* **Storage:** 1 TB NVMe M.2 SSD (Read/Write speeds ≥ 5000 MB/s for fast model/weight loading)
* **CUDA / TensorRT Cores:** NVIDIA Tensor Cores (3rd/4th Gen) enabled for FP16 / INT8 quantization support.

#### B. Industrial Vision Hardware
* **Camera:** High-Speed Industrial GigE / USB3 Vision Camera (Global Shutter, ≥ 60 FPS, High Resolution)
* **Lighting:** High-Intensity LED Ring/Bar Light (To prevent motion blur and glare on industrial parts)

---

### 8. Expected Results
The system is expected to:
* Detect defects with accuracy above 95%.
* Operate in real time.
* Reduce manual inspection.
* Improve production quality.
* Reduce costs.

---

### 9. Proposed Architecture of the AI-based Classification System

#### A. System Flow & Component Breakdown
1. **Image Acquisition:** Captures live images/video frames via an Industrial/Web Camera positioned above the production line.
2. **Image Preprocessing:** Resizes, normalizes, and enhances frame contrast to prepare images for neural network evaluation.
3. **AI Model (Deep Learning):** Executes real-time object detection using the **YOLO12** architecture.
4. **Classification Output:** Generates bounding box coordinates, defect class labels, and confidence scores (0–100%).
5. **Result Visualization:** Highlights defect locations with bounding boxes and status tags (`OK` / `Defect Detected`).
6. **Data Logging & Storage:** Stores inspection metrics, logs, and defective frames into a database for reporting and audit trails.
7. **Alert / Feedback System:** Triggers real-time dashboard notifications, sound alarms, or emails upon detecting critical defects.

---

### 10. Project Folder Structure

```text
CAMERADEFECTDETECTION/
│
├── CameraDefectDetection_backend/              # Python FastAPI & YOLO Inference Backend
│   ├── models/
│   │   └── best.pt                            # Trained YOLO12 model weights (.pt / .engine)
│   ├── test_image/                               # Temporary storage for uploaded test images/videos
│   ├── main.py                                # FastAPI core entry point (Uvicorn app setup)
│   ├── requirements.txt                       # Backend Python dependencies (Ultralytics, OpenCV, FastAPI, etc.)
│   ├── Dockerfile                             # Backend Docker containerization setup
│   └── .gitignore                             # Backend Git ignore file
│
├── CameraDefectDetection_desktopApp/          # Electron Desktop Application
│   ├── electron/                              # Main Electron Process Scripts
│   │   ├── main.ts                            # Electron main process entry point & window management
│   │   └── preload.ts                         # Secure Context Bridge IPC Preload script
│   ├── src/                                   # React UI (Renderer Process)
│   │   ├── components/                        # Reusable Desktop UI Components
│   │   │   └── DefectDetector.tsx             # Live camera stream detection component
│   │   ├── interfaces/                        # TypeScript Type Definitions
│   │   │   └── index.ts                       # Interfaces for Detections, Logs & WS Frames
│   │   ├── app.css                            # Global styling & Tailwind CSS directives
│   │   ├── main.tsx                           # React entry point
│   │   └── App.tsx                            # Main Desktop Dashboard Shell
│   ├── public/                                # Public static assets (index.html with CSP, app icon)
│   ├── package.json                           # Desktop dependencies & Electron scripts
│   ├── vite.config.ts                         # Vite bundler configuration
│   ├── Dockerfile                             # Desktop app build containerization
│   └── .gitignore                             # Desktop Git ignore file
│
├── CameraDefectDetection_frontend/           # React Router Web Application
│   ├── .react-router/                         # React Router build cache & configs
│   ├── app/                                   # Application Source Directory
│   │   ├── interfaces/
│   │   │   └── interfaces.ts                  # TypeScript type definitions (Detections, Logs, WS Frames)
│   │   ├── pages/
│   │   │   └── DefectDetectorWithWebsocket.tsx# Real-time live detection page via WebSockets
│   │   ├── routes/
│   │   │   └── home.tsx                       # Main dashboard route component
│   │   ├── app.css                            # Global styling & Tailwind CSS rules
│   │   ├── root.tsx                           # Root layout component
│   │   └── routes.ts                          # Route definitions
│   ├── public/                                # Static assets (images, icons)
│   ├── .dockerignore                          # Docker ignore rules
│   ├── .gitignore                             # Frontend Git ignore file
│   ├── Dockerfile                             # Frontend Docker containerization
│   ├── package.json                           # Frontend dependencies & scripts
│   ├── react-router.config.ts                 # React Router configuration
│   ├── README.md                              # Frontend documentation
│   ├── tsconfig.json                          # TypeScript configuration
│   ├── vite.config.ts                         # Vite bundler configuration
│   └── yarn.lock                              # Yarn dependency lock file
│
├── Projects El-Sewedy.pdf                      # Project documentation / presentation PDF
├── .gitignore                                 # Root Git ignore file
└── README.md                                  # Main repository overview & documentation
```

---

### 🔗 Project Live Links & Resources

| Resource | Description | Link |
| :--- | :--- | :--- |
| **🚀 Vercel Web App** | Live Web Dashboard Deployment | [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://camera-defect-detection-frontend.vercel.app/) |
| **📜 Swagger API Docs** | Interactive FastAPI Documentation | [![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://cameradefectdetectionbackend-production.up.railway.app/docs) |
| **🏷️ Roboflow Dataset** | Annotated Industrial Defects Dataset | [![Roboflow](https://img.shields.io/badge/Roboflow-6706CE?style=for-the-badge&logo=roboflow&logoColor=white)](https://universe.roboflow.com/jia-gao-xhafx/wires-rope-defect/dataset/1) |
| **📓 Google Colab** | YOLO12 Training & Fine-Tuning Notebook | [![Colab](https://img.shields.io/badge/Google_Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white)](https://colab.research.google.com/drive/1eZ5YU4tF5gwj8wMmygWOgAXU_LzYbKoL#scrollTo=104ckMKlrUex) |

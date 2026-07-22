// import DefectDetector from "~/pages/DefectDetector";
import type { Route } from "./+types/home";
import DefectDetectorWithWebsocket from "~/pages/DefectDetectorWithWebsocket";



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Camera Defect Detection" },
    { name: "description", content: "AI Powered Defect Detection System" },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* <DefectDetector /> */}
      <DefectDetectorWithWebsocket />
    </main>
  );
}
"use client";

import VideoUploader from "@/components/VideoUploader";
import { PageHeader } from "@/components/ui/PageHeader";

export default function UploadPage() {
  return (
    <div className="pro-page py-10 md:py-14">
      <div className="pro-container">
        <PageHeader
          kicker="New session"
          title="Upload & analyze"
          description="Select your exercise, drop a video, and let our vision engine annotate every frame with posture feedback."
        />
        <VideoUploader />
      </div>
    </div>
  );
}

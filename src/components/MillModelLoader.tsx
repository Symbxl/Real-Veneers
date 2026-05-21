"use client";

import dynamic from "next/dynamic";

const MillModel = dynamic(() => import("./MillModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

export default MillModel;

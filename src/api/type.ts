export type IaModel = "nanobanan" | "runway" | "pika" | "luma" | "custom";

export type IaGenerationMode =
  | "full"
  | "imageToVideo"
  | "textToVideo"
  | "character"
  | "extend";

export type OptionsIaRP = {
  aspectRatio: "16:9" | "9:16";

  resolution: "720p" | "1080p";

  durationSeconds: "4" | "6" | "8";
};

export type IaRequestPayload = {
  // model: IaModel
  // mode: IaGenerationMode
  userId: string;
  prompt: string;
  options : OptionsIaRP;
};


export type IaResponse = {
  requestId: string;
  model: IaModel;
  status: "queued" | "running" | "succeeded" | "failed";
  previewUrl?: string;
  outputUrl?: string;
  error?: string;
};
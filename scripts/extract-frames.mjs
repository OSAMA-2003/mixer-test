import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import ffmpegStatic from "ffmpeg-static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Identify source video (supports CLI argument or automatic detection)
const cliVideoArg = process.argv[2];
const publicDir = path.join(projectRoot, "public");

const potentialVideos = [
  cliVideoArg ? path.resolve(projectRoot, cliVideoArg) : null,
  cliVideoArg ? path.resolve(publicDir, cliVideoArg) : null,
  path.join(publicDir, "hero-vid2.mp4"),
  path.join(publicDir, "hero-vid.mp4"),
  path.join(publicDir, "blender-sequence.mp4"),
  path.join(projectRoot, "hero-vid2.mp4"),
  path.join(projectRoot, "hero-vid.mp4"),
  path.join(projectRoot, "blender-sequence.mp4"),
].filter(Boolean);

const sourceVideo = potentialVideos.find((p) => fs.existsSync(p));

if (!sourceVideo) {
  console.error("❌ Error: Could not find source video in public/ (checked hero-vid2.mp4, hero-vid.mp4, etc.)");
  process.exit(1);
}

console.log(`🎬 Found source video: ${path.relative(projectRoot, sourceVideo)}`);

// Resolve FFmpeg binary
const ffmpegBinary = ffmpegStatic || "ffmpeg";
console.log(`⚙️ Using FFmpeg binary: ${ffmpegBinary}`);

// Output frames directory
const outputDir = path.join(publicDir, "frames");
if (fs.existsSync(outputDir)) {
  console.log(`🧹 Cleaning existing frames directory: ${path.relative(projectRoot, outputDir)}`);
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Extraction settings
// Source is 1280x720 at 24 FPS
const fps = 24;
const quality = 92;
const outputPattern = path.join(outputDir, "frame-%04d.webp");

console.log(`🚀 Starting extraction at ${fps} FPS, WebP quality ${quality}%, native resolution...`);

const ffmpegArgs = [
  "-i", sourceVideo,
  "-vf", `fps=${fps}`,
  "-c:v", "libwebp",
  "-quality", String(quality),
  "-lossless", "0",
  "-compression_level", "4",
  "-an", // Strip audio
  "-vsync", "0",
  outputPattern,
];

const result = spawnSync(ffmpegBinary, ffmpegArgs, {
  stdio: "inherit",
});

if (result.error || result.status !== 0) {
  console.error("❌ FFmpeg extraction failed:", result.error || `Exit code ${result.status}`);
  process.exit(result.status || 1);
}

// Count and verify extracted frames
const extractedFrames = fs
  .readdirSync(outputDir)
  .filter((f) => f.startsWith("frame-") && f.endsWith(".webp"))
  .sort();

const totalFrames = extractedFrames.length;

if (totalFrames === 0) {
  console.error("❌ No frames were generated in public/frames/");
  process.exit(1);
}

console.log(`✅ Successfully extracted ${totalFrames} WebP frames!`);
console.log(`   First frame: ${extractedFrames[0]}`);
console.log(`   Last frame:  ${extractedFrames[totalFrames - 1]}`);

// Write manifest
const manifest = {
  totalFrames,
  fps,
  width: 1280,
  height: 720,
  aspectRatio: 1280 / 720,
  quality,
  format: "webp",
  prefix: "frame-",
  digits: 4,
  ext: ".webp",
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(
  path.join(outputDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf-8"
);

console.log(`📄 Saved frame manifest to public/frames/manifest.json`);

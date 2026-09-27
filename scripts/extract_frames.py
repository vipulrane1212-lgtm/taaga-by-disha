#!/usr/bin/env python3
"""
TAAGA BY DISHA - Video to WebP Frame Sequence Extractor
Extracts 180 frames (approx 6s @ 30fps) from an input video into WebP format
optimized for canvas scroll scrubbing in Shopify.

Supports:
1. Python OpenCV + Pillow (if installed)
2. System FFmpeg CLI (if available)
3. Browser-based Zero-CLI extractor via tools/video-frame-extractor.html
"""

import os
import sys
import shutil
import subprocess

def extract_with_ffmpeg(video_path, output_dir, target_fps=30, max_frames=180, width=1440, quality=82):
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        return False

    os.makedirs(output_dir, exist_ok=True)
    out_pattern = os.path.join(output_dir, "frame_%04d.webp")
    cmd = [
        ffmpeg_bin,
        "-y",
        "-i", video_path,
        "-vf", f"fps={target_fps},scale=min({width}\\,iw):-1:flags=lanczos",
        "-vframes", str(max_frames),
        "-vcodec", "libwebp",
        "-quality", str(quality),
        "-compression_level", "6",
        out_pattern
    ]
    print(f"[*] Running FFmpeg: {' '.join(cmd)}")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        print(f"[+] Complete! Successfully extracted frames with FFmpeg into: {output_dir}")
        return True
    else:
        print(f"[!] FFmpeg failed: {res.stderr.decode('utf-8', errors='ignore')}")
        return False

def extract_with_cv2(video_path, output_dir, target_fps=30, max_frames=180, width=1440, quality=82):
    try:
        import cv2
        from PIL import Image
    except ImportError:
        return False

    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[!] Could not open video file: {video_path}")
        return False

    src_fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_src_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"[*] Input video: {video_path} (FPS: {src_fps}, Total Frames: {total_src_frames})")

    frame_interval = src_fps / target_fps
    extracted_count = 0

    while cap.isOpened() and extracted_count < max_frames:
        target_src_index = int(extracted_count * frame_interval)
        cap.set(cv2.CAP_PROP_POS_FRAMES, target_src_index)
        ret, frame = cap.read()
        if not ret:
            break

        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(rgb_frame)

        # Scale maintaining aspect ratio
        w, h = pil_img.size
        if w > width:
            ratio = width / float(w)
            target_h = int(float(h) * ratio)
            pil_img = pil_img.resize((width, target_h), Image.Resampling.LANCZOS)

        out_name = f"frame_{extracted_count + 1:04d}.webp"
        out_path = os.path.join(output_dir, out_name)
        pil_img.save(out_path, "WEBP", quality=quality, method=6)

        extracted_count += 1
        if extracted_count % 30 == 0:
            print(f"    Exported {extracted_count}/{max_frames} frames -> {out_name}")

    cap.release()
    print(f"[+] Complete! Successfully extracted {extracted_count} frames into: {output_dir}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_frames.py <path_to_video.mp4> [output_directory]")
        print("Example: python extract_frames.py ugc_video.mp4 ../assets/frames")
        print("\nAlternatively, open tools/video-frame-extractor.html directly in your browser!")
        sys.exit(1)

    video = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "./assets/frames"

    if not os.path.exists(video):
        print(f"[!] Input file does not exist: {video}")
        sys.exit(1)

    if extract_with_ffmpeg(video, out):
        sys.exit(0)

    if extract_with_cv2(video, out):
        sys.exit(0)

    print("\n[!] Neither FFmpeg CLI nor python-opencv/Pillow is currently installed.")
    print("    Option 1: Open 'tools/video-frame-extractor.html' in your browser (Chrome/Edge/Safari).")
    print("              Drag & drop the video and it will extract 180 WebP frames with zero CLI!")
    print("    Option 2: Install Python dependencies: pip install opencv-python Pillow")
    print("    Option 3: Install FFmpeg CLI.")
    sys.exit(1)

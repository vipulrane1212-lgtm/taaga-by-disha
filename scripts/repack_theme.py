import os
import zipfile

base_dir = r"C:\Users\Admin\Desktop\taaga"
zip_path = os.path.join(base_dir, "taaga-by-disha-theme.zip")
theme_folders = ["layout", "sections", "snippets", "templates", "locales", "config", "assets"]

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for folder in theme_folders:
        folder_path = os.path.join(base_dir, folder)
        if not os.path.exists(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.endswith(".mp4"):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, base_dir)
                zipf.write(file_path, arcname)

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"Repackaged {zip_path} ({size_mb:.2f} MB) successfully!")

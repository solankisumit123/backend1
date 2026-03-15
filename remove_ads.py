import os
import re

def remove_ads(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx"):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Remove AdBanner and AdUnit imports
                new_content = re.sub(r'import\s+AdBanner\s+from\s+["\'][^"\']+["\'];?\n?', '', content)
                new_content = re.sub(r'import\s+AdUnit\s+from\s+["\'][^"\']+["\'];?\n?', '', new_content)
                
                # Remove AdBanner components (handles self-closing and with children)
                new_content = re.sub(r'<AdBanner[^>]*/>', '', new_content)
                new_content = re.sub(r'<AdBanner[^>]*>.*?</AdBanner>', '', new_content, flags=re.DOTALL)
                
                # Remove AdUnit components
                new_content = re.sub(r'<AdUnit[^>]*/>', '', new_content)
                new_content = re.sub(r'<AdUnit[^>]*>.*?</AdUnit>', '', new_content, flags=re.DOTALL)
                
                # Remove empty divs containing only AdBanner/AdUnit
                new_content = re.sub(r'<div[^>]*>\s*<AdBanner[^>]*/>\s*</div>', '', new_content)
                new_content = re.sub(r'<div[^>]*>\s*<AdUnit[^>]*/>\s*</div>', '', new_content)
                
                if content != new_content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Cleaned: {path}")

remove_ads("c:/Users/solan/Downloads/Compressed/comic-seo-insights-main/src")

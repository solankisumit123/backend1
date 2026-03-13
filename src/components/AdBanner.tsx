import { useRef } from "react";

interface AdBannerProps {
  width?: number;
  height?: number;
  className?: string;
  keyId?: string;
  bannerId?: string;
}

const AdBanner = ({ width, height, className = "", bannerId, keyId }: AdBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 768 : true;
  const w = isDesktop ? (width ?? 728) : 320;
  const h = isDesktop ? (height ?? 90) : 50;
  const key = keyId ?? "f346874778937e6aae05a5e1d8ea9ab6";

  const iframeContent = (
    "<!DOCTYPE html>\n<html>\n  <head>\n    <style>\n" +
    "      body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }\n" +
    "    </style>\n  </head>\n  <body>\n" +
    "    <scr" + "ipt type=\"text/javascript\">\n" +
    "      atOptions = {\n" +
    "        'key' : '" + key + "',\n" +
    "        'format' : 'iframe',\n" +
    "        'height' : " + h + ",\n" +
    "        'width' : " + w + ",\n" +
    "        'params' : {}\n" +
    "      };\n" +
    "    </scr" + "ipt>\n" +
    "    <scr" + "ipt type=\"text/javascript\" src=\"//www.topcreativeformat.com/" + key + "/invoke.js\"></scr" + "ipt>\n" +
    "  </body>\n</html>"
  );

  return (
    <div
      ref={containerRef}
      id={bannerId ? `atContainer-${bannerId}` : undefined}
      className={`my-4 flex justify-center items-center overflow-hidden max-w-full ${className}`}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%"
      }}
    >
      <iframe
        title="AdBanner"
        srcDoc={iframeContent}
        width={w}
        height={h}
        style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
        scrolling="no"
      />
    </div>
  );
};

export default AdBanner;

"use client";

import { PlayIcon } from "lucide-react";
import { FC, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface Props {}

const VideoDialog: FC<Props> = (props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        <Image
          src="/home-page/section-2-video-bg.webp"
          alt="Video background"
          width={660}
          height={660}
          className="rounded-sm group-hover:brightness-90 transition-all duration-500"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            className="w-20 h-20 rounded-full text-white grid place-items-center bg-primary opacity-80"
          >
            <PlayIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[70%]"
          closeButtonClassName="-top-3 -right-3 bg-primary text-white rounded-full w-8 h-8 grid place-items-center border-2 border-white opacity-100"
        >
          <iframe
            src="https://www.youtube.com/embed/9bZkp7q19f0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-sm"
            loading="lazy"
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoDialog;

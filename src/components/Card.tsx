import { AudioLines, Trash, File, Image, SquarePlay, FilePenLine } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import ContentForm from "./ContentForm";
import { allContentAtom, filteredContentAtom } from "./recoil/atoms";
import { Tags } from "../lib/contentId";

const TypeStyles: { [key: string]: JSX.Element } = {
  image: <Image className="w-6 h-6 md:w-8 md:h-8" />,
  article: <File className="w-6 h-6 md:w-8 md:h-8" />,
  video: <SquarePlay className="w-6 h-6 md:w-8 md:h-8" />,
  audio: <AudioLines className="w-6 h-6 md:w-8 md:h-8" />,
};

export interface ContentType {
  title?: string;
  type?: string;
  tags?: Tags[];
  link?: string;
  createdAt?: string;
  contentId?: string;
}

export interface CardType extends ContentType {
  sideOpen?: boolean;
  variant?: boolean;
  updateModal?: boolean;
}

const Card: React.FC<CardType> = ({
  title,
  type,
  tags,
  link,
  createdAt,
  contentId = "",
  sideOpen,
  variant = false,
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token") || "";
  const [contentstore, setContentStore] = useRecoilState(allContentAtom);
  const setDisplayedContent = useSetRecoilState(filteredContentAtom);

  const [updateModal, setUpdateModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fallbackMeta, setFallbackMeta] = useState<{ title?: string; description?: string; image?: string } | null>(null);

  const deleteContent = async (contentId: string) => {
    try {
      const filteredContent = contentstore.filter(
        (content) => content.contentId !== contentId
      );
      setContentStore(filteredContent);
      setDisplayedContent(filteredContent);

      await axios.delete(`${BASE_URL}/content/`, {
        data: { contentId: contentId },
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Failed to delete content", error);
      alert("Error deleting the content");
      setContentStore(contentstore);
      setDisplayedContent(contentstore);
    }
  };

  const getEmbedLink = (url: string) => {
    try {
      // YouTube
      if (url.includes("youtube.com/watch")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Vimeo
      if (url.includes("vimeo.com/")) {
        const videoId = url.split("vimeo.com/")[1];
        return `https://player.vimeo.com/video/${videoId}`;
      }

      // Spotify track/playlist/album
      if (url.includes("open.spotify.com/")) {
        return url.replace("open.spotify.com", "open.spotify.com/embed");
      }

      // SoundCloud embed
      if (url.includes("soundcloud.com/")) {
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
      }

      return url;
    } catch {
      return url;
    }
  };

  // Fetch Open Graph metadata as fallback preview
  useEffect(() => {
    const fetchMeta = async () => {
      if (link && showPreview) {
        try {
          const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(link)}`);
          const data = await res.json();
          if (data && data.data) {
            setFallbackMeta({
              title: data.data.title,
              description: data.data.description,
              image: data.data.image?.url,
            });
          }
        } catch (err) {
          console.error("Failed to fetch metadata", err);
        }
      }
    };
    fetchMeta();
  }, [link, showPreview]);

  return (
    <div className="bg-blue-100 border-2 text-black border-blue-600 rounded-lg px-4 py-2 shadow-md relative">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center hover:text-blue-900">
          {TypeStyles[type!]}
          <span className=" font-font1 text-[1rem] md:text[1.1rem] lg:text[1.2rem] font-semibold tracking-normal break-words w-full line-clamp-2">
            {title}
          </span>
        </div>
        {!variant && (
          <div className="flex gap-2">
            <div className="flex items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer rounded-md p-1">
              <button onClick={() => setUpdateModal?.(true)} disabled={sideOpen}>
                <FilePenLine className="w-5 h-5 md:w-6 md:h-6 " />
              </button>
            </div>
            <div className="flex items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer rounded-md p-1">
              <button onClick={() => deleteContent(contentId)} disabled={sideOpen}>
                <Trash className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-2">
        <ul className="flex flex-wrap gap-2 mt-1">
          {tags &&
            tags.length > 0 &&
            tags.map((tag) => (
              <li
                key={tag.tagId}
                className="bg-blue-200 justify-center text-xs px-2 py-1 rounded"
              >
                # {tag.title}
              </li>
            ))}
        </ul>
      </div>

      {link && (
        <div className="mb-2">
          <button
            onClick={() => setShowPreview((prev) => !prev)}
            className="text-blue-600 hover:underline text-sm"
          >
            {showPreview ? "Hide Preview" : "View Content"}
          </button>
          {showPreview && (
            <div className="mt-2 w-full h-64 border rounded-lg overflow-hidden">
              {getEmbedLink(link) === link ? (
                fallbackMeta ? (
                  <div className="p-4 bg-white rounded shadow-md h-full overflow-y-auto">
                    {fallbackMeta.image && (
                      <img
                        src={fallbackMeta.image}
                        alt={fallbackMeta.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="font-bold text-lg mb-1">{fallbackMeta.title}</h3>
                    <p className="text-sm text-gray-700">{fallbackMeta.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 p-4">Preview not available</p>
                )
              ) : (
                <iframe
                  src={getEmbedLink(link)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          )}
        </div>
      )}

      {createdAt && (
        <p className="text-xs text-black my-2">
          <span className="font-font1 font-semibold text-[0.7rem] md:text[0.75rem] lg:text[0.85rem] tracking-normal">
            Created At:
            <span className="ml-1 font-medium tracking-wider ">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </span>
        </p>
      )}

      {updateModal && (
        <ContentForm
          onClose={() => setUpdateModal?.(false)}
          mainTitle="Update Content"
          initialData={{ title, type, tags, link, contentId, createdAt }}
          updateModal={updateModal}
        />
      )}
    </div>
  );
};

export default Card;
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFile, setWrongFile] = useState(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFile(true);
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white w-[60%] rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload video</p>
            <p className="text-md text-gray-400 mt-1">
              Post video to your account
            </p>
          </div>
          <div className="border-dashed roundex-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>uploading</p>
            ) : videoAsset ? (
              <div>
                <video
                  src={videoAsset.url}
                  loop
                  controls
                  className="rounded-xl h-[450px] mt-16 bg-black"
                ></video>
              </div>
            ) : (
              <label htmlFor="" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-xl">
                      <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                      <p className="text-xl font-semibold">Video to upload</p>
                    </p>
                  </div>
                  <p className="text-gray-400 text-center mt-10 text-small leading-10">
                    MP4 or webm or ogg <br />
                    720*1280 or higher <br />
                    up to 10 Minutes
                    <br />
                    less than 2GB
                  </p>
                  <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                    Select File
                  </p>
                </div>
                <input
                  type={"file"}
                  name="upload-video"
                  className="w-0 h-0"
                  onChange={uploadVideo}
                />
              </label>
            )}
            {wrongFile && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label htmlFor="" className="text-md font-medium">
            Caption
          </label>
          <input
            type="text"
            value={""}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label htmlFor="" className="text-md font-medium">
            Choose a Category
          </label>
          <select
            name=""
            id=""
            className={
              "outline-none border-2 border-gray-200 text-md captialize lg:p-4 p-2 rounded cursor-pointer"
            }
          >
            {topics.map((el) => (
              <option
                className="outline-none captialize text-gray-700 text-md p-2 hover:bg-slate-300"
                key={el.name}
                value={el.name}
              >
                {el.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              type="button"
              className="border-gray-200 text-md border-2 rounded font-medium p-2 w-20 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              type="button"
              className="bg-[#F51997] text-white text-md border-2 rounded font-medium p-2 w-20 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
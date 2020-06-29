import React, { useContext, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const FileUpload = ({ images, setImages }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploading, setUploading] = useState(false);

  const imagesHandler = (uplfiles) => {
    const imageData = {
      value: {},
      validation: { required: false },
      valid: false,
      validationMessage: "",
    };

    imageData.value = uplfiles;
    imageData.valid = true;
    setImages(uplfiles);
  };

  const onDrop = (files) => {
    setUploading(true);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios
      .post("/users/uploadimage", formData, config)
      .then((response) => {
        setUploading(false);
        setUploadedFiles(response.data);
        imagesHandler(response.data);
      })
      .catch((err) => console.log(err));
  };

  const onRemove = (id) => {};

  const showUploadedImages = () => (
    <div
      className="dropzone_box"
      key={uploadedFiles.public_id}
      onClick={() => onRemove(uploadedFiles.public_id)}
    >
      <div
        className="wrap"
        style={{ background: `url(${uploadedFiles.url}) no-repeat` }}
      />
    </div>
  );

  //));

  return (
    <div
      style={{
        width: "300px",
        background: "#fff",
        float: "left",
      }}
    >
      <section>
        <div className="dropzone clear">
          <Dropzone
            onDrop={(e) => onDrop(e)}
            multiple={false}
            className="dropzone_box"
          >
            <div
              className="wrap"
              style={{
                padding: "5px 10px",
                height: "30px",
                width: "120px",
              }}
            >
              <FontAwesomeIcon
                icon={faImage}
                size="lg"
                style={{ margin: "0 20px", color: "rgb(17, 47, 184)" }}
              />
            </div>
          </Dropzone>

          {uploadedFiles && showUploadedImages}

          {uploading ? (
            <div
              className="dropzone_box"
              style={{ textAlign: "center", paddingTop: "30px" }}
            >
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      .
    </div>
  );
};

export default FileUpload;

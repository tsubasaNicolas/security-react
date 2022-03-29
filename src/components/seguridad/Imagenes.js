import Modal from "react-modal";
import React, { Fragment, useEffect, useState } from "react";

export default function ImagenesPage() {
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [listUpdated, setListUpdated] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    Modal.setAppElement("body");

    fetch("https://nicolas-security.herokuapp.com/imagenes")
      .then((res) => res.json())
      .then((res) => setImageList(res))
      .catch((err) => {
        console.error(err);
      });

    setListUpdated(false);
  }, [listUpdated]);

  const selectedHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(file);
  };

  const sendHandler = () => {
    if (!file) {
      alert("you must upload file");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", file);

    fetch("https://nicolas-security.herokuapp.com/imagenes", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.text())
      .then((res) => console.log(res))

      .catch((err) => {
        console.error(err);
      });
    setListUpdated(true);
    document.getElementById("fileinput").value = null;
    setFile(null);
  };
  const modalhandler = (isopen, image) => {
    setModalIsOpen(isopen);
    setCurrentImage(image);
  };
  const deleteHandler = () => {
    let imageID = currentImage.split("-");
    console.log(imageID[0]);
    imageID = parseInt(imageID[0]);

    fetch("https://nicolas-security.herokuapp.com/imagenes/" + imageID, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => console.log(res));

    setModalIsOpen(false);
    setListUpdated(true);
  };

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">
            Image App
          </a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-xs-10">
              <input
                id="fileinput"
                onChange={selectedHandler}
                className="form-control"
                type="file"
              />
            </div>
            <div className="col-xs-2">
              <button
                type="button"
                onClick={sendHandler}
                className="btn btn-primary col-12"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
      >
        {imageList.map((image) => (
          <div key={image} className="card" id="card" style={{ margin: "6px" }}>
            <img
              src={"https://nicolas-security.herokuapp.com/" + image}
              className="card-img-top"
              onClick={() => modalhandler(true, image)}
              style={{ height: "200px", width: "300px" }}
              alt="img"
            />
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => modalhandler(true, image)}
                style={{ marginTop: 10 }}
              >
                Click to view
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        style={{ content: { right: "20%", left: "20%" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => modalhandler(false, null)}
      >
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={"https://nicolas-security.herokuapp.com/" + currentImage}
            alt=".."
            style={{ width: "80%", height: "70%" }}
          />
          <div className="card-body">
            <button
              className="btn btn-danger"
              style={{ marginTop: 20 }}
              onClick={() => deleteHandler()}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

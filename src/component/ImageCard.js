import { useState } from "react";
import "../styles/imageCard.css";
import CustomizedDialogs from "./Dialog";


function ImageCard({setPicture}) {
  const [profilepics, setProfilepics] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (oFREvent) => {
      setProfilepics(oFREvent.target.result);
    };
    setOpen(!open);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const setCroppedImagefor = (croppedimage, file) => {
    setProfilepics(croppedimage);
    setPicture(file)
  };

  return (
    <>
      {profilepics && (
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
          pics={profilepics}
          setCroppedImagefor={setCroppedImagefor}
        />
      )}
      <div className="ImageCont">
        <img className="Image" src={profilepics} alt="" />
        <input type="file" onChange={handleChange} />
      </div>
    </>
  );
}

export default ImageCard;

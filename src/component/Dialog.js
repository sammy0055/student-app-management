import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageList from "@mui/material/ImageList";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  open,
  setOpen,
  pics,
  handleClick,
  setCroppedImagefor,
}) {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropAreaPixel, setCropAreaPixel] = useState(null);

  const handleImageCrop = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea, cropAreaPixel) => {
    setCropAreaPixel(cropAreaPixel);
  };

  const onCrop = async () => {
    const [croppedImage, file] = await getCroppedImg(pics, cropAreaPixel);
    setCroppedImagefor(croppedImage, file);
    setOpen(!open);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClick}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          <Cropper
            image={pics}
            crop={crop}
            zoom={zoom}
            onCropChange={handleImageCrop}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </ImageList>

        <DialogActions>
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            autoFocus
            onClick={onCrop}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

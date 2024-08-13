import { Box, IconButton, Modal, Backdrop, Fade } from "@mui/material";
import { useState } from "react";
import MainLayout from "~/layouts/MainLayout";
import { MenuIcon as MenuIconModal } from "~/assets/icons";
import MainContent from "./MainContent";

const boxModalStyle = {
  display: "flex",
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "#1d2125",
  color: "#172b4d",
};

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <IconButton
          sx={{
            padding: 2,
            mr: 1,
            mb: 1,
            borderRadius: "100%",
            backgroundColor: "#121212",
            "&:hover": {
              backgroundColor: "#121212",
            },
            zIndex: 5,
          }}
          onClick={handleOpenModal}
        >
          <MenuIconModal />
        </IconButton>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModal}>
            <Box sx={boxModalStyle}>
              <MainContent />
            </Box>
          </Fade>
        </Modal>
      </Box>
    </MainLayout>
  );
}

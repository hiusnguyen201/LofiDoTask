import { Box, IconButton, Modal, Backdrop, Fade } from "@mui/material";
import { useState } from "react";
import MainLayout from "~/layouts/MainLayout";
import { MenuIcon as MenuIconModal } from "~/assets/icons";
import MainContent from "./MainContent";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <MainLayout>
      <Box className="flex items-center justify-end relative w-full h-full">
        <Box
          className="rounded-full mr-2"
          sx={{
            backgroundColor: "#1d2125",
          }}
        >
          <IconButton className="z-10 p-4" onClick={handleOpenModal}>
            <MenuIconModal />
          </IconButton>
        </Box>

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
            <Box
              className="flex absolute w-full h-full"
              sx={{
                backgroundColor: "#1d2125",
              }}
            >
              <MainContent />
            </Box>
          </Fade>
        </Modal>
      </Box>
    </MainLayout>
  );
}

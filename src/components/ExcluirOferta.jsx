import * as React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Trash2 } from "lucide-react";
import { excluirConhecimentoService } from "../services/conhecimentoService";
import { useParams } from "react-router-dom";

export function ExcluirOferta() {
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleExcluir() {
    await excluirConhecimentoService(id);
    handleClose();
    navigate("/conhecimentos");
  }

  return (
    <React.Fragment>
      <button
        className="bg-[#F9FBFA] w-full py-2 px-4 rounded-xl cursor-pointer flex items-center text-red-500 gap-2 justify-center border border-[#DCE5E0] hover:bg-amber-600 hover:text-white"
        onClick={handleClickOpen}
      >
        <Trash2 size={16} /> Excluir
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="py-2 px-4">
          <DialogTitle id="alert-dialog-title">
            {"Confirmar exclusão"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja excluir? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="flex h-12 gap-2">
              <button
                onClick={handleClose}
                className="bg-[#F9FBFA] w-full py-2 px-4 rounded-xl cursor-pointer flex items-center gap-2 justify-center border border-[#DCE5E0] hover:bg-amber-600 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleExcluir}
                autoFocus
                className="w-full bg-red-500 py-2 px-4 rounded-xl text-white cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

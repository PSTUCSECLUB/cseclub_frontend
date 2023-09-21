import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useInput } from "@/app/hooks/useInput";
import { Alert, Avatar, CircularProgress } from "@mui/joy";
import { addExecutive } from "../../actions/executiveActions";

export default function AddExecutive({ newAdded }) {
  const [open, setOpen] = React.useState(false);
  const nameInput = useInput("");
  const orderInput = useInput(0);
  const roleInput = useInput("");
  const [image, setImage] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  function handleImage(e) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  }
  async function handleSubmit(e) {
    let formData = new FormData();
    formData.append("name", nameInput.value);
    formData.append("role", roleInput.value);
    formData.append("order", orderInput.value);
    formData.append("image", image);
    try {
      setLoading(true);
      let { executive } = await addExecutive(formData);
      newAdded(executive);
      setLoading(false);
      setOpen(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>New Executive</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Add an new Executive Member
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of this member.
          </Typography>
          <form>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={nameInput.value}
                  onChange={nameInput.onChange}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input
                  value={roleInput.value}
                  onChange={roleInput.onChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Order</FormLabel>
                <Input
                  value={orderInput.value}
                  onChange={orderInput.onChange}
                  required
                  type="number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  required
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp, .svg"
                  onChange={handleImage}
                />
                {image && (
                  <Avatar
                    size="lg"
                    src={URL.createObjectURL(image)}
                    sx={{ "--Avatar-size": "64px" }}
                  />
                )}
              </FormControl>
              {loading ? (
                <CircularProgress size="sm" />
              ) : (
                <Button onClick={handleSubmit}>Submit</Button>
              )}
              {error && <Alert color="danger">{error.message}</Alert>}
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

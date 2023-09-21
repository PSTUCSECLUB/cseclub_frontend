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
import { addExecutive, updateExecutive } from "../../actions/executiveActions";

export default function UpdateExecutive({ id, executives, setId, updatedOne }) {
  const [executive] = React.useState(executives.filter((e) => e._id === id)[0]);
  const [open, setOpen] = React.useState(true);
  const nameInput = useInput(executive.name);
  const orderInput = useInput(executive.order);
  const roleInput = useInput(executive.role);
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
    let { name, role, order } = executive;
    let updatedFlag = false;
    let formData = new FormData();
    if (nameInput.value !== name) {
      updatedFlag = true;
      formData.append("name", nameInput.value);
    }
    if (roleInput.value !== role) {
      updatedFlag = true;
      formData.append("role", roleInput.value);
    }
    if (orderInput.value !== order) {
      updatedFlag = true;
      formData.append("order", orderInput.value);
    }
    if (image) {
      formData.append("image", image);
      updatedFlag = true;
    }
    formData.forEach((val, key) => {
      console.log(key, val);
    });
    try {
      if (updatedFlag) {
        setLoading(true);
        let { executive } = await updateExecutive(id, formData);
        setId("");
        updatedOne(executive);
        setLoading(false);
        setOpen(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setId("");
        }}
      >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Update the Executive Member
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
                {
                  <Avatar
                    size="lg"
                    src={image ? URL.createObjectURL(image) : executive.image}
                    sx={{ "--Avatar-size": "64px" }}
                  />
                }
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

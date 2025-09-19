import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { User, UserFormData } from '../types/user';

interface UserModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: User;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<UserFormData>({ name: '', email: '' });

  useEffect(() => {
    if (initialData) {
      setForm({ name: initialData.name, email: initialData.email });
    } else {
      setForm({ name: '', email: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    setForm({ name: '', email: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === 'create' ? 'Create User' : 'Edit User'}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
